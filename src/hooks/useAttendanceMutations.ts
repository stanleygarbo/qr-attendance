import { useAppServices } from "@/context/AppContext";
import type { Attendance } from "@/models/Attendance";
import type { Class } from "@/models/Class";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAttendanceMutations = () => {
  const { attendanceService } = useAppServices();
  const queryClient = useQueryClient();

  return {
    add: useMutation({
      mutationKey: ["attendance", "add"],
      async mutationFn({
        classId,
        studentId,
        userId,
        status,
      }: {
        classId: string;
        studentId: string;
        userId: string;
        status: "absent" | "present" | "late";
      }) {
        const res = await attendanceService.add({
          classId,
          studentId,
          userId,
          status,
        });

        return res;
      },
      onError(err) {
        console.log(err);
      },
      onSuccess(data) {
        queryClient.setQueryData(
          ["attendance", data.classRef.id],
          (prev: (typeof data)[]) => {
            return [data, ...prev];
          }
        );
        toast("Attendance has been recorded");
      },
    }),
    delete: useMutation({
      mutationFn: async ({
        attendanceId,
        classId,
      }: {
        attendanceId: string;
        classId: string;
      }) => {
        await attendanceService.delete(attendanceId);

        return { attendanceId, classId };
      },
      async onSuccess({ attendanceId, classId }) {
        queryClient.setQueryData(["attendance", classId], (prev: Class[]) => {
          if (prev) {
            const newData = prev.filter((i) => attendanceId != i.id);

            return newData;
          }
        });
      },
    }),
    update: useMutation({
      mutationFn: async ({
        id,
        data,
      }: {
        id: string;
        data: Partial<Attendance>;
      }) => {
        const res = await attendanceService.update(id, data);
        return res;
      },
      async onSuccess(data) {
        queryClient.setQueryData(["attendance", undefined], (prev: Class[]) => {
          const newClasses = prev.map((item) =>
            item.id === data?.id ? { ...item, status: data.status } : item
          );

          return newClasses;
        });

        queryClient.setQueryData(["attendance", data?.id], (prev: Class) => {
          return { ...prev, status: data?.status };
        });
      },
    }),
  };
};
