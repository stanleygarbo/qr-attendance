import type { IClassRepository } from "@/repositories/IClassRepository";

export default class ClassService {
  constructor(private readonly classRepo: IClassRepository) {}
  async add({ name, section }: { name: string; section: string }) {
    return this.classRepo.add({ name, section });
  }

  delete(id: string) {
    return this.classRepo.deleteById(id);
  }
  async duplicate(id: string) {
    const data = await this.classRepo.getById(id);
    if (!data) throw new Error("Student not found");

    return this.classRepo.add(data);
  }

  getAll() {
    return this.classRepo.getAll();
  }

  getById(id: string) {
    return this.classRepo.getById(id);
  }

  update(id: string, data: { name?: string; section?: string }) {
    return this.classRepo.update(id, data);
  }
}
