// <reference path="./views/preview.d.ts" />

import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import bodyParser from "body-parser";
import Preview from "./views/preview";
import { fetchCommits } from "./fetchCommits";
import { summarizeCommits } from "./summarize";
import fs from "fs-extra";
import dotenv from "dotenv";
dotenv.config();

interface CommitDetails {
  author: string;
  message: string;
  date: string;
}

const app = express();
const PORT = 3000;

let postContent = "";
let commitsData: Record<string, CommitDetails[]> = {};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add JSON parser for API endpoints
app.use(express.static('public')); // Serve static files

app.get("/preview", async (req, res) => {
  try {
    const configPath = "./config.json";
    const reposPath = "./repos.json";
    const githubToken = process.env.GITHUB_TOKEN;
    
    if (!githubToken) {
      res.status(500).send("GitHub token not configured");
      return;
    }
    
    const commits = await fetchCommits(configPath, reposPath, githubToken);
    const html = renderToString(React.createElement(Preview, {
      postContent,
      commits
    }));
    
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <title>SkateHive DevBot Preview</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { margin: 0; padding: 0; background-color: #f8fafc; }
    * { box-sizing: border-box; }
  </style>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script>
    window.initialCommits = ${JSON.stringify(commits)};
    window.initialPostContent = ${JSON.stringify(postContent)};
  </script>
</head>
<body>
  <div id="root">${html}</div>
  <script>
    // Client-side state management for commit selection
    let selectedCommits = {};
    let summary = "";
    let summaryLoading = false;
    let summaryError = null;

    function updateSelectedCommits(repo, commitIndex, checked) {
      const key = repo + '__' + commitIndex;
      selectedCommits[key] = checked;
      updateUI();
    }

    function selectAll(checked) {
      selectedCommits = {};
      if (window.initialCommits) {
        Object.entries(window.initialCommits).forEach(([repo, commitList]) => {
          commitList.forEach((_, idx) => {
            selectedCommits[repo + '__' + idx] = checked;
          });
        });
      }
      updateUI();
    }

    function updateUI() {
      // Update checkbox states
      Object.keys(selectedCommits).forEach(key => {
        const checkbox = document.querySelector('input[data-commit-key="' + key + '"]');
        if (checkbox) {
          checkbox.checked = selectedCommits[key];
        }
      });

      // Update generate button state
      const generateBtn = document.getElementById('generate-summary-btn');
      const anySelected = Object.values(selectedCommits).some(v => v);
      if (generateBtn) {
        generateBtn.disabled = summaryLoading || !anySelected;
        generateBtn.style.opacity = (summaryLoading || !anySelected) ? '0.6' : '1';
        generateBtn.style.cursor = (summaryLoading || !anySelected) ? 'not-allowed' : 'pointer';
        generateBtn.textContent = summaryLoading ? 'Generating Summary...' : 'Generate AI Summary from Selected Commits';
      }
    }

    async function generateSummary() {
      if (summaryLoading) return;
      
      summaryLoading = true;
      summaryError = null;
      summary = "";
      updateUI();

      try {
        const filtered = {};
        if (window.initialCommits) {
          Object.entries(window.initialCommits).forEach(([repo, commitList]) => {
            const selected = commitList.filter((_, idx) => selectedCommits[repo + '__' + idx]);
            if (selected.length > 0) filtered[repo] = selected;
          });
        }

        const response = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ commits: filtered })
        });
        
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const data = await response.json();
        
        if (data.success) {
          summary = data.summary;
          const summaryDiv = document.getElementById('summary-display');
          if (summaryDiv) {
            summaryDiv.style.display = 'block';
            summaryDiv.innerHTML = '<b>AI Summary:</b><div style="margin-top: 12px;">' + data.summary + '</div>';
          }
        } else {
          summaryError = data.error || "Failed to generate summary";
          const errorDiv = document.getElementById('summary-error');
          if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = summaryError;
          }
        }
      } catch (err) {
        summaryError = err.message || "Failed to generate summary";
        const errorDiv = document.getElementById('summary-error');
        if (errorDiv) {
          errorDiv.style.display = 'block';
          errorDiv.textContent = summaryError;
        }
      } finally {
        summaryLoading = false;
        updateUI();
      }
    }

    // Initialize when page loads
    document.addEventListener('DOMContentLoaded', function() {
      // Set up event listeners for checkboxes
      document.querySelectorAll('input[data-commit-key]').forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
          const key = this.getAttribute('data-commit-key');
          const [repo, index] = key.split('__');
          updateSelectedCommits(repo, parseInt(index), this.checked);
        });
      });

      // Set up Select All button
      const selectAllBtn = document.getElementById('select-all-btn');
      if (selectAllBtn) {
        selectAllBtn.addEventListener('click', () => selectAll(true));
      }

      // Set up Deselect All button
      const deselectAllBtn = document.getElementById('deselect-all-btn');
      if (deselectAllBtn) {
        deselectAllBtn.addEventListener('click', () => selectAll(false));
      }

      // Set up Generate Summary button
      const generateBtn = document.getElementById('generate-summary-btn');
      if (generateBtn) {
        generateBtn.addEventListener('click', generateSummary);
      }

      updateUI();
    });
  </script>
</body>
</html>`;
    
    res.send(fullHtml);
  } catch (error) {
    console.error("Preview error:", error);
    res.status(500).send(`Error loading preview: ${error instanceof Error ? error.message : String(error)}`);
  }
});

app.post("/action", (req, res) => {
  const { action } = req.body;
  if (action === "approve") {
    res.send("Post approved!");
    // Trigger Hive posting logic here
  } else if (action === "edit") {
    res.send("Post editing not implemented yet.");
  } else {
    res.send("Post canceled.");
  }
});

// API: Fetch commits
app.get("/api/commits", async (req, res) => {
  try {
    const configPath = "./config.json";
    const reposPath = "./repos.json";
    const githubToken = process.env.GITHUB_TOKEN;
    const commits = await fetchCommits(configPath, reposPath, githubToken);
    res.json({ success: true, commits });
  } catch (e) {
    res.status(500).json({ success: false, error: e instanceof Error ? e.message : String(e) });
  }
});

// API: Generate summary
app.post("/api/summary", async (req, res) => {
  try {
    const { commits } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY is not set");
    const summary = await summarizeCommits(commits, apiKey);
    res.json({ success: true, summary });
  } catch (e) {
    res.status(500).json({ success: false, error: e instanceof Error ? e.message : String(e) });
  }
});

export function startServer(content: string, commits?: Record<string, CommitDetails[]>) {
  postContent = content;
  if (commits) {
    commitsData = commits;
  }
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/preview`);
  });
}
