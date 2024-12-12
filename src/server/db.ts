// This is a fake json database simulated by `lowdb`

import { JSONFileSyncPreset } from "lowdb/node";

// Schema
export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
};
export type User = {
  id: string;
  name: string;
  ip: string;
};
export type Like = {
  id: string;
  user_id: string;
  post_id: string;
};

export type Database = {
  posts: Post[];
  users: User[];
  likes: Like[];
};

const defaultData: Database = {
  posts: [
    {
      id: "aa1",
      title: "My first post",
      content: "This is the first post.",
      published: true,
    },
    {
      id: "aa2",
      title: "My second post",
      content: "This is the second post.",
      published: true,
    },
  ],
  users: [],
  likes: [],
};

/** Client */
export const db = JSONFileSyncPreset<Database>("db.json", defaultData);
