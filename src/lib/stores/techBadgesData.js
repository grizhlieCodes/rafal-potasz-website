import { readable } from 'svelte/store'

let badgesData = [
    {
        type: 'badge',
        name: 'html',
        text: 'HTML',
        info: [
            'I have spent a considerable amount of time with HTML.',
            "Whilst I forget some syntax aspects like what attributes would go into a radio button form's I will always know where to find the information.",
            'I experimented with symantic HTML and I find the topic rather interesting.',
            'The most recent finding was schema.org which is an interesting and possibly upcoming method of adding symantic meaning to HTML.'
        ]
    },
    {
        type: 'badge', name: 'css', text: 'CSS', info: [
            "I love CSS. Whether it's Flexbox, Grid or SASS, it's all amazing.",
            "I think the fact that something so simple can get so complicated is the interesting aspect of CSS.",
            "I really enjoyed coming up with my own SASS architecture.",
            "I have a very good understanding and can usually debug CSS effectively. This is mostly because I invested money into courses that improved my understading of it.",
            "If you ask me about the order of preference between Bootstrap, Tailwind and SASS I will anwser you with:",
            "✅ SASS > ✅ Tailwind > ❌ Bootstrap",
            "The reason I dislike bootstrap is because whilst solving some problems it doesn't help developers understand CSS better.", 
            "This is my own opinion of course as I am interested in mastering CSS, overall I think any tool that gets the job done is great."
        ]
    },
    {
        type: 'badge', name: 'javascript', text: 'Javascript', info: [
            "I focused learning Javascript for a single purpose: Web(site) Development.",
            "I spent time with ES6+ Javascript and I absolutely love it for web dev.",
            "The primary focus for me in Javascript was learning how to think more and more programatically.",
            "I did notice that whilst I can solve various 'complex' problems I don't usually recall how I solved them. Not sure whether this is an area of growth for me or just how my brain works.",
            "I love improving the way I write code, making it more maintainable, scalable and simple. I still cringe when looking at my javascript from 1 year ago.",
            "I'd love to get great at Javascript, to a point where anyone can read my code easily. I think if your code solves the problem at hand AND other developers can read it, you're a great coder."
        ]
    },
    {
        type: 'badge', name: 'sass', text: 'SASS', info: [
            "SASS is probably my favourite way of using CSS. The structure, the mixins, the nesting, file-imports. It's ideal for a semi-control-freak like me.",
            "I spent time looking at SASS architecture and found the process fascinating. It opened my eyes to the true difficulties of CSS: scalability and order.",
            "My most recent 'adventure' was creating a personal mixin called 'Fluid'. It creates the most accurate clamp() function that scales perfectly between mobile and any viewport of your choice."
        ]
    },
    {
        type: 'badge', name: 'firebase', text: 'Firebase', info: [
            "I used Firebase to create muliple applications, one of which had data as well as user authentication.",
            "Firebase opened my eyes to the importance of data-structure and whilst I am far from being an expert, I am most defenitely a student of it now.",
        ]
    },
    {
        type: 'badge', name: 'svelte', text: 'Svelte', info: [
            "Svelte is my first Front End Framework. I chose it simply based on reviews, ease of use and its' philosophy of simplicity.",
            "Svelte has helped me write less code and I've grown quite fond of it over the last 1 year.",
            "The best showcase of Svelte in my work is the Invoice App, it's a single-page-application, built with Svelte and connected to firebase for data storage and authentication."
        ]
    },
    {
        type: 'badge', name: 'sveltekit', text: 'Sveltekit', info: [
            "At the time of writing Sveltekit is still in an open beta but it's working quite seamlessly for me.",
            "The most recent application I built with Sveltekit is the Audiophile E-Commerce website. It uses dynamic routing where each page's content is loaded with server-side-rendering.",
            "The second example of my use of Sveltekit is this very website. I wanted to build my webstore with components and wanted to have a good stack for building a blog within my website once I get time for it.",
            "Whilst I am not an expert and don't quite understand all the technical sides of Svelte/kit, I do think it has greatly improved my understanding of Javascript, components and perpetually improving readability of code."
        ]
    },
    {
        type: 'badge', name: 'tailwind', text: 'Tailwind', info: [
            "Tailwind seemed amazing to me at first and I still think it's an amazing tool for any front-end developer.",
            "Because I love CSS it sped up my workflow dramatically in the 1 project I built with it: the Audiophile E-Commerce webstore.",
            "The project was successful and easy to build ultimately, especially where CSS is concerned. But going back to the project made me realise that Tailwind wasn't for me as it ended up looking like a glorious-mess. SCSS appears to be my favourite tool as it allows for optimal control and future readability of code."
        ]
    },
    {
        type: 'badge', name: 'netlify', text: 'Netlify', info: [
            "I don't have a tremendous amount of experience with Netlify outside of using it to host my vanilla and Svelte projects.",
            "At this point I've run into many (self-created) bugs with Netlify and have debugged them 1 by 1 so in that sense I do have some fundemental understanding of how to suceed with Netlify.",
            "I have not used it for any MASSIVE project as of yet."
        ]
    },
    {
        type: 'badge', name: 'netlifyCms', text: 'NetlifyCMS', info: [
            "Netlify CMS is a nice option for creating a free blog for yourself. It connects to github and you essentially use NetlifyCMS to write blog-posts and upload them to your github as .md files.",
            "I have created dummy blogs with this by using Netlify, NetlifyCMS, Sveltekit and of course Github, so my experience again is at a begginer level but a functional one!"
        ]
    }
];

const badges = readable(badgesData)

export default badges