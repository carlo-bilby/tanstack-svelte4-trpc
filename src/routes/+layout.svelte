<script lang="ts">
    import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";
    const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
    <nav>
        <ol>
            <li><a href="/">Basic Query</a></li>
            <li><a href="/2">Basic Query but with SSR</a></li>
            <li><a href="/3">Basic Query + User Input</a></li>
            <li>
                <a href="/4"
                    >Basic Mutate ("Like" a post) + invalidate by refetch</a
                >
            </li>
            <li>
                <a href="/5"
                    >Basic Mutate ("Like" a post) + invalidate by optimistic
                    update.</a
                >
            </li>
            <li>
                <a href="/6"
                    >Basic Mutate ("Create"/"Delete" a post) + invalidate across
                    separate component trees.</a
                >
            </li>
            <li>
                <a href="/7">Deduped Query because of cache.</a>
            </li>
        </ol>
    </nav>
    <hr />
    <slot />
</QueryClientProvider>
