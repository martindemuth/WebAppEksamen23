export const getTranslation = (word: string) => {
    switch(word){
        // gender
        case "male":
            return "Mann"
        case "female":
            return "Kvinne"
        // sport
        case "running":
            return "Løp"
        case "cycling":
            return "Sykling"
        case "skiing":
            return "Ski"
        case "triathlon":
            return "Triatlon"
        case "swimming":
            return "Svømming"
        case "strength":
            return "Styrke"
        case "other":
            return "Annet"
        default: 
            console.warn(`No translation for word "${word}"`)
            return word
    }
}