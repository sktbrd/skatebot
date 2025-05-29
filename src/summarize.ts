import OpenAI from "openai";
import fs from "fs-extra";

interface CommitDetails {
  author: string;
  message: string;
  date: string;
}

export async function summarizeCommits(commits: Record<string, CommitDetails[]>, apiKey: string): Promise<string> {
  const openai = new OpenAI({ apiKey });

  const commitMessages = Object.entries(commits)
    .map(([repo, commitList]) => {
      const messages = commitList.map(commit => 
        `- **${commit.author}** (${commit.date}): ${commit.message}`
      ).join("\n");
      return `### ${repo}\n${messages}`;
    })
    .join("\n\n");

  const prompt = `Summarize the following detailed commit information into an engaging blog post for SkateHive. Include information about who contributed, what was accomplished, and provide insights into the development progress:\n\n${commitMessages}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a technical writer creating engaging blog posts about open source development progress for the SkateHive community. Focus on highlighting contributors and their achievements." },
      { role: "user", content: prompt },
    ],
    max_tokens: 1500,
  });

  if (!response.choices || !response.choices[0].message) {
    throw new Error("Failed to generate a response from the AI model.");
  }

  return (response.choices[0].message.content as string).trim();
}

interface CommitDetails {
  author: string;
  message: string;
  date: string;
}

export function generateBlogSummary(commits: Record<string, CommitDetails[]>): string {
  let blogContent = "# Commit Summary\n\n";

  for (const [repo, commitList] of Object.entries(commits)) {
    blogContent += `## Repository: ${repo}\n\n`;

    for (const commit of commitList) {
      blogContent += `- **Author**: ${commit.author}\n`;
      blogContent += `  **Date**: ${commit.date}\n`;
      blogContent += `  **Message**: ${commit.message}\n\n`;
    }
  }

  return blogContent;
}

export function saveBlogToFile(blogContent: string, filePath: string): void {
  fs.writeFileSync(filePath, blogContent, "utf-8");
}