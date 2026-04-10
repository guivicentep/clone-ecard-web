import { useState } from "react"
import type { StudentData } from "../types"

const STORAGE_KEY = 'ecard-student-data'


function loadFromStorage(defaultPhoto: string): StudentData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved) as StudentData
  } catch {}

  return {
    name: 'Zezinho da Silva',
    studentId: '16617762',
    course: 'Instituto de Matemática e Estatística',
    photoUrl: defaultPhoto
  }
}

export function useStudentData(defaultPhoto: string) {
  const [data, setData] = useState<StudentData>(loadFromStorage(defaultPhoto))

  function save(newData: StudentData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    setData(newData)
  }

  return {data, save}
}