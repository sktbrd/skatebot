import { Client, PrivateKey, Operation } from "@hiveio/dhive";

interface HiveConfig {
  hiveUser: string;
  postingKey: string;
  tags: string[];
}

export async function postToHive(postContent: string, configPath: string): Promise<void> {
  const config: HiveConfig = require(configPath);

  const client = new Client(["https://api.hive.blog"]);
  const privateKey = PrivateKey.fromString(config.postingKey);

  const permlink = `devlog-${Date.now()}`;

  const operations: Operation[] = [
    [
      "comment",
      {
        parent_author: "",
        parent_permlink: "hive",
        author: config.hiveUser,
        permlink,
        title: "Skatehive Devlog",
        body: postContent,
        json_metadata: JSON.stringify({ tags: config.tags }),
      },
    ] as Operation,
  ];

  await client.broadcast.sendOperations(operations, privateKey);
}