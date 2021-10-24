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
            ],
            description: "If you're interested in hiring me as a front-end web developer, with an eye for design."
        },
        {
            choice: 'hire',
            text: [
                "Click here if you're interested in",
                "hiring",
                "me."
            ],
            description: "If you want to own a website that you and your clients/viewers will love."
        }
    ]



    const handleClick = (choice) => {
        // dispatch('choiceHandled', choice)
        store.updateChoice(choice)
    }
</script>

<div class="interest-choice">
    {#each data as {choice, text, description}}
         <button on:click={() => handleClick(choice)}>
            <div class="text-container">
                <p>{text[0]} <span>{text[1]}</span> {text[2]}</p>
                <p class="description">
                    {description}
                </p>
            </div>
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
        padding: 5rem 0;

        @include mq(desktop) {
            grid: 1fr / 1fr 1fr;
        }

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

            .text-container {
                @include flex(column nowrap, center, center);
                gap: 2rem;

                p.description {
                    font-size: fluid(desktop, 1.8, 2.2);
                    color: v(clr-text-faded);
                    line-height: fluid(desktop, 1.8, 2.2);
                    font-weight: 500; 
                }
            }

			&:hover {
                background: transparent;
                opacity: 1;

                p span {
                    color: v(clr-text-accent-cyan);
                }
			}

            p.description {
                // position:
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
