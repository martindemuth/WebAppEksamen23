import CreateTrainingGoal from "@/components/CreateTrainingGoal";
import Navigation from "@/components/Navigation";

export default function CreateNewTrainingGoalPage(props: {
    params: { id: string }
}){
    const id = props.params.id
    return(
        <div>
            <Navigation />
            <CreateTrainingGoal id={ id }/>
        </div>
    )
}