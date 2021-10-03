<script>
	import Icon from '../Decorations/Icon.svelte';
	import {flyItem} from '$lib/scripts/animations.js'
</script>

<a href="/" class="logo-container" use:flyItem={'-20rem'}>
	<div class="logo-container__logo-img-container">
		<Icon name="logo" width="3.9rem" />
	</div>
	<p class="logo-container__logo-text">
		rafal<span>potasz</span>
	</p>
</a>

<style lang="scss">
	@import '../../scss-styles/mixins';

	.logo-container {
		z-index: v(z-index-priority);
		@include flex(row nowrap, start, center);
		color: v(clr-text-heading);

		&__logo-text {
			transition: color 400ms;
			font-family: 'Fira Sans', sans-serif;
			text-transform: uppercase;
			font-weight: 700;
			font-size: 2rem;
			color: inherit;

			span {
				color: v(clr-text-logo-span);
				transition: color 400ms;
			}
		}
	}

	a.logo-container:hover {
		color: v(clr-text-accent-cyan);

		span {
			color: inherit;
		}
	}

	//Style the header logo
	:global(a.logo-container svg.logo path) {
		fill: v(clr-text-heading) !important;
	}
	:global(a.logo-container:hover svg.logo path) {
		fill: v(clr-text-accent-cyan) !important;
	}
</style>
