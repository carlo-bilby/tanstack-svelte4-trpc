<script lang="ts">
    import { trpc } from "$lib/trpc";
    import { createQuery } from "@tanstack/svelte-query";

    const postsQuery = createQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            return await trpc.posts.getList.query();
        },
    });
</script>

<h2>Basic Query but with SSR</h2>
<p>
    A very basic usage of TanStack Query. Notice how you have, a unified state
    management (data, loading statuses, errors, refetch, etc.) for queries out
    of the box. Just by using the <code>{"$postsQuery"}</code>.
    <a
        href={`vscode://file${import.meta.env.PROJECT_ROOT}${new URL(import.meta.url).pathname}:5:1`}
        ><code>[See Code]</code></a
    >
</p>

<br />

<pre>
    isLoading: {$postsQuery.isLoading} // Changes when first loading.
    isFetching: {$postsQuery.isFetching} // Changes when refetching + first loading
</pre>

How it's rendered:
{#if $postsQuery.isFetching}
    <p>Loading...</p>
{:else if $postsQuery.isError}
    <p>Error: {$postsQuery.error}</p>
{:else}
    <pre>
{JSON.stringify($postsQuery.data, null, 2)}
    </pre>
{/if}

<button on:click={() => $postsQuery.refetch()}>Refetch</button>
