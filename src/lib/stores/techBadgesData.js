import {readable} from 'svelte/store'

let badgesData = [
    {
        type: 'badge',
        name: 'html',
        text: 'HTML',
        info: [
            'I have spent a considerable amount of time with HTML.',
            "Whilst I forget some syntax aspects like what attributes would go into a radiobutton form's I will always know where to find the information.",
            'I spent time experiment with symantic HTML and I find the topic rather interesting.',
            'The most recent finding was schema.org'
        ]
    },
    { type: 'badge', name: 'css', text: 'CSS', info: ['Testing2'] },
    { type: 'badge', name: 'javascript', text: 'Javascript', info: ['Testing3'] },
    { type: 'badge', name: 'sass', text: 'SASS', info: ['Testing4'] },
    { type: 'badge', name: 'firebase', text: 'Firebase', info: ['Testing5'] },
    { type: 'badge', name: 'svelte', text: 'Svelte', info: ['Testing6'] },
    { type: 'badge', name: 'sveltekit', text: 'Sveltekit', info: ['Testing7'] },
    { type: 'badge', name: 'tailwind', text: 'Tailwind', info: ['Testing8'] },
    { type: 'badge', name: 'netlify', text: 'Netlify', info: ['Testing9'] },
    { type: 'badge', name: 'netlifyCms', text: 'NetlifyCMS', info: ['Testing10'] }
];

const badges = readable(badgesData)

export default badges