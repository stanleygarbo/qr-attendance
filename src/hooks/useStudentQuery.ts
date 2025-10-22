import { useAppServices } from "@/context/AppContext";
import type { Student } from "@/models/Student";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useStudentQuery(classId?: string): UseQueryResult<Student[]>;

export function useStudentQuery(classId?: string) {
  const { studentService } = useAppServices();

  return useQuery({
    queryKey: ["student", classId],
    queryFn: async () => {
      if (classId) {
        return await studentService.getByClass(classId);
      } else {
        return await studentService.getAll();
      }
    },
    enabled: !!classId,
  });
}
