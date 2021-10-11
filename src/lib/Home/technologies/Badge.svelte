<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    import {fade, fly, slide} from 'svelte/transition'
	export let name, text, index,lastClickedIndex;
    $: lastClickedIndexReactive = lastClickedIndex


</script>


<div class="badge {name}" on:click={() => dispatch('clickedBadge', index)} class:active={index === lastClickedIndexReactive}>
	<!-- <div class="hoverable-overlay" /> -->

	<img src="/images/home/shared/tech-logos/{name}.png" alt="{name} svg icon" />
	<p>{text}</p>
</div>

<style lang="scss">

	@import '../../../scss-styles/mixins';

	.badge {
		width: auto;
		height: auto;
		@include px(fluid(desktop, 1, 2.1));
		@include py(fluid(desktop, 0.95, 1.13));
		background: v(clr-tech-badge-bg);
		color: v(clr-text-focused);
		font-family: v(fira);
		@include flex(row nowrap, center, center);
		font-size: fluid(desktop, 1.5, 1.63);
		gap: 0.8rem;
		position: relative;
        transition: background 250ms, flex-grow 250ms;
        cursor: pointer;

        &:hover {
            background: v(clr-tech-badge-hover-bg);
        }
        
        &.active {
            background: v(clr-tech-badge-hover-bg);
            flex-grow: 1;
        }

        * {
			pointer-events: none;
		}

		img {
			width: 1.5rem;
		}

		p {
			font-weight: 700;
		}

		// .hoverable-overlay {
		// 	position: absolute;
		// 	@include ab-center();
		// 	background: transparent;
		// }
	}

</style>
