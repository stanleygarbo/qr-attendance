import AddStudentForm from "@/components/AddStudentForm";
import DataTableDensityDemo from "@/components/customized/table/table-10";
import QRPopup from "@/components/QRPopup";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "@/patterns.css";
import { Button } from "@/components/ui/button";
import { useClassQuery } from "@/hooks/useClassQuery";
import ClassDialog from "@/components/ClassDialog";

const Class = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const usn = searchParams.get("usn") || "";
  const name = searchParams.get("name") || "";
  const navigate = useNavigate();

  const query = useClassQuery(params.id || "");

  return (
    <div>
      <div className="bg-background rounded-md border mt-5 h-36 grid grid-rows-[76px_1fr] overflow-hidden">
        <div className="pattern-grid-md w-full opacity-40"></div>
        <div className="flex items-center px-4 justify-between">
          <h1 className="text-2xl font-bold ">
            {query.data?.section} - {query.data?.name}
          </h1>
          <div className="flex gap-2">
            <ClassDialog
              mode="edit"
              initialData={{
                id: params.id,
                name: query.data?.name,
                section: query.data?.section,
              }}
            />
            <Button asChild>
              <Link to="scan-qr">Scan Qr</Link>
            </Button>
          </div>
        </div>
      </div>
      <AddStudentForm />
      <div className="flex flex-col justify-center">
        {usn ? (
          <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex items-center justify-center">
            <div
              className="absolute w-screen h-screen z-10"
              onClick={() => {
                navigate(-1);
              }}
            ></div>
            <div className="relative w-[290px] h-[320px] z-20 bg-white shadow-xl items-center pb-[20px] rounded-lg flex flex-col pt-5">
              <QRPopup usn={usn} />
              <p className="absolute bottom-[15px] text-center w-full">
                {name}
              </p>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-[1fr_100px_1fr] items-center mt-5">
          <div className="border-t"></div>
          <div className="text-center text-muted-foreground text-sm">
            Students List
          </div>
          <div className="border-t"></div>
        </div>
        <DataTableDensityDemo />
      </div>
    </div>
  );
};

export default Class;
