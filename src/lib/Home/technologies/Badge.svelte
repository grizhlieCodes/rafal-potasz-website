<script>

    import {fade, fly, slide} from 'svelte/transition'
	export let name, text, info;

	let showInfo = false;

	const toggleInfo = (e) => {
		showInfo = !showInfo;
	};
</script>


<div class="badge {name}" on:click={toggleInfo} class:active={showInfo}>
	<!-- <div class="hoverable-overlay" /> -->

	<img src="/images/home/shared/tech-logos/{name}.png" alt="{name} svg icon" />
	<p>{text}</p>
</div>

<!-- 

    1. Add a container
    2. Style it
    3. Position fixed
    4. Function to move the container to wherever the mouse is
    5. Possibly add sveltewindow and record where the mouse movement is? No.
       Inefficient as every single badge would do this.

 -->
{#if showInfo}
	<div class="info-container" transition:slide={{duration: 250}}>
		{#each info as par}
			<p>{par}</p>
		{/each}
	</div>
{/if}

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
		font-size: fluid(desktop, 1.4, 1.63);
		gap: 0.8rem;
		position: relative;
        transition: 250ms ease, flex-grow 250ms, flex-basis 250ms;
        cursor: pointer;

        &:hover {
            background: v(clr-tech-badge-hover-bg);
            
        }
        
        &.active {
            background: v(clr-tech-badge-hover-bg);
            flex-grow: 1;
            // flex-basis: 100%;
        }

        * {
			pointer-events: none;
		}

		img {
			width: 1.5rem;
		}

		p {
			font-weight: 800;
		}

		// .hoverable-overlay {
		// 	position: absolute;
		// 	@include ab-center();
		// 	background: transparent;
		// }
	}
	.info-container {
        width: max-content;
        // max-width: 35rem;
		// position: fixed;
		// left: 50%;
        // transform: translate(-50%, 0);
		// top: 0;
		@include flex(column nowrap, start, start);
		background: v(clr-tech-info-bg);
        z-index: v(z-index-priority);
        padding: 3rem 4rem;
        color: v(clr-text-focused);
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
