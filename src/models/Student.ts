import type { FieldValue } from "firebase/firestore";

export interface Student {
  id: string;
  usn: string;
  name: string;
  userId: string;
  createdAt: FieldValue;
}
