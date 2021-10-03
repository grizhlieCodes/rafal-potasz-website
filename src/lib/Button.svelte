<script>
	export let link, content, type, btnClass;

	console.log(content);
</script>

{#if type === 'anchor'}
	<a href={link} class={btnClass}>{content}</a>
{:else}
	<button type="button" on:click class={btnClass}>{content}</button>
{/if}

<style lang="scss">
	@import '../scss-styles/mixins';
	a, button {
		font-size: fluid(desktop, 1.6, 1.9);
		font-weight: 700;
		text-transform: uppercase;
		padding: 1rem 2rem;
		transition: opacity 250ms, transform 250ms;
		outline: none;
		border: none;
		&.primary {
			background: v(clr-accent-cyan);
		}
		&.secondary {
			background: v(clr-accent-red);
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