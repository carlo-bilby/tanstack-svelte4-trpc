<script lang="ts">
    import { trpc } from "$lib/trpc";
    import {
        createQuery,
        hydrate,
        useQueryClient,
    } from "@tanstack/svelte-query";

    export let data;
    const queryClient = useQueryClient();
    hydrate(queryClient, data.dehydratedState);

    const postsQuery = createQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            return await trpc.posts.getList.query();
        },
    });
</script>

<h2>Basic Query but with SSR</h2>
<p>
    There are very rare cases where you want SSR (e.g. a social app that needs
    to have a {"<head />"} with metadata or for SEO purposes. I made a custom utility
    with TanStack's hydration APIs. Go to Network devtools and notice how this has
    the data rendered when the document is fetched.
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
