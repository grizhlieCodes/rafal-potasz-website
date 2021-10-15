<script>
    export let sectionClass, marginBottom = 0, marginTop = 0, id = '', extraStyling = ""
	$: marginBot = marginBottom === 0 ? 0 : `${marginBottom}rem`
	$: marginTopp = marginTop === 0 ? 0 : `${marginTop}rem`

</script>

<section class="{sectionClass}" style="margin-bottom: {marginBot}; margin-top: {marginTopp}; {extraStyling}" {id}>

    <slot />

</section>

<style lang="scss">
    @import '../../scss-styles/mixins';



    section {
		--padding: 2.4rem;
		width: 100%;
		height: auto;
		display: grid;
		justify-items: center;
		align-items: start;
		padding: v(padding) 0;
		grid-row: span 1;
		// overflow: hidden;

		@include mq(tablet){
			--padding: 4rem;
		}

		&.top-borders:nth-child(even){
			border-top: 1px v(clr-line-bg) solid;
			border-bottom: 1px v(clr-line-bg) solid;
		}
	}

	// section.section--900 {
	// 	grid-template-columns: 1fr minmax(27rem, 90rem) 1fr;
	// }

	// :global(section.section--900 > *) {
	// 	grid-column: 2/3;
	// }

	section:nth-of-type(1){
		padding-top: 5rem;
	}
    
</style>