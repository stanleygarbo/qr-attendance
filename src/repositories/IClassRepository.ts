import type { Class } from "@/models/Class";

export interface IClassRepository {
  add(
    data: Omit<Class, "id" | "userId" | "createdAt" | "students">
  ): Promise<Class>;
  getAll(): Promise<Class[]>;
  deleteById(id: string): Promise<string | undefined>;
  getById(id: string): Promise<Class | null>;
  addStudentRefToClass(classId: string, studentId: string): Promise<void>;
  update(id: string, data: Partial<Class>): Promise<Class | null>;
}
