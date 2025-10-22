import { useAppServices } from "@/context/AppContext";
import type { Student } from "@/models/Student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useStudentMutations = () => {
  const { studentService } = useAppServices();
  const queryClient = useQueryClient();
  const params = useParams();

  return {
    deletefromClass: useMutation({
      async mutationFn({
        studentId,
        classId,
      }: {
        studentId: string;
        classId: string;
      }) {
        await studentService.deleteFromClass(studentId, classId);

        return { classId, studentId };
      },
      onError(err) {
        console.log(err.message);
      },
      async onSuccess(data) {
        // delete student from classes array in cache
        await queryClient.setQueryData(
          ["student", data.classId],
          (prev: Student[]) => {
            if (prev) {
              return prev.filter((i) => i.usn !== data.studentId);
            }
          }
        );
      },
    }),
    add: useMutation({
      async mutationFn(data: Omit<Student, "id" | "createdAt" | "userId">) {
        if (!params.id) throw new Error("Invalid Class");
        console.log(data.name);

        const res = await studentService.add({
          usn: data.usn,
          name: data.name,
          classId: params.id,
        });

        return res;
      },
      async onSuccess(data) {
        await queryClient.setQueryData(
          ["student", params.id],
          (prev: Student[]) => {
            if (prev) {
              return [data, ...prev];
            }
          }
        );
      },
    }),
  };
};

export default useStudentMutations;
