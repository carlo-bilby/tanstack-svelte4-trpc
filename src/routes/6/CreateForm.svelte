<script lang="ts">
    import { trpc } from "$src/lib/trpc";
    import { createMutation, useQueryClient } from "@tanstack/svelte-query";

    const queryClient = useQueryClient();

    let title = "";
    let content = "";
    let published = false;

    const createPostMutation = createMutation({
        mutationKey: ["create-post"],
        mutationFn: async () => {
            await trpc.posts.createPost.mutate({
                title: title,
                content: content,
                published: published,
            });
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
</script>

<div class="container">
    This {"<CreateForm />"} is separate and doesn't need to know where the "posts"
    query is located.
    <a
        href={`vscode://file${import.meta.env.PROJECT_ROOT}${new URL(import.meta.url).pathname}:5:1`}
        ><code>[See Code]</code></a
    >

    <br />
    <br />
    Title:<br /><input type="text" bind:value={title} />
    <br />
    Content:<br /> <textarea bind:value={content} />
    <br />
    Published: <input type="checkbox" bind:checked={published} />
    <br />
    <br />
    <button
        on:click={async () => {
            $createPostMutation.mutateAsync();
        }}>Submit</button
    >
</div>

<style>
    .container {
        border: 1px solid black;
        padding: 10px;
    }
</style>
