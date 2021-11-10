<script>
	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import { getContext } from 'svelte';
	import { flyChildren } from '$lib/scripts/animations.js';
	import Icon from '$lib/Decorations/Icon.svelte';
	let size = getContext('size');
</script>

<Section sectionClass="websites-hard-section span-1220">
	<div
		class="flex-container"
		use:flyChildren={['section.websites-hard-section .flex-container *', 5, 0, 0]}>
		<Heading content="websites are hard" type="2" />
		<div class="triangle" data-direction="right" />
		<p data-direction="left">
			If you have already considered, or even researched, making a website you will undoubtedly have
			found that it's more difficult that it might seem in the beginning.
		</p>
		<p data-direction="right">
			How do you pick the right website name? How do you build it, Squarespace, Webflow, a web
			developer? Where do you host it?
		</p>
		<p data-direction="left">
			How do you stick everything together and actually launch the entire thing online?
		</p>
		<div class="bg-triangle normal" data-direction="left">
			<Icon name="triangle" width="36rem" />
		</div>
	</div>
</Section>

<style lang="scss">
	@import '../../scss-styles/mixins';

	:global(.bg-triangle svg path) {
		stroke: v(clr-line-bg);
	}

	.flex-container {
		@include flex(column nowrap, start, center);
		width: 100%;
		height: auto;
		gap: 1.5rem;
		position: relative;

		p {
			text-align: center;
		}

		.bg-triangle {
			position: absolute;
			z-index: v(z-index-behind-bg);
			// top: 0;

			&.normal {
				left: 50%;
				transform: translate(-50%, 0%);
				top: -5rem;
			}
			&.right {
				top: -5rem;
				right: 0;
				transform: rotate(180deg) translate(70%, 15%);
			}
		}
	}

	.triangle {
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 20px solid v(clr-text-accent-cyan);
        margin: 1.7rem 0;
	}

	p {
		width: 100%;
		max-width: 53rem;
		font-family: v(roboto);
		font-weight: 500;
		color: v(clr-text-focused);
		font-size: fluid(desktop, 1.5, 1.65);
		line-height: fluid(desktop, 1.6, 1.9);
	}
</style>
