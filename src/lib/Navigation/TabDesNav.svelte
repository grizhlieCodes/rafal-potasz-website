<script>
	import DmToggle from './DarkmodeToggle.svelte';

	import { flyItem } from '$lib/scripts/animations.js';
	import { page } from '$app/stores';
	$: path = $page.path;
	import { capitaliseFirstLetter } from '$lib/scripts/helperFunctions.js';
	import Icon from '$lib/Decorations/Icon.svelte';
	let navData = [
		{ name: 'home', link: '/' },
		{ name: 'about', link: '/about' },
		{ name: 'portfolio', link: '/portfolio' }
	];

	export let location;
</script>

{#if location === 'header'}
	<nav class="navigation header">
		{#each navData as { name, link }, i}
			<a
				href={link}
				class="navigation__link"
				class:active={path === link}
				use:flyItem={['-20rem', 0.15, i]}>
				<Icon {name} width="1.8rem" />

				<p class="navigation__link-text">{capitaliseFirstLetter(name)}</p>
			</a>
		{/each}
		<DmToggle />

	</nav>
{:else}
	<nav class="navigation footer">
		{#each navData as { name, link }, i}
			<a
				href={link}
				class="navigation__link"
				class:active={path === link}
				use:flyItem={['-20rem', 0.15, i]}>
				<Icon {name} width="1.8rem" />

				<p class="navigation__link-text">{capitaliseFirstLetter(name)}</p>
			</a>
		{/each}

	</nav>
{/if}

<style lang="scss">
	@import '../../scss-styles/mixins';

	.navigation {
		z-index: v(z-index-priority);
		@include flex(row nowrap, start, start);
		gap: 3rem;

		&.footer {
			z-index: 0;
		}
	}

	a.navigation__link {
		transition: color 400ms;
		font-size: 1.6rem;
		font-family: v(fira);
		color: v(clr-text-faded);
		z-index: 5;
		@include flex(row nowrap, start, center);
		gap: 1rem;

		&.active {
			color: v(clr-text-accent-cyan);
		}

		&:hover:not(.active) {
			color: v(clr-text-focused);
		}
	}

	:global(a.navigation__link.active svg path) {
		fill: v(clr-text-accent-cyan) !important;
	}

	:global(a.navigation__link:hover:not(.active) svg path) {
		fill: v(clr-text-focused) !important;
	}
</style>
