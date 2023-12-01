import CreateActivity from "@/components/CreateActivity";
import { Athlete } from "@/types";

export default function UploadActivityPage(props: { params: { id: string }}) {

    const id = props.params.id
    
    return (
        <main>
            <CreateActivity id={id}/>
        </main>
    )
}