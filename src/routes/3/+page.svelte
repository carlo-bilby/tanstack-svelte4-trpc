<script lang="ts">
    import { trpc } from "$lib/trpc";
    import { createQuery } from "@tanstack/svelte-query";

    let postId: string = "aa1";

    $: postQuery = createQuery({
        queryKey: ["post", postId], // This determines the cache and invalidation.
        queryFn: async () => {
            return await trpc.posts.getById.query(postId);
        },
        enabled: postId !== null,
    });
</script>

<h2>Basic Query + User input</h2>
<p>
    Demonstration on how to query using a specific variable.
    <a
        href={`vscode://file${import.meta.env.PROJECT_ROOT}${new URL(import.meta.url).pathname}:5:1`}
        ><code>[See Code]</code></a
    >
</p>

<br />

Post ID: <input type="text" bind:value={postId} />
<pre>
  isLoading: {$postQuery.isLoading} // Changes when first loading.
  isFetching: {$postQuery.isFetching} // Changes when refetching + first loading
</pre>

Data:
<pre>
{JSON.stringify($postQuery.data, null, 2)}
</pre>

<button on:click={() => $postQuery.refetch()}>Refetch</button>
