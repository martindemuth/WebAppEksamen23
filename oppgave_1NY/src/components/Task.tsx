import { type ReactNode } from "react"

import { type Task } from "@/types"

export default function Task() {


  return (
    <section>
        <input type="text" placeholder="Skriv svar her" />
        <button>Sjekk svar</button>
    </section>
  )
}