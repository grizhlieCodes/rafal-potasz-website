<script>
	export let type = h2,
		content = '',
		content2 = '',
		headingClass = '';
</script>

{#if type === '1'}
	<h1 class={headingClass}>
		{content}
		{#if content2 !== ''}
			<br />
			{content2}
		{/if}
	</h1>
{:else if type === '2'}
	<h2 class={headingClass}>{content}</h2>
{/if}

<style lang="scss">
	@import '../../scss-styles/mixins';

	:is(h1, h2) {
		font-family: v(fira);
		font-weight: 700;
		color: v(clr-text-heading);
		transition: color 400ms;
	}

	h1 {
		font-size: fluid(desktop, 3.5, 5.5);
		line-height: fluid(desktop, 3.5, 5.5);
	}

    h2 {
        font-size: fluid(desktop, 2.5, 4);
        line-height: fluid(desktop, 2.5, 4);
        text-transform: uppercase;
    }
</style>
