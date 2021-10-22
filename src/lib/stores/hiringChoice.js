import {writable} from 'svelte/store';

const choice = writable('')

const customChoice = {
    subscribe: choice.subscribe,
    updateChoice: (selectedChoice) => {
        console.log('Running: updateChoice')
        choice.set(selectedChoice)
        customChoice.updateSessionStorage(selectedChoice)
    },
    updateSessionStorage: (selectedChoice) => {
        console.log('Running: updateSessionStorage')
        sessionStorage.setItem('selectedChoice', selectedChoice)
    },
    checkSessionStorage: () => {
        console.log('Running: checkSessionStorage')
        let session = sessionStorage.getItem('selectedChoice')
        if(session === null){
            return
        } else {
            choice.set(session)
        }
    }
}

export default customChoice