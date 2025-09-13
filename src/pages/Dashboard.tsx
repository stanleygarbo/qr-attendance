import AddStudentForm from "@/components/AddStudentForm";
import DataTableDensityDemo from "@/components/customized/table/table-10";
import QRPopup from "@/components/QRPopup";
import { useNavigate, useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [params] = useSearchParams();
  const usn = params.get("qr") || "";
  const navigate = useNavigate();

  return (
    <div>
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
                Stanley Garbo
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

export default Dashboard;
