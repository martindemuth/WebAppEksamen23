import { Performer } from "@/types";


export default function CreatePerformer () {
    
    const newPerformer: Performer = {
        id: "",
        gender: "Male",
        sport: "Løp"   
    }

    return (
        <p>Create performer</p>
    )
}