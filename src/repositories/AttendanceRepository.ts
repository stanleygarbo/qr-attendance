import { db } from "@/config/firebase";
import type { Class } from "@/models/Class";
import { authStore } from "@/store/authStore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import type { IAttendanceRepository } from "./IAttendanceRepository";
import type { Attendance } from "@/models/Attendance";

export class AttendanceRepository implements IAttendanceRepository {
  add: IAttendanceRepository["add"] = async (data) => {
    if (!authStore.user) throw new Error("Unauthorized");

    const docData = {
      ...data,
      createdAt: serverTimestamp() as Timestamp,
      userId: authStore.user.uid,
    };

    const docRef = await addDoc(collection(db, "attendance"), docData);

    return (await this.getById(docRef.id)) as Attendance;
  };

  async getAll() {
    const q = query(
      collection(db, "attendance"),
      where("userId", "==", authStore.user?.uid),
      orderBy("createdAt", "desc") // or "asc"
    );
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data as Attendance[];
  }

  async getById(id: string) {
    const docRef = doc(db, "attendance", id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id } as Attendance;
    } else {
      return null;
    }
  }

  async getByClass(classId: string) {
    console.log(classId);

    const classRef = doc(db, "class", classId);

    const q = query(
      collection(db, "attendance"),
      where("classRef", "==", classRef)
    );

    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data as Attendance[];
  }

  async deleteById(id: string) {
    try {
      await deleteDoc(doc(db, "attendance", id)); // ✅ deletes document with given ID
      console.log(`attendance with ID ${id} deleted successfully.`);

      return id;
    } catch (error) {
      console.error("Error deleting attendance:", error);
    }
  }

  async update(id: string, data: Partial<Class>) {
    const ref = doc(db, "attendance", id);
    await updateDoc(ref, data);

    const newRecord = await this.getById(id);

    return newRecord;
  }
}
