<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import {fade} from 'svelte/transition';

    const dispatchModalClosure = () => {
        dispatch('closeModal')
    }

    const handleKeydown = (e) => {
        let key = e.key
        let escape = key === 'Escape'
        if(escape){
            dispatchModalClosure()
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="overlay" transition:fade={{duration: 250}} on:click={dispatchModalClosure}></div>

<style lang="scss">
    @import '../../scss-styles/mixins';
    .overlay {
        position: fixed;
        @include ab-center();
        width: 100%;
        height: 100vh;
        background: v(clr-overlay-bg);
        transition: background 400ms;
        opacity: 0.95;
        z-index: v(z-index-overlay);
    }
</style>