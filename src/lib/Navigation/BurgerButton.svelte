<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	let buttonClicked = false;
	const toggleBtnClicked = () => {
		buttonClicked = !buttonClicked;
        dispatch('toggleMenu')
	};
</script>

<button class:active={buttonClicked} on:click={toggleBtnClicked}>
	<span />
	<span />
	<span />
</button>

<style lang="scss">
	@import '../../scss-styles/mixins';
	button {
		z-index: v(z-index-priority);
		@include flex(column nowrap, start, start);
		gap: 0.5rem;
		cursor: pointer;

		span {
			--cubic: cubic-bezier(0.9, 0.33, 0.83, 0.92);
			display: block;
			height: 0.2rem;
			background: v(clr-burger-btn-bg);
			border-radius: 1rem;
			transition: background 400ms v(cubic), width 400ms v(cubic), transform 400ms v(cubic),	opacity 400ms v(cubic);
			transform-origin: 0.1px 1px;

			&:nth-child(1) {
				width: 2rem;
			}
			&:nth-child(2) {
				width: 1.3rem;
			}
			&:nth-child(3) {
				width: 1.7rem;
			}
		}

		&:hover {
			span {
				background: v(clr-burger-btn-bg-active);
			}
		}

		&.active {
			span {
				background: v(clr-burger-btn-bg-active);
				&:nth-child(1) {
					transform: rotate(45deg);
				}
				&:nth-child(2) {
					transform: scale(0.1, 0.1);
					opacity: 0;
				}
				&:nth-child(3) {
					transform: rotate(-45deg);
					width: 2rem;
				}
			}
		}
	}
</style>
