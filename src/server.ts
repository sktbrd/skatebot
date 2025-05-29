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

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/preview", async (req, res) => {
  const configPath = "./config.json";
  const reposPath = "./repos.json";
  const githubToken = process.env.GITHUB_TOKEN;
  const commits = await fetchCommits(configPath, reposPath, githubToken);
  const html = renderToString(React.createElement(Preview, {
    postContent,
    commits
  }));
  res.send(`<!DOCTYPE html><html><head><title>SkateHive DevBot Preview</title></head><body>${html}</body></html>`);
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
