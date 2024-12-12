<script lang="ts">
    import FirstQuery from "./FirstQuery.svelte";
    import SecondQuery from "./SecondQuery.svelte";
</script>

<h2>Dedupping queries by caching</h2>
<p>
    Best demonstrated when you open devtools, and see only 1 call for
    `trpc.posts.getList`. Even though code-wise, it's being called twice: First
    by {"<FirstQuery />"} and second by {"<SecondQuery />"}.
    <a
        href={`vscode://file${import.meta.env.PROJECT_ROOT}${new URL(import.meta.url).pathname}:5:1`}
        ><code>[See Code]</code></a
    >
</p>

<br />

<div class="container">
    <div>
        First Query
        <FirstQuery />
    </div>
    <div>
        Second Query
        <SecondQuery />
    </div>
</div>

<style>
    .container {
        display: flex;
        width: 100%;
    }

    .container > div {
        width: 100%;
    }
</style>
