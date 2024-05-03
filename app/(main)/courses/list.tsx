"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { courses, userProgress } from "@/db/schema"

import { Card } from "./card"
import { upsertUserProgress } from "@/actions/user-progress"
import { toast } from "sonner"

type Props = {
  courses: (typeof courses.$inferSelect)[]
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId
}

export function List({ activeCourseId, courses }: Props) {
  const router = useRouter()
  const [peding, startTransition] = useTransition()

  function onClick(id: number) {
    if (peding) return null

    if (id === activeCourseId) {
      return router.push("/learn")
    }

    startTransition(() => {
      upsertUserProgress(id).catch(() => toast.error("Something went wrong."))
    })
  }

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={peding}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  )
}
