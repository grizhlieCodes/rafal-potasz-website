<script>
	import Icon from '$lib/Decorations/Icon.svelte';
	import dmstore from '$lib/stores/darkmode.js';
	import { onMount } from 'svelte';
	let mounted = false;
	let checked = false;
	$: if ($dmstore) {
		checked = $dmstore;
	}

	onMount(() => {
		dmstore.checkDarkmode();
	});

	const updateDarkmodeState = () => {
		dmstore.setDarkmode();
	};
</script>

<label for="darkmode-toggle" class:checked>
	<input type="checkbox" id="darkmode-toggle" bind:checked on:click={updateDarkmodeState} />
	<div class="icon-container sun-container" class:active={!checked}>
		<Icon name="sun" width="1.4rem" />
	</div>
	<div class="icon-container moon-container" class:active={checked}>
		<Icon name="moon" width="1.4rem" />
	</div>
</label>

<style lang="scss">
	@import '../../scss-styles/mixins';

	label {
		width: 4.25rem;
		height: 2rem;
		background: v(clr-toggle-bg);
		border-radius: 20rem;
		position: relative;
		cursor: pointer;
		transition: background 400ms;

		&::after,
		.icon-container {
			height: 1.4rem;
			width: 1.4rem;
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
		}

		:global(.icon-container svg) {
			fill: transparent;
		}

		:global(.icon-container.active svg) {
			fill: v(clr-toggle-accent);
		}
		.sun-container {
			left: calc(3.825rem - 1.4rem);
		}
		.moon-container {
			left: 0.425rem;
		}

		input {
			display: none;
		}

		&::after {
			content: '';
			position: absolute;
			left: 0.425rem;
			background: v(clr-toggle-dial);
			transition: background 400ms;
			border-radius: 50%;
			transition: left 400ms;
		}

		&.checked::after {
			left: calc(3.825rem - 1.4rem);
		}
	}
</style>
