import { db } from "@/config/firebase";
import { authStore } from "@/store/authStore";
import {
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import type { IStudentRepository } from "./IStudentRepository";
import type { Student } from "@/models/Student";
import type { Class } from "@/models/Class";

export interface StudentFilters {
  classId?: string;
  usn?: string;
  orderBy?: string;
  order?: "asc" | "desc";
}

export class StudentRepository implements IStudentRepository {
  add: IStudentRepository["add"] = async (data) => {
    if (!authStore.user) throw new Error("Unauthorized");

    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      userId: authStore.user.uid,
    };

    await setDoc(doc(db, "student", data.usn), data);

    return {
      id: data.usn,
      ...docData,
    };
  };

  async getAll() {
    const q = query(
      collection(db, "student"),
      where("userId", "==", authStore.user?.uid)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data as Student[];
  }

  async getById(id: string) {
    const docRef = doc(db, "student", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Student;
    } else {
      return null;
    }
  }

  async getByClass(classId: string) {
    const sectionRef = doc(db, "class", classId);
    const sectionSnap = await getDoc(sectionRef);

    if (!sectionSnap.exists()) {
      console.warn(`Section ${classId} not found`);
      return [];
    }

    const classData = sectionSnap.data() as Class;

    if (!Array.isArray(classData.students) || classData.students.length === 0) {
      return [];
    }

    // Fetch all student refs in parallel
    const studentSnaps = await Promise.all(
      classData.students.map(async (studentRef: DocumentReference<Student>) => {
        const snap = await getDoc(studentRef);
        return snap.exists() ? ({ ...snap.data() } as Student) : null;
      })
    );

    // Filter out nulls (in case of missing docs)
    return studentSnaps.filter((s): s is Student => s !== null);
  }

  async deleteFromClass(studentId: string, classId: string) {
    console.log(studentId, classId);
    const classDoc = doc(db, "class", classId);
    const studentDoc = doc(db, "student", studentId);
    await updateDoc(classDoc, {
      students: arrayRemove(studentDoc),
    });
  }

  async deleteById(id: string) {
    try {
      await deleteDoc(doc(db, "student", id)); // ✅ deletes document with given ID

      return id;
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  }
}
