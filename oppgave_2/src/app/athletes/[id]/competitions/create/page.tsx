import CreateCompetition from "@/components/CreateCompetition";
import Navigation from "@/components/Navigation";

export default function CreateNewCompetitionPage(props: {
    params: { id: string }
}){
    const id = props.params.id
    return(
        <div>
            <Navigation />
            <CreateCompetition id={ id }/>
        </div>
    )
}