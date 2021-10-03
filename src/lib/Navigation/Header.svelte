<script>
	import { createEventDispatcher, getContext } from 'svelte';
	const dispatch = createEventDispatcher();

	import Logo from './Logo.svelte';
	import MobileNav from './MobileNav.svelte';
	import TabDesNav from './TabDesNav.svelte';
	import BurgerButton from './BurgerButton.svelte';

	let showMobileNav = false,
		size = getContext('size');

	const toggleMobileNav = () => {
		showMobileNav = !showMobileNav;
		dispatch('toggleMenu');
	};
</script>

<header>
	<Logo />
	{#if $size === 'mobile'}
		<BurgerButton on:toggleMenu={toggleMobileNav} />
		{#if showMobileNav}
			<MobileNav />
		{/if}
    {:else}
        <TabDesNav />
	{/if}
</header>

<style lang="scss">
	@import '../../scss-styles/mixins';
	header {
		@include flex(row nowrap, space-between, center);
		padding: 2.8rem 0rem;
		position: relative;
		width: 100%;
		max-width: 111rem;
		margin: auto;
		grid-area: header;
	}
</style>
