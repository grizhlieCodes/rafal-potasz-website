<script>
	import { createEventDispatcher, getContext } from 'svelte';
	const dispatch = createEventDispatcher();

	import Logo from './Logo.svelte';
	import MobileNav from './MobileNav.svelte';
	import TabDesNav from './TabDesNav.svelte';
	import BurgerButton from './BurgerButton.svelte';

	export let showMobileNav = false

	$: showMobileNavReactive = showMobileNav

	let size = getContext('size');

	const toggleMobileNav = () => {
		dispatch('toggleMenu');
	};
</script>

<header>
	<Logo />
	{#if $size === 'mobile'}
		<BurgerButton on:toggleMenu={toggleMobileNav} buttonActive={showMobileNavReactive} />
		{#if showMobileNavReactive}
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
		width: 100%;
		max-width: 111rem;
		margin: auto;
		grid-area: header;
		position: relative;

		@include mq(tablet){
			padding: 7rem 0rem;
		}
	}
</style>
