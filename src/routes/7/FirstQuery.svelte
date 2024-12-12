<script lang="ts">
    import Post from "$src/components/Post.svelte";
    import { trpc } from "$src/lib/trpc";
    import { createQuery } from "@tanstack/svelte-query";

    const postsQuery = createQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            return await trpc.posts.getList.query();
        },
    });
</script>

{#each $postsQuery?.data?.posts ?? [] as post, i (post.id)}
    <Post
        title={post.title}
        content={post.content}
        liked={post.userHasLiked}
        onDelete={async () => alert("The mutation is not important here.")}
    />
{/each}
