<script lang="ts">
  import { trpc } from "$lib/trpc";
  import Post from "$src/components/Post.svelte";
  import { createMutation, createQuery } from "@tanstack/svelte-query";
  import CreateForm from "./CreateForm.svelte";

  const postsQuery = createQuery({
    queryKey: ["posts"], // This determines the cache and invalidation.
    queryFn: async () => {
      return await trpc.posts.getList.query();
    },
  });

  const deleteMutation = createMutation({
    mutationKey: ["post-delete"],
    mutationFn: async (postId: number) => {
      return await trpc.posts.deletePost.mutate(postId);
    },
    onSuccess: () => {
      $postsQuery.refetch();
    },
  });
</script>

<h2>
  Basic Mutate ("Create" or "Delete") + invalidate across separate component
  trees.
</h2>
<p>
  Demonstration on how to invalidate when across different components, without
  needing to know what the parent is.
  <a
    href={`vscode://file${import.meta.env.PROJECT_ROOT}${new URL(import.meta.url).pathname}:5:1`}
    ><code>[See Code]</code></a
  >
</p>

<br />

<CreateForm />

<br />

Data:
<pre>
  [QUERY]
  isLoading: {$postsQuery.isLoading} // Changes when first loading.
  isFetching: {$postsQuery.isFetching} // Changes when refetching + first loading
</pre>

How it's rendered:
{#if $postsQuery.isFetching}
  <p>Loading...</p>
{:else if $postsQuery.isError}
  <p>Error: {$postsQuery.error}</p>
{:else}
  {#each $postsQuery?.data?.posts ?? [] as post, i (post.id)}
    <Post
      title={post.title}
      content={post.content}
      liked={post.userHasLiked}
      loading={$deleteMutation.isPending}
      onDelete={async () => $deleteMutation.mutateAsync(post.id)}
    />
  {/each}
{/if}

<button on:click={() => $postsQuery.refetch()}>Refetch</button>
