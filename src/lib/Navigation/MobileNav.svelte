<script>
	import { page } from '$app/stores';
	import { flyItem } from '$lib/scripts/animations.js';
	import {fly} from 'svelte/transition';
	$: path = $page.path;
	import { capitaliseFirstLetter } from '$lib/scripts/helperFunctions.js';
	import Icon from '$lib/Decorations/Icon.svelte';
	let navData = [
		{ name: 'home', link: '/' },
		{ name: 'about', link: '/about' },
		{ name: 'portfolio', link: '/portfolio' }
	];
</script>

<nav class="navigation" out:fly={{duration: 250, x: -100}}>
	{#each navData as { name, link }, i}
		<a href={link} class="navigation__link" class:active={path === link} use:flyItem={['-20rem',0.15,i]} >
			<Icon {name} width="2.89rem"/>

			<p class="navigation__link-text">{capitaliseFirstLetter(name)}</p>
		</a>
	{/each}
</nav>

<style lang="scss">
	@import '../../scss-styles/mixins';

	.navigation {
		position: absolute;
		top: calc(100% + 3rem);
		z-index: v(z-index-priority);
		@include flex(column nowrap, start, start);
		gap: 6rem;
	}

	a.navigation__link {
		transition: color 250ms;
		font-size: 2.8rem;
		font-family: v(fira);
		color: v(clr-highlight-3);
		z-index: 5;
		@include flex(row nowrap, start, center);
		gap: 2.2rem;

		&.active {
			color: v(clr-accent-cyan);
		}

		&:hover:not(.active) {
			color: v(clr-highlight-2);
		}
	}

	:global(a.navigation__link.active svg path) {
		fill: v(clr-accent-cyan) !important;
	}

	:global(a.navigation__link:hover:not(.active) svg path) {
		fill: v(clr-highlight-2) !important;
	}
</style>
