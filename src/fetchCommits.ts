import { Octokit } from "@octokit/rest";
import dayjs from "dayjs";
import fs from "fs-extra";

interface RepoConfig {
  last_checked: string; // changed from lastChecked
}

export async function fetchCommits(
  configPath: string,
  reposPath: string,
  githubToken?: string
): Promise<Record<string, { author: string; message: string; date: string }[]>> {
  console.log("[fetchCommits] Using GitHub token:", githubToken ? githubToken.slice(0, 6) + "..." : "none");

  const octokit = githubToken ? new Octokit({ auth: githubToken }) : new Octokit();

  // Load config and repos
  const config: RepoConfig = fs.readJSONSync(configPath);
  const repos: string[] = fs.readJSONSync(reposPath);

  const lastChecked = dayjs(config.last_checked); // changed from lastChecked
  const allCommits: Record<string, { author: string; message: string; date: string }[]> = {};

  for (const repo of repos) {
    const [owner, repoName] = repo.split("/");
    try {
      const commits = await octokit.repos.listCommits({
        owner,
        repo: repoName,
        since: lastChecked.toISOString(),
      });
      const lastTwoCommits = commits.data.slice(-2);
      console.log(`[DEBUG] ${repo} last 2 commits:`, lastTwoCommits.map(c => ({
        author: c.commit.author?.name,
        message: c.commit.message,
        date: c.commit.author?.date
      })));
      allCommits[repo] = commits.data.map(commit => ({
        author: commit.commit.author?.name || "Unknown Author",
        message: commit.commit.message || "No message provided",
        date: commit.commit.author?.date || "Unknown Date",
      }));
    } catch (err) {
      console.error(`[fetchCommits] Error fetching ${repo}:`, err);
      allCommits[repo] = [];
    }
  }

  return allCommits;
}