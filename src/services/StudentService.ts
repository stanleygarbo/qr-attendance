import type { IClassRepository } from "@/repositories/IClassRepository";
import type { IStudentRepository } from "@/repositories/IStudentRepository";
import { StudentRepository } from "@/repositories/StudentRepository";
import { authStore } from "@/store/authStore";
import { serverTimestamp } from "firebase/firestore";

export default class StudentService {
  constructor(
    private readonly studentRepo: IStudentRepository,
    private readonly classRepo: IClassRepository
  ) {}

  async add({
    usn,
    name,
    classId,
  }: {
    usn: string;
    name: string;
    classId: string;
  }) {
    const data = {
      usn,
      name,
      userId: authStore.user?.uid,
      createdAt: serverTimestamp(),
    };
    const student = await this.studentRepo.add(data);
    await this.classRepo.addStudentRefToClass(classId, student.id);

    return student;
  }

  delete(id: string) {
    const repository = new StudentRepository();

    return repository.deleteById(id);
  }

  deleteFromClass(studentId: string, classId: string) {
    const repository = new StudentRepository();

    return repository.deleteFromClass(studentId, classId);
  }

  getAll() {
    const repository = new StudentRepository();

    return repository.getAll();
  }

  getById(studentId: string) {
    const repository = new StudentRepository();

    return repository.getById(studentId);
  }

  getByClass(classId: string) {
    const repository = new StudentRepository();

    return repository.getByClass(classId);
  }
}
