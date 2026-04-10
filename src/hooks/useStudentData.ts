import { useState } from "react"
import type { StudentData } from "../types"

const STORAGE_KEY = 'ecard-student-data'

const defaultData: StudentData = {
  name: 'Zezinho da Silva',
  studentId: '16617762',
  course: 'Instituto de Matemática Estatística',
  photoUrl: '/mclovin.jpg'
}

function loadFromStorage(): StudentData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved) as StudentData
  } catch {}

  return defaultData
}

export function useStudentData() {
  const [data, setData] = useState<StudentData>(loadFromStorage)

  function save(newData: StudentData) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
    setData(newData)
  }

  return {data, save}
}