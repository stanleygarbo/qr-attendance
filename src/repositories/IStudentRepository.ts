import type { Student } from "@/models/Student";

export interface IStudentRepository {
  add(data: Omit<Student, "id" | "userId" | "createdAt">): Promise<Student>;
  getAll(): Promise<Student[]>;
  deleteById(id: string): Promise<string | undefined>;
  getById(id: string): Promise<Student | null>;
}
