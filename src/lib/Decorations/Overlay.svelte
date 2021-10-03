<script>
    import {fade} from 'svelte/transition';
</script>

<div class="overlay" transition:fade={{duration: 250}}></div>

<style lang="scss">
    @import '../../scss-styles/mixins';
    .overlay {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: v(clr-bg);
        opacity: 0.95;
        z-index: v(z-index-overlay);
    }
</style>