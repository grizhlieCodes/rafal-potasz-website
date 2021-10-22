<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import store from '$lib/stores/hiringChoice.js'
    let data = [
        {
            choice: 'employ',
            text: [
                "Click here if you're interested in",
                "employing",
                "me."
            ]
        },
        {
            choice: 'hire',
            text: [
                "Click here if you're interested in",
                "hiring",
                "me."
            ]
        }
    ]



    const handleClick = (choice) => {
        // dispatch('choiceHandled', choice)
        store.updateChoice(choice)
    }
</script>

<div class="interest-choice">
    {#each data as {choice, text}}
         <button on:click={() => handleClick(choice)}>
             <p>{text[0]} <span>{text[1]}</span> {text[2]}</p>
         </button>
    {/each}
</div>

<style lang="scss">
	@import '../../scss-styles/mixins';
	.interest-choice {
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		display: grid;
		grid: 1fr 1fr / 1fr;
		place-items: center;
        background: transparent;

		button {
			width: 100%;
			height: 100%;
			@include center();
			background: none;
			outline: none;
			cursor: pointer;
			color: v(clr-text-focused);
            opacity: 0.5;
            transition: background 250ms, opacity 250ms, color 250ms;

			&:hover {
                background: transparent;
                opacity: 1;

                p span {
                    color: v(clr-text-accent-cyan);
                }
			}
		}

		p {
			max-width: 60%;
			font-family: v(roboto);
			font-weight: 900;
			font-size: fluid(desktop, 2.2, 4);
			line-height: fluid(desktop, 2.8, 5.6);

            span {
                opacity: 1;
                text-decoration: underline;
            }
		}
	}
</style>
