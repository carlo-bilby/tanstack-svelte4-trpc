<script lang="ts">
    import { trpc } from "$lib/trpc";
    import Post from "$src/components/Post.svelte";
    import {
        createMutation,
        createQuery,
        useQueryClient,
    } from "@tanstack/svelte-query";

    const postsQuery = createQuery({
        queryKey: ["posts"], // This determines the cache and invalidation.
        queryFn: async () => {
            return await trpc.posts.getList.query();
        },
    });

    const queryClient = useQueryClient();

    const likeMutation = createMutation({
        mutationKey: ["post-like"],
        mutationFn: async (postId: number) => {
            const postIndex =
                $postsQuery.data?.posts.findIndex(
                    (post) => post.id === postId,
                ) ?? -1;
            if (postIndex === -1) return;

            const userHasLiked = $postsQuery.data?.posts[postIndex];
            return await trpc.posts.likePost.mutate({
                postId: postId,
                like: !userHasLiked,
            });
        },
        onSuccess: () => {
            // Preferable if you don't have reference to the `postsQuery`
            queryClient.invalidateQueries({ queryKey: ["posts"] });

            // Alternatively, if you have reference to the `postsQuery` in the same scope.
            // $postsQuery.refetch();
        },
    });
</script>

<h2>Basic Mutate ("Like" a post") + invalidate by refetch</h2>
<p>
    Demonstration on how to invalidate a query after a mutation happens.
    <a
        href={`vscode://file${import.meta.env.PROJECT_ROOT}${new URL(import.meta.url).pathname}:5:1`}
        ><code>[See Code]</code></a
    >
</p>

<br />

<pre>
  [QUERY]
  isLoading: {$postsQuery.isLoading} // Changes when first loading.
  isFetching: {$postsQuery.isFetching} // Changes when refetching + first loading

  [MUTATION]
  isPending: {$likeMutation.isPending}
  isSuccess: {$likeMutation.isSuccess}
  isError: {$likeMutation.isError}
</pre>

Data:

<pre>{JSON.stringify($postsQuery.data, null, 2)}</pre>

<button on:click={() => $postsQuery.refetch()}>Refetch</button>

{#each $postsQuery?.data?.posts ?? [] as post (post.id)}
    <Post
        title={post.title}
        content={post.content}
        liked={post.userHasLiked}
        loading={$likeMutation.isPending || $postsQuery.isRefetching}
        onLike={async () => {
            $likeMutation.mutateAsync(post.id);
        }}
    />
{/each}
