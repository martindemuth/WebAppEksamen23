import { Athlete } from "@/types";

export default function UploadActivityPage(props: { params: { id: string }}) {

    const id = props.params.id
    
    console.log(id)

    return (
        <p>{id}</p>
    )

}