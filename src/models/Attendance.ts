import type { DocumentReference, Timestamp } from "firebase/firestore";

export interface Attendance {
  id: string;
  classRef: DocumentReference;
  studentRef: DocumentReference;
  userId: string;
  status: "present" | "absent" | "late";
  createdAt: Timestamp;
}
