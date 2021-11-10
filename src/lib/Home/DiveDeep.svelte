<script>
	import Section from '$lib/Core/Section.svelte';
	import Heading from '$lib/Decorations/Heading.svelte';
	import { getContext } from 'svelte';
	import { flyChildren } from '$lib/scripts/animations.js';
	import Button from '$lib/Button.svelte';

	const buttonData = {
		content: 'book discovery call 🔎',
		btnClass: 'primary',
		type: 'anchor',
		link: '#contact-section',
		extraContent: "margin-top: 4rem;"
	};
</script>

<Section sectionClass="dive-deep span-1220">
	<div
		class="flex-container"
<<<<<<< HEAD
		use:flyChildren={['section.dive-deep .flex-container *', 5, 0, 0]}>
=======
		use:flyChildren={['section.dive-deep .flex-container *', 5, 0, 0.1]}>
>>>>>>> 81a38544b8a5317dc8b5fc096340f1ca00727d66
		<Heading content="i dive deep" type="2" />
		<div class="triangle" data-direction="right" />
		<p data-direction="left">
			I approach every project as a unique problem that requires a unique solution - I'm not into
			templates or quick fixes and you can bet your ass that I am passionate and serious about what
			I do.
		</p>
		<p data-direction="right">
			I improve daily and take my work seriously. I don't pretend to have all the solutions
			initially but I do come up with them ultimately because I am great at what I do: distilling a
			precise problem and delivering a precise solution.
		</p>
		<p data-direction="left">Just thought I'd share a few words about who you'll work with.</p>
		<!-- <div class="button-container"> -->
			<Button
				{...buttonData} />
		<!-- </div> -->
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

		.button-container {
			margin-top: 4rem;
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
