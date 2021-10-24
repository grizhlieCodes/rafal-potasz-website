<script>
	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import { getContext } from 'svelte';
	import { flyChildren } from '$lib/scripts/animations.js';
	import Icon from '$lib/Decorations/Icon.svelte';
	let size = getContext('size');
</script>

<Section sectionClass="isnt-you span-1220">
	<div
		class="flex-container"
		use:flyChildren={['section.websites-hard-section .flex-container *', 5, 0, 0.1]}>
		<Heading content="it just" content2="isn't you" type="2-special" />
		<div class="triangle" data-direction="right" />
		<p data-direction="left">You might have tried to or at least considered doing it yourself.</p>
		<p data-direction="right">
			But more often than not the results do not fill you with excitement and joy as the website
			does not reflect who you really are, what you're all about - it doesn't capture your essence,
			your uniqueness.
		</p>
		<p data-direction="left">
			And these are the building blocks of what makes people come to
			<span>you</span>
			. And you know that a website is a great way for you to digitally make a great first
			impression.
		</p>
		<p data-direction="right">
			<i>It can be better.</i>
		</p>

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
	}

	.triangle {
		border-left: 10px solid transparent;
		border-right: 10px solid transparent;
		border-top: 20px solid v(clr-text-accent-red-strong);
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

		span {
			color: v(clr-text-accent-cyan);
			font-weight: 600;
		}
	}
</style>
