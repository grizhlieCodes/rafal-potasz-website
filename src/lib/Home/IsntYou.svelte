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
		use:flyChildren={['section.isnt-you .flex-container *', 5, 0, 0]}>
		<Heading content="it just" content2="isn't you" type="2-special" />
		<div class="triangle" data-direction="right" />
		<p data-direction="left">When we fail to capture our uniqueness and essence within our website it could yield an unavoidable outcome: someone else will steal customers/attention from you as they've succeeded at standing out.</p>
		<p data-direction="right">
			It is my observation that whilst a lot of developers make good websites, they struggle capturing the essence and uniqueness of their clients.
		</p>
		<p data-direction="left">
			This results in <span>generic websites</span> that simply can't champion the perspectives and spirit of their owners.
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
