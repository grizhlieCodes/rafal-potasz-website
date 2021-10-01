// Fly single item from left or right

// gsap.registerPlugin(ScrollTrigger);
export const flyItem = (node, [direction, delay = 0, index = 0]) => {
    console.log(direction, delay, index)
    gsap.from(node, {
        scrollTrigger: {
            trigger: node,
            // start: "bottom -20rem",
            // scrub: 1,
            // markers: 1
        },
        x: direction,
        duration: 0.15,
        opacity: 0,
        delay: delay * index
    })
}

//Fly multiple items with a delay
export const flyMultipleItems = (node, direction, itemNode) => {
    let items = [...node.querySelectorAll("a")]
    // console.log(items)
    items.forEach((item, index) => {
        // console.log(item)
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                // scrub: 1,
                markers: 1,
                // start: "top 75%",
                // end: "bottom 75%"
            },
            x: direction,
            duration: 0.5,
            delay: 0.5 + (index * 0.5)
        })
    })
}