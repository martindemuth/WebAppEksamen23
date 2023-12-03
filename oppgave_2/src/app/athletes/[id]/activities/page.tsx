import CreateActivity from "@/components/CreateActivity";
import Navigation from "@/components/Navigation";
import { Athlete } from "@/types";

export default function UploadActivityPage(props: { params: { id: string }}) {

    const id = props.params.id
    
    return (
        <main>
            <Navigation />
            <CreateActivity id={id}/>
        </main>
    )
}