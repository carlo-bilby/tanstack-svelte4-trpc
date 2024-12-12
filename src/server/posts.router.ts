// For simplicity's sake, this is just 1 file.
// In a normal project this is split up into `*Router.ts`

import type { RequestEvent } from "@sveltejs/kit";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { db } from "./db";
import { createTRPCRouter, publicProcedure } from "./trpc";

export const postsRouter = createTRPCRouter({
  getCurrentUser: publicProcedure.query(async ({ ctx }) => {
    await fakeAwait(500);

    const user = getOrCreateNewUserBasedOnCookie(ctx.event);
    return user;
  }),
  getList: publicProcedure.query(async ({ ctx, input }) => {
    await fakeAwait(500);

    const user = getOrCreateNewUserBasedOnCookie(ctx.event);

    const postsWithLikes = db.data.posts.map((_post) => {
      let userHasLiked = false;
      const likes = db.data.likes.filter((_like) => {
        if (_like.user_id === user.id && _post.id === _like.post_id)
          userHasLiked = true;

        return _like.post_id === _post.id;
      });

      return {
        ..._post,
        likes: likes.length,
        userHasLiked: userHasLiked,
      };
    });

    return {
      posts: postsWithLikes,
      random: Math.random(),
    };
  }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    await fakeAwait(500);

    const user = getOrCreateNewUserBasedOnCookie(ctx.event);

    const post = db.data.posts.find((_post) => _post.id === input);
    if (!post) return null;

    let userHasLiked = false;
    const likes = db.data.likes.filter((_like) => {
      if (_like.user_id === user.id) userHasLiked = true;

      return _like.post_id === post?.id;
    });

    return {
      ...post,
      likes: likes.length,
      userHasLiked: userHasLiked,
    };
  }),
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        published: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await fakeAwait(500);

      const newId = createRandomString();

      const newPost = {
        id: newId,
        title: input.title,
        content: input.content,
        published: input.published,
      };

      db.update(({ posts }) => {
        posts.push(newPost);
      });

      return newPost;
    }),
  deletePost: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await fakeAwait(500);

      db.update(({ posts, likes }) => {
        const postIndex = posts.findIndex((_post) => _post.id === input);
        if (postIndex === -1) return;

        posts.splice(postIndex, 1);

        likes.filter((_like) => _like.post_id !== input);
      });
    }),
  likePost: publicProcedure
    .input(z.object({ postId: z.string(), like: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await fakeAwait(500);

      // Create or Get the current user.
      const user = getOrCreateNewUserBasedOnCookie(ctx.event);

      const postIndex = db.data.posts.findIndex(
        (_post) => _post.id === input.postId,
      );
      if (postIndex === -1)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Post not found",
        });

      const alreadyLikedIndex = db.data.likes.findIndex(
        (like) =>
          like.post_id === db.data.posts[postIndex].id &&
          user.id === like.user_id,
      );

      db.update(({ likes: _likes }) => {
        if (alreadyLikedIndex === -1) {
          _likes.push({
            id: createRandomString(),
            post_id: input.postId,
            user_id: user.id,
          });
        } else {
          _likes.splice(alreadyLikedIndex, 1);
        }
      });

      return true;
    }),
});

// UTILS

async function fakeAwait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
}

/**
 * Creates a new user or gets the same user (You can tell them apart by the cookie being set the first time)
 * Just a quick and dirty way to tell users apart without auth.
 */
function getOrCreateNewUserBasedOnCookie(event: RequestEvent) {
  const randomIpAddress =
    event.cookies.get("random-ip-address") ?? createRandomString();

  const user = db.data.users.find((user) => user.ip === randomIpAddress);
  if (user) return user;

  const randomNames = [
    "Carlo Taleon",
    "Michael Belete",
    "Denise Wong",
    "Clem Gutierrez",
    "Rupsignidha",
  ];
  const randomName = randomNames[Math.random() * randomNames.length];

  const newUser = {
    id: createRandomString(),
    ip: randomIpAddress,
    name: randomName,
  };
  db.data.users.push(newUser);

  event.cookies.set("random-ip-address", randomIpAddress, { path: "/" });

  return newUser;
}

function createRandomString() {
  const alphabet = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  let randomString = "";
  for (let i = 0; i < 10; i++) {
    randomString += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return randomString;
}
