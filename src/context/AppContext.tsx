import { ClassRepository } from "@/repositories/ClassRepository";
import { StudentRepository } from "@/repositories/StudentRepository";
import ClassService from "@/services/ClassService";
import StudentService from "@/services/StudentService";
import { createContext, useContext } from "react";

const studentRepo = new StudentRepository();
const classRepo = new ClassRepository();
const classService = new ClassService(classRepo);
const studentService = new StudentService(studentRepo, classRepo);

const AppContext = createContext({ classService, studentService });

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContext.Provider value={{ classService, studentService }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppServices = () => useContext(AppContext);
