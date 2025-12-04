import { useAppServices } from "@/context/AppContext";
import type { Student } from "@/models/Student";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

export function useStudentQuery(classId?: string) {
  const { studentService, attendanceService } = useAppServices();

  return useQuery({
    queryKey: ["student", classId],
    queryFn: async () => {
      if (!classId) return [];
      const students = await studentService.getByClass(classId);

      const classAttendance =
        (await attendanceService.getByClass(classId)) || [];

      //map attendance to students
      const studentAttendanceMap = new Map<string, string[]>();
      const attendanceDateSet = [
        ...new Set<string>(
          classAttendance.map((i) =>
            dayjs(i.createdAt.toDate()).format("MM-DD-YYYY")
          )
        ),
      ].sort();

      for (const attendance of classAttendance) {
        if (!studentAttendanceMap.has(attendance.studentRef.id)) {
          studentAttendanceMap.set(attendance.studentRef.id, [
            dayjs(attendance.createdAt.toDate()).format("MM-DD-YYYY"),
          ]);
        } else {
          studentAttendanceMap.set(attendance.studentRef.id, [
            ...(studentAttendanceMap.get(attendance.studentRef.id) || []),
            dayjs(attendance.createdAt.toDate()).format("MM-DD-YYYY"),
          ]);
        }
      }

      const studentsWithAttendance: (Student & {
        attendance: { date: string; status: string }[];
      })[] = [];
      for (const student of students) {
        const attendance: { date: string; status: string }[] = [];
        const studentAttendance = studentAttendanceMap.get(student.usn) || [];

        for (const attendanceDate of attendanceDateSet) {
          console.log(studentAttendance, attendanceDate);
          if (studentAttendance.includes(attendanceDate)) {
            attendance.push({
              date: attendanceDate,
              status: "✅",
            });
          } else {
            attendance.push({
              date: attendanceDate,
              status: "❌",
            });
          }
        }

        const newStudent = {
          ...student,
          attendance,
        };

        studentsWithAttendance.push(newStudent);
      }

      return studentsWithAttendance;
    },
    enabled: !!classId,
  });
}
