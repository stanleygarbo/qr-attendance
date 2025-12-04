import { useAppServices } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";

export function useAttendanceQuery(classId: string) {
  const { attendanceService } = useAppServices();

  return useQuery({
    queryKey: ["attendance", classId],
    queryFn: async () => {
      return await attendanceService.getByClass(classId);
    },
    enabled: classId ? !!classId : true,
  });
}
