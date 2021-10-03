<script>
	import Button from '$lib/Button.svelte';

	let buttons = [
		{
			content: 'my work 👆',
			btnClass: 'primary',
			type: 'anchor',
			link: '/'
		},
		{
			content: 'say hello 📧',
			btnClass: 'secondary',
			type: 'anchor',
			link: '/portfolio'
		}
	];
</script>

<div class="hero-text-container">
	<h1>
		No-nonsense
		<br />
		web developer
	</h1>
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
			font-size: fluid('desktop', 3.5, 5);
			font-weight: 700;
			color: v(clr-highlight-1);
			line-height: fluid('desktop', 3.5, 5);
		}

		p {
			max-width: 34rem;
			margin-bottom: 2rem;
			font-size: 1.8rem;
			color: v(clr-highlight-2);
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