import CreateTrainingGoal from "@/components/CreateTrainingGoal";
import Navigation from "@/components/Navigation";
import CreateQuestion from "@/components/createQuestions";

export default function CreateNewTrainingGoalPage(props: {
    params: { id: string }
}){
    const id = props.params.id
    return(
        <div>
            <Navigation />
            <CreateQuestion id={ id }/>
        </div>
    )
}