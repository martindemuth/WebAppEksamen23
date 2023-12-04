"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"


export default function Navigation() {
    const pathname = usePathname()

    const routes = [
        {
            label: "Hjem",
            href: "/"
        },
        {
            label: "Utøver",
            href: "/athletes"
        },
        {
            label: "Mål",
            href: "/training-goals"
        },
        {
            label: "Konkurranse",
            href: "/competitions"
        },
        {
            label: "Opprett ny spørsmål",
            href: "/questions/create"
        }
   ]

    const checkActivePath = (path: string) => {
        return path === pathname
      }

      return(
        <nav className="bg-blue-500 py-2 px-28 text-white text-xl flex justify-items-start gap-8 items-center">
            {routes.map((route)=>(
                <Link
                key={route.href} 
                href={route.href} 
                className={`${checkActivePath(route.href) ? "underline font-bold" : ""} hover:text-yellow-300`}>
                    {route.label}
                </Link>
            ))}   
        </nav>
    )
}