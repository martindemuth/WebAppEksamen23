import { useMemo } from "react"
import { useTable } from "react-table"

export default function ActicityTable() {
    // Dummy data for activities

    const activities = [
        {
            "activity": "Løp",
            "date": "2023-11-06T19:29:24.888Z",
            "title": "alias conicio ustulo",
            "tags": [
                "hard",
                "gravel"
            ],
            "questions": [
                {
                    "id": "d9f8695d-c852-437d-b109-d24ae4527fe8",
                    "question": "Hvordan var kvaliteten og varigheten på søvnen før dagens økt?",
                    "type": "radio:range"
                },
                {
                    "id": "6b041874-6549-4c21-be1f-9448f1a09082",
                    "question": "Hvordan var stressnivået før dagens økt?",
                    "type": "text"
                }
            ],
            "intervals": [
                {
                    "id": "c018606f-6102-4341-b0c7-06822704b59b",
                    "duration": 15,
                    "intensity": 1
                },
                {
                    "id": "b7983589-a883-4804-a0d1-1738698a8535",
                    "duration": 7,
                    "intensity": 3
                },
                {
                    "id": "b3afe686-34a8-47db-ba9c-9b164417aaed",
                    "duration": 7,
                    "intensity": 5
                },
            ]
        }
    ]
    
    // Set up data and columns for table
    const data = useMemo(() => activities, [activities])    
    const columns = useMemo(() => [
        {
            Header: 'Utøver',
            accessor: 'userId',
        },
        {
            Header: 'Kjønn',
            accessor: 'gender'
        },
        {
            Header: 'Sport',
            accessor: 'sport'
        }
    ], [])
    
}