import Navigation from "@/components/Navigation";
import CreateActivity from "@/components/CreateActivity";

export default function CreateActivityPage(props: {
    params: { id: string }
}){
    const id = props.params.id
    return(
        <div>
            <Navigation />
            <CreateActivity id={id}/>
        </div>
    )
}