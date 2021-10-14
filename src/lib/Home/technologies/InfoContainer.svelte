<script>
	export let info;
    import {slide} from 'svelte/transition'
</script>

<div class="info-container" transition:slide={{duration: 250}}>
	{#each info as par}
		<p>{par}</p>
	{/each}
</div>

<style lang="scss">
	@import '../../../scss-styles/mixins';

	.info-container {
		width: auto;
		@include flex(column nowrap, start, start);
		background: v(clr-tech-info-bg);
		z-index: v(z-index-priority);
		padding: 3rem 4rem;
		color: v(clr-text-tech-badge);
		font-family: v(fira);
		font-size: fluid(desktop, 1.4, 1.65);
		flex: 1 0 100%;
		gap: 1rem;

		p {
			text-align: left;
			width: 100%;
		}
	}
</style>
