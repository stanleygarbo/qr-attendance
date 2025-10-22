import { db } from "@/config/firebase";
import type { Class } from "@/models/Class";
import { authStore } from "@/store/authStore";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import type { IClassRepository } from "./IClassRepository";

export class ClassRepository implements IClassRepository {
  add: IClassRepository["add"] = async (data) => {
    if (!authStore.user) throw new Error("Unauthorized");

    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      userId: authStore.user.uid,
    };

    const docRef = await addDoc(collection(db, "class"), docData);

    return { ...docData, id: docRef.id, students: [] };
  };

  async getAll() {
    const q = query(
      collection(db, "class"),
      where("userId", "==", authStore.user?.uid),
      orderBy("createdAt", "desc") // or "asc"
    );
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data as Class[];
  }

  async getById(id: string) {
    const docRef = doc(db, "class", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id } as Class;
    } else {
      return null;
    }
  }

  async deleteById(id: string) {
    try {
      await deleteDoc(doc(db, "class", id)); // ✅ deletes document with given ID
      console.log(`Class with ID ${id} deleted successfully.`);

      return id;
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  }

  async addStudentRefToClass(classId: string, studentId: string) {
    const classDoc = doc(db, "class", classId);
    const studentDoc = doc(db, "student", studentId);
    await updateDoc(classDoc, {
      students: arrayUnion(studentDoc),
    });
  }

  async update(id: string, data: Partial<Class>) {
    const ref = doc(db, "class", id);
    await updateDoc(ref, data);

    const newRecord = await this.getById(id);

    return newRecord;
  }
}
