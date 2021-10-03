<script>
    import {fade} from 'svelte/transition';
</script>

<div class="overlay" transition:fade={{duration: 250}}></div>

<style lang="scss">
    @import '../../scss-styles/mixins';
    .overlay {
        position: fixed;
        @include ab-center();
        width: 100%;
        height: 100%;
        background: v(clr-overlay-bg);
        transition: background 400ms;
        opacity: 0.95;
        z-index: v(z-index-overlay);
    }
</style>