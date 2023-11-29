export const getTranslation = (word: string) => {
    switch(word){
        case "male":
            return "Mann"
        case "female":
            return "Kvinne"
        default: 
            console.warn(`No translation for word "${word}"`)
            return word
    }
}