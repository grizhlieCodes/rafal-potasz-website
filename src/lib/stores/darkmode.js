import { writable, get } from 'svelte/store';

const darkmode = writable()

const customDarkmode = {
    subscribe: darkmode.subscribe,
    setDarkmode: () => {
        darkmode.update(currentDm => {
            let dm = currentDm
            dm = !dm
            localStorage.setItem('darkmode', JSON.stringify(dm))
            return dm
        })
        customDarkmode.updateBody()
    },
    checkDarkmode: () => {
        let local = JSON.parse(localStorage.getItem('darkmode'))
        if (local === null) {
            darkmode.set(true)
        } else {
            darkmode.set(local)
        }
        customDarkmode.updateBody()
    },
    updateBody: () => {
        let currentDm = get(darkmode)
        let body = document.body
        if(currentDm){
            body.classList.add('dark')
            body.classList.remove('light')
        } else {
            body.classList.remove('dark')
            body.classList.add('light')
        }
    } 
}

export default customDarkmode