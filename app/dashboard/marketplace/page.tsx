import React from "react";
import Link from "next/link"

export default function App () {
    return (
        <section>
            <h1>Marketplace</h1>
            <section className="flex flex-gap-4">
            <Link href="/dashboard/marketplace/notes">
                Notes
            </Link>
            <Link href="/dashboard/marketplace/assignments">
                Assignments
            </Link>
            <Link href="/dashboard/marketplace/past-questions">
                Past Questions
            </Link>
            <Link href="/dashboard/marketplace/projects">
                Projects
            </Link>
            </section>
        </section>
    )
}