# Steps of setting up tanstack in a fresh svelte project.

Assuming you have, Sveltekit, tRPC.

1. Install the following.

```sh
npm install @tanstack/svelte-query
```

2. Setup the context in +layout.svelte

```svelte
<!-- +layout.svelte -->
<script lang="ts">
    import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
    const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
    <slot />
</QueryClientProvider>
```

3. Use it.

```svelte
<!-- +page.svelte -->
<script>
    import { createQuery } from "@tanstack/svelte-query";

    const myQuery =createQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            // attach any async function here.
            return await trpc.posts.getList.query();
        },
    });
    })
</script>

<#if $myQuery.isLoading>
    <p>Loading...</p>
{:else if $myQuery.isError}
    <p>Error: {$myQuery.error}</p>
{:else}
    <pre>
{JSON.stringify($myQuery.data, null, 2)}
    </pre>
{/if}
```

### Examples

I prepared like 10 different data-fetching patterns for you to try:

1. Basic Query.
2. Basic Query but with SSR.
3. Basic Query + User Input
4. Basic Mutate ("Like" a post) + invalidate by refetch.
5. Basic Mutate ("Like" a post) + invalidate by optimistic update.
6. Basic Mutate ("Like" a post) + invalidate across separate component trees.
7. Deduped query because of cache.
