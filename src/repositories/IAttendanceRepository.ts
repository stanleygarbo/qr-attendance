import type { Attendance } from "@/models/Attendance";

export interface IAttendanceRepository {
  add(data: Omit<Attendance, "id" | "createdAt">): Promise<Attendance>;
  getAll(): Promise<Attendance[]>;
  deleteById(id: string): Promise<string | undefined>;
  getById(id: string): Promise<Attendance | null>;
  update(id: string, data: Partial<Attendance>): Promise<Attendance | null>;
  getByClass(classId: string): Promise<Attendance[] | null>;
}
