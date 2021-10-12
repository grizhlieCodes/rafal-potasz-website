<script>
	export let type = 'darkOnly',
		location;
	import Icon from '../Decorations/Icon.svelte';
	import { flyItem } from '$lib/scripts/animations.js';
	$: logoClass = type === 'darkOnly' ? 'dark' : 'both';
</script>

{#if location === 'header'}
	<a href="/" class="logo-container {logoClass}" use:flyItem={'-20rem'}>
		<div class="logo-container__logo-img-container">
			<Icon name="logo" width="3.9rem" />
		</div>
		<p class="logo-container__logo-text">
			rafal
			<span>potasz</span>
		</p>
	</a>
{:else}
	<a href="/" class="logo-container {logoClass} footer" use:flyItem={'-20rem'}>
		<div class="logo-container__logo-img-container">
			<Icon name="logo" width="3.9rem" />
		</div>
		<p class="logo-container__logo-text">
			rafal
			<span>potasz</span>
		</p>
	</a>
{/if}

<style lang="scss">
	@import '../../scss-styles/mixins';

	.logo-container {
		z-index: v(z-index-priority);
		@include flex(row nowrap, start, center);

		&.footer {
			z-index: 0;
		}

		&__logo-text {
			transition: color 400ms;
			font-family: 'Fira Sans', sans-serif;
			text-transform: uppercase;
			font-weight: 700;
			font-size: 2rem;

			span {
				transition: color 400ms;
			}
		}
	}
	.logo-container.both {
		p {
			color: v(clr-text-heading);
		}
		span {
			color: v(clr-text-logo-span);
		}
	}
	.logo-container.dark {
		p {
			color: v(clr-text-logo-dark-focused);
		}
		span {
			color: v(clr-text-logo-dark-span);
		}
	}

	a.logo-container:is(.dark, .both):hover {
		p {
			color: v(clr-text-accent-cyan);
		}
		span {
			color: inherit;
		}
	}

	//Style the header logo
	:global(a.logo-container.both svg.logo path) {
		fill: v(clr-text-heading) !important;
	}
	:global(a.logo-container.dark svg.logo path) {
		fill: v(clr-text-logo-dark-focused) !important;
	}
	:global(a.logo-container:hover svg.logo path) {
		fill: v(clr-text-accent-cyan) !important;
	}
</style>
