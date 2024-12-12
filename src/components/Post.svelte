<script lang="ts">
    import { IconHeartFilled, IconHeartOutline } from "$src/icons";

    export let title: string;
    export let content: string;
    export let liked: boolean;
    export let loading: boolean = false;
    export let onLike: (() => void) | undefined = undefined;
    export let onDelete: (() => void) | undefined = undefined;
</script>

<div class="container">
    <header>
        <h3>{title}</h3>

        <div>
            {#if onLike}
                <button on:click={onLike} disabled={loading}>
                    {#if liked}
                        <IconHeartFilled />
                    {:else}
                        <IconHeartOutline />
                    {/if}
                </button>
            {/if}
            {#if onDelete}
                <button on:click={onDelete} disabled={loading}>X</button>
            {/if}
        </div>
    </header>
    <p>{content}</p>
</div>

<style>
    .container {
        border: 1px solid black;
        padding: 10px;
    }

    .container > header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .container > header > div {
        display: flex;
        gap: 2px;
        align-items: center;
    }
</style>
