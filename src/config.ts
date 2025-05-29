import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const CONFIG_PATH = path.resolve('config.json');
const REPOS_PATH = path.resolve('repos.json');

export type BotConfig = {
  hive_user: string;
  tags: string[];
  last_checked: string;
};

export function getConfig(): BotConfig {
  return fs.readJsonSync(CONFIG_PATH);
}

export function getRepos(): string[] {
  return fs.readJsonSync(REPOS_PATH);
}

export function updateLastChecked(timestamp: string) {
  const config = getConfig();
  config.last_checked = timestamp;
  fs.writeJsonSync(CONFIG_PATH, { ...config, last_checked: timestamp }, { spaces: 2 });
}
