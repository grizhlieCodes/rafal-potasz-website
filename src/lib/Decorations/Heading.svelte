<script>
	export let type = '2',
		content = '',
		content2 = '',
		content3 = '',
		headingClass = '',
		direction = 'left',
		extraStyling;
</script>

{#if type === '1'}
	<h1 class={headingClass} data-direction={direction}>
		{content}
		{#if content2 !== ''}
			<br />
			{content2}
		{/if}
	</h1>
{:else if type === '2'}
	<h2 class={headingClass} data-direction={direction}>{content}</h2>
{:else if type === '3'}
	<h3 class={headingClass} data-direction={direction} style="{extraStyling}">{content}</h3>
{:else if type === '4'}
	<h4 class={headingClass} data-direction={direction} style="{extraStyling}">{content}</h4>
{:else if type === '1-hire'}
	<h1 class={headingClass}>
		{content} <br/>
		<span>{content2}</span> <br/>
		{content3}
	</h1>
{/if}

<style lang="scss">
	@import '../../scss-styles/mixins';

	:is(h1, h2, h3, h4) {
		font-family: v(fira);
		font-weight: 700;
		color: v(clr-text-heading);
		transition: color 400ms;
	}

	h1 {
		font-size: fluid(desktop, 3.5, 5.5);
		line-height: fluid(desktop, 3.5, 5.5);

		&.hire-header span  {
			color: v(clr-text-accent-red);
		}
	}

    h2 {
        font-size: fluid(desktop, 2.5, 4);
        line-height: fluid(desktop, 2.5, 4);
        text-transform: uppercase;
    }

	h3 {
		font-size: fluid(desktop, 2, 2.5);
		line-height: fluid(desktop, 2, 2.5);
		text-transform: uppercase;
	}
	h4 {
		font-size: fluid(desktop, 1.7, 2);
		font-weight: 500;
	}
</style>
