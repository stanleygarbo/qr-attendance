import { useAppServices } from "@/context/AppContext";
import type { Class } from "@/models/Class";
import type { Student } from "@/models/Student";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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

        const classData = queryClient.getQueryData(["class", params.id]) as
          | Class
          | undefined;

        if (classData) {
          for (const i of classData.students) {
            if (i.id === data.usn) {
              throw new Error(`${data.name} already exists in this class`);
            }
          }
        }

        const res = await studentService.add({
          usn: data.usn,
          name: data.name,
          classId: params.id,
        });

        return res;
      },
      onError(err) {
        toast(err.message);
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
