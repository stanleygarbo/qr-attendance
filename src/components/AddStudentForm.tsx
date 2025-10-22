import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useCallback, useState, type FormEvent } from "react";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";
import useStudentMutations from "@/hooks/useStudentMutations";

type StudentType = { name: string; usn: string };

const AddStudentForm = () => {
  const [usn, setUsn] = useState("");
  const [name, setName] = useState("");

  const studentMutations = useStudentMutations();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, // set to false if you don’t want first row as headers
      skipEmptyLines: true,
      complete: async (results) => {
        const students: StudentType[] = [];

        // lowerize keys of objects. When users import CSVs, some columns are capitalized, we need to set those to lowercase
        for (const i of results.data) {
          const obj = i as StudentType;
          //lowerize keys
          const newLowerizedKeyObj = Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
          );

          if (!newLowerizedKeyObj.hasOwnProperty("name")) {
            alert('No "name" column found');
            return;
          } else if (!newLowerizedKeyObj.hasOwnProperty("usn")) {
            alert('No "usn" column found');
            return;
          }
          students.push(newLowerizedKeyObj as StudentType);
        }

        const promises = students.map((i) =>
          studentMutations.add.mutateAsync(i)
        );
        await Promise.all(promises);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "text/csv": [".csv"] }, // only allow CSV
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      usn,
      name,
    };

    studentMutations.add.mutate(data);
  };

  return (
    <div className="grid grid-cols-[1fr_400px] mt-4 gap-4">
      <div className="border py-4 px-4 rounded-md bg-background">
        <h1 className="mb-2 font-bold">Add Student</h1>
        <form onSubmit={handleSubmit} className="flex gap-4 bg-back">
          <Input
            onChange={(e) => {
              setUsn(e.target.value);
            }}
            required
            value={usn}
            placeholder="USN"
          />
          <Input
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            placeholder="Name"
          />
          <Button
            className="w-40"
            disabled={studentMutations.add.isPending || !usn || !name}
          >
            {studentMutations.add.isPending ? (
              <img src="/loading.svg" className="invert w-4" alt="" />
            ) : (
              "Add"
            )}
          </Button>
        </form>
      </div>
      <div>
        {/* <Button>Import from CSV</Button> */}
        <div
          {...getRootProps()}
          className="border border-primary/30 border-dashed h-full w-full rounded-md flex flex-col items-center justify-center gap-2 bg-background"
        >
          <input {...getInputProps()} />
          <Download className="text-muted-foreground" />
          <p className="text-xs text-muted-foreground text-center">
            Import Students from CSV
            <br />
            Columns 'name' and 'usn' must be present
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddStudentForm;
