import type { DocumentReference, FieldValue } from "firebase/firestore";
import type { Student } from "./Student";

export interface Class {
  id: string;
  name: string;
  section: string;
  userId: string | undefined;
  createdAt: FieldValue;
  students: DocumentReference<Student>[];
}
