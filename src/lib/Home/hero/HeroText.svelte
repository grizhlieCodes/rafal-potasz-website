<script>
	import Button from '$lib/Button.svelte';
	import Heading from '$lib/Decorations/Heading.svelte'

	let buttons = [
		{
			content: 'my work 👆',
			btnClass: 'primary',
			type: 'anchor',
			link: '#portfolio-section'
		},
		{
			content: 'say hello 📧',
			btnClass: 'secondary',
			type: 'anchor',
			link: '#contact-section'
		}
	];
</script>

<div class="hero-text-container">
	<Heading content="No-nonsense" content2="web developer" type="1" />
	<p>
		Hello 👋, I'm Rafal, a self-taught front-end web developer with an eye for design, obsessively
		learning towards becoming full-stack.
	</p>
	<div class="hero-text-container__cta-container">
		{#each buttons as data}
			<Button {...data} />
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../../scss-styles/mixins';
	.hero-text-container {
		width: 100%;
		@include flex(column nowrap, start, center);
		gap: 2rem;
		font-family: v(fira);
		text-align: center;

		@include mq(tablet) {
			flex-grow: 1;
			text-align: left;
			align-items: start;
		}

		h1 {

		}

		p {
			max-width: 34rem;
			margin-bottom: 2rem;
			font-size: 1.8rem;
			color: v(clr-text-focused);
			transition: color 400ms;
			line-height: 2.3rem;
			font-weight: 700;

			@include mq(tablet) {
				flex-grow: 1;
				width: auto;
				max-width: 34rem;
			}
		}

		&__cta-container {
			@include flex(row nowrap, start, center);
			gap: 2.6rem;
		}
	}
</style>