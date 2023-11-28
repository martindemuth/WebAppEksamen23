
import { getById } from "@/features/athletes/athlete.repository"
import { Athlete } from "@/types"

export default async function AthletePage (props: { params: { id: string }}) {
   
    const id = props.params.id

    const response = await getById(id)

    const result = await (response.json()) as {
        data: Athlete
    }

    return (
        <main>
            {JSON.stringify(result.data)}
        </main>
    )
}