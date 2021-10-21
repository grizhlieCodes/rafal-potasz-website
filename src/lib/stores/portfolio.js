import {readable} from 'svelte/store'

let portfolioData = [
    {
        name: "audiophile",
        subtitle: "Webstore Development + Minor Redesign",
        type: ["featured", "dev"],
        dateStamp: new Date('2021', '06', '7'),
        description: ["Sleek and powerful webstore experience built with Sveltekit, Tailwind and local storage, fully responsive with a functioning cart and checkout experience.", "This was my first proper project that involved using Tailwind for styling. I enjoyed the speed that Tailwind enables but ultimately regreted it as I prefer reading styling via CSS/SCSS for maximum comprehension."],
        github: 'https://github.com/grizhlieCodes/audioPhileEcommerceSvelteKitTailwind',
        website: 'https://audiophile-webstore-grizhlie.netlify.app/',
        vimeoEmbed: '617031842?h=94a860f3fb',
        tags: ['Frontend', 'HTML', 'SCSS', 'JS', 'Tailwind', 'Sveltekit', 'Frontend Mentor']
    },
    {
        name: "invoice-app",
        subtitle: "Website Development + Minor Redesign",
        type: ["featured", "dev"],
        dateStamp: new Date('2021', '05', '5'),
        description: ["Full stack invoice application with user authentication, connected to Firebase's realtime database. A responsive experience with a dark-mode toggle, built with Svelte.", "This still remains as one of my largest and most complex projects to date. I ended up coding up a custom datepicker for this as the default one broke user-experience. By far my favorite project to date in terms of data/state management and complexity."],
        github: 'https://github.com/grizhlieCodes/invoiceAppSvelte',
        website: 'https://grizhlie-invoice-app-frontend-mentor.netlify.app/',
        vimeoEmbed: '617112109?h=18b93cbebf',
        tags: ['Fullstack', 'HTML', 'SCSS', 'JS', 'Firebase', 'Svelte', 'Frontend Mentor']
    },
    {
        name: "job-listing",
        subtitle: "Website Development + Big Redesign (UX)",
        type: ["featured", "dev"],
        dateStamp: new Date('2021', '07', '9'),
        description: ["This is a simple job-listings page that can be filtered. The original filter system was just clicking on the various filters. I added an entire new interface and allowed for keyboard accessibility.", "Probably one of my favorite small projects so far as I think I significantly improved upon the original UI/UX design."],
        github: 'https://github.com/grizhlieCodes/filtered-job-listings',
        website: 'https://grizhlie-filtered-job-listing.netlify.app/',
        vimeoEmbed: '617112071?h=1ed9c1ef9b',
        tags: ['Frontend', 'HTML', 'SCSS', 'JS', 'Svelte', 'Frontend Mentor']
    },
    {
        name: "galleria",
        subtitle: "Website Development",
        type: [ "dev"],
        dateStamp: new Date('2021', '06', '28'),
        description: ["As soon as I saw the design I wanted to code it up. This is a sleak and minimal gallery web-app.", "Figuring out how to structure everything with CSS grid was the most fun and challenging aspect of this project now that I look back on it. I defenitely want to improve in my understanding of CSS grid in order to write up a custom JS code for a mosaic layout grid."],
        github: 'https://github.com/grizhlieCodes/galleria-slideshow-site',
        website: 'https://grizhlie-galleria-slideshow-site.netlify.app/',
        vimeoEmbed: '617133954?h=ce6853e356',
        tags: ['Frontend', 'HTML', 'SCSS', 'JS', 'Svelte', 'Frontend Mentor']
    },
    {
        name: "designo",
        subtitle: "Website Development",
        type: ["dev"],
        dateStamp: new Date('2021', '01', '23'),
        description: ["Beautiful design turned into code. A 7 page project of which the prime focus was on sass architecture and thinking via components and reusable, clean, code.", "This project included working with leaflet js and most of the time was spent styling as well as creating components. This was the first time I attempted thinking via components and the results were favourable; I quickly picked up Svelte afterwards to expand on them."],
        github: 'https://github.com/grizhlieCodes/designo',
        website: 'https://designo-website-grizhliecodes.netlify.app/',
        vimeoEmbed: '617133776?h=126e4105f1',
        tags: ['Frontend', 'HTML', 'SCSS', 'JS', 'Frontend Mentor']
    },
    {
        name: "antara",
        subtitle: "Brand Design + Website Design & Development",
        type: ["dev", "design"],
        dateStamp: new Date('2020', '10', '6'),
        description: ["A real project for the family business. I had to rebrand the company and opted for a sleek professional design. My code will be using an older mindset of pixel-perfection but overall the website looks good. This project is actually the reason I wanted to learn web development, read about it in the about me page!", "Fun fact: The name 'Antara' was derived from the first 2 letters of each of the team member's name: ANna, TAriq and RAfal, little bit of witty creative on my part 😁."],
        github: '',
        website: 'https://www.antaraltd.co.uk/',
        vimeoEmbed: '617133607?h=437358b760',
        tags: ['Frontend', 'HTML', 'SCSS', 'JS', 'Frontend Mentor']
    }
];

const portfolio = readable(portfolioData)

export default `portfolio`