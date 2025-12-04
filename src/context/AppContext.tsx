import { AttendanceRepository } from "@/repositories/AttendanceRepository";
import { ClassRepository } from "@/repositories/ClassRepository";
import { StudentRepository } from "@/repositories/StudentRepository";
import AttendanceService from "@/services/AttendanceService";
import ClassService from "@/services/ClassService";
import StudentService from "@/services/StudentService";
import { createContext, useContext } from "react";

const studentRepo = new StudentRepository();
const classRepo = new ClassRepository();
const attendanceRepo = new AttendanceRepository();
const classService = new ClassService(classRepo);
const studentService = new StudentService(studentRepo, classRepo);
const attendanceService = new AttendanceService(attendanceRepo);

const AppContext = createContext({
  classService,
  studentService,
  attendanceService,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext.Provider
      value={{ classService, studentService, attendanceService }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppServices = () => useContext(AppContext);
