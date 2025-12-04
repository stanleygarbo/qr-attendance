import { db } from "@/config/firebase";
import type { Attendance } from "@/models/Attendance";
import type { IAttendanceRepository } from "@/repositories/IAttendanceRepository";
import { doc } from "firebase/firestore";

export default class AttendanceService {
  constructor(private readonly attendanceRepo: IAttendanceRepository) {}
  async add({
    classId,
    studentId,
    userId,
    status,
  }: {
    classId: string;
    studentId: string;
    userId: string;
    status: "present" | "absent" | "late";
  }) {
    const classRef = doc(db, "class", classId);
    const studentRef = doc(db, "student", studentId);

    return this.attendanceRepo.add({ classRef, studentRef, userId, status });
  }

  delete(id: string) {
    return this.attendanceRepo.deleteById(id);
  }
  async duplicate(id: string) {
    const data = await this.attendanceRepo.getById(id);
    if (!data) throw new Error("Student not found");

    const { id: _, ...rest } = data;

    return this.attendanceRepo.add(rest);
  }

  getAll() {
    return this.attendanceRepo.getAll();
  }

  getById(id: string) {
    return this.attendanceRepo.getById(id);
  }

  update(id: string, data: Partial<Attendance>) {
    return this.attendanceRepo.update(id, data);
  }

  getByClass(classId: string) {
    return this.attendanceRepo.getByClass(classId);
  }
}
