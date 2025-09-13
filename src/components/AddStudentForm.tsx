import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useCallback } from "react";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";

const AddStudentForm = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    Papa.parse(file, {
      header: true, // set to false if you don’t want first row as headers
      skipEmptyLines: true,
      complete: (results) => {
        // lowerize keys of objects. When users import CSVs, some columns are capitalized, we need to set those to lowercase
        for (const i of results.data) {
          const obj = i as { name: string; usn: string };
          // const newLowerizedKeyObj = { name: "", usn: "" };
          //lowerize keys
          const newLowerizedKeyObj = Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
          );

          if (!newLowerizedKeyObj.hasOwnProperty("name")) {
            alert('No "name" column found');
            break;
          } else if (!newLowerizedKeyObj.hasOwnProperty("usn")) {
            alert('No "usn" column found');
            break;
          }
        }
        // console.log("Parsed CSV:", results.data);
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

  return (
    <div className="grid grid-cols-[1fr_400px] mt-4 gap-4">
      <div className="border py-4 px-4 rounded-md">
        <h1 className="mb-2 font-bold">Add Student</h1>
        <form className="flex gap-4">
          <Input placeholder="USN" />
          <Input placeholder="Name" />
          <Button className="w-40">Add</Button>
        </form>
      </div>
      <div>
        {/* <Button>Import from CSV</Button> */}
        <div
          {...getRootProps()}
          className="border border-dashed h-full w-full rounded-md flex flex-col items-center justify-center gap-2"
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
