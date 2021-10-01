<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher();

    import Logo from './Logo.svelte'
    import MobileNav from './MobileNav.svelte'
import BurgerButton from './BurgerButton.svelte'

    let showMobileNav = false

    const toggleMobileNav = () => {
        showMobileNav = !showMobileNav
        dispatch('toggleMenu')
    }
</script>

<header>
    <Logo/>
    <BurgerButton on:toggleMenu={toggleMobileNav}/>
    {#if showMobileNav}
         <MobileNav/>
    {/if}
</header>

<style lang="scss">
    @import '../../scss-styles/mixins';
    header {
        @include flex(row nowrap, space-between, center);
        padding: 2.8rem 2.4rem;
        position: relative;
    }
</style>