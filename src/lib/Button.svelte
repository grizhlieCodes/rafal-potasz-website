<script>
	export let link, content, type, btnClass;
</script>

{#if type === 'anchor'}
	<a href={link} class={btnClass}>{content}</a>
{:else if type === 'button'}
	<button type="button" on:click class={btnClass}>{content}</button>
{:else if type === 'submit'}
	<button type="submit" on:click class={btnClass}>{content}</button>
{/if}

<style lang="scss">
	@import '../scss-styles/mixins';
	a,
	button {
		font-size: fluid(desktop, 1.6, 1.9);
		font-weight: 700;
		text-transform: uppercase;
		@include px(fluid(tablet, 0.5, 2));
		@include py(fluid(tablet, 0.75, 1));
		outline: none;
		border: none;
		color: v(clr-text-btn);
		transition: color 400ms, background 400ms, opacity 400ms, transform 400ms;
		font-family: v(fira);
		text-align: center;
		cursor: pointer;

		&.primary {
			background: v(clr-bg-accent-cyan);
		}

		&.secondary {
			background: v(clr-bg-accent-red);
		}

		&:hover {
			opacity: 0.8;
			transform: scale(1.1);
		}

		&:active {
			transform: scale(0.9);
		}
	}
</style>
