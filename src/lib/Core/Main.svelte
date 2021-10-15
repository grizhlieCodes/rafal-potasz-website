<script>
	export let marginBottom = 0, extraStyling = "", mainClass = "";
</script>

<main class="{mainClass}" style="margin-bottom: {marginBottom}rem; {extraStyling}">
	<slot />
</main>

<style lang="scss">
	@import '../../scss-styles/mixins';

	main {
		width: 100%;
		grid-area: main;
		display: grid;
		grid-template-columns: 2.4rem minmax(28rem, 1fr) 2.4rem;
		grid-template-areas: 'col1 col2 col3';
        row-gap: 12rem;
		position: relative;

		@include mq(tablet) {
			grid-template-columns: minmax(4rem, 1fr) 1fr minmax(70rem, 90rem) 1fr minmax(4rem, 1fr);
			grid-template-areas: 'col1 col2 col3 col4 col5';
		}

		@include mq(desktop) {
			grid-template-columns: 1fr minmax(4rem, 16rem) 90rem minmax(4rem, 16rem) 1fr;
		}
	}

	:global(main section.span-900) {
		grid-column: col2 / col2;
        
        @include mq(tablet){
            grid-column: col3 / col3;
        }
	}

	:global(main section.span-1220) {
		grid-column: col2 / col2;
        
        @include mq(tablet){
            grid-column: col2 / col4;
        }
	}

	:global(main section.span-1440) {
		grid-column: col2 / col2;
        
        @include mq(tablet){
            grid-column: col1 / col5;
        }
	}

	main.about::before{
		content: '';
		left: 50%;
		position: absolute;
		height: 100%;
		z-index: v(z-index-behind-bg);
		width: 1px;
		background: v(clr-line-bg);
	}

</style>
