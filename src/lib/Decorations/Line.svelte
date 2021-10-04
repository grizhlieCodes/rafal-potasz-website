<script>
	export let direction, dimension, top = '', left = '', bottom = '', right = '';
</script>

{#if direction === 'horizontal'}
	<span class="line horizontal" style="width: {dimension}; top: {top};bottom: {bottom};left: {left};right: {right};" />
{:else}
	<span class="line vertical" style="height: {dimension}; top: {top};bottom: {bottom};left: {left};right: {right};" />
{/if}

<style lang="scss">
	@import '../../scss-styles/mixins';

	span {
		display: block;
		position: absolute;
		background: v(clr-line-bg);
	}
	span.horizontal {
		height: 1px;
	}

    span.vertical {
        width: 1px;
    }
</style>
