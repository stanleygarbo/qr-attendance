import AlertDialog from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import { useAppServices } from "@/context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { Scanner } from "@yudiel/react-qr-scanner";
import { QrCode, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";

const ScanQr = () => {
  const params = useParams();
  const { classService } = useAppServices();

  const query = useQuery({
    queryKey: ["class", params.id],
    async queryFn() {
      if (params.id) {
        const data = await classService.getById(params.id);

        return data;
      }
    },
  });

  return (
    <div className="grid grid-cols-[300px_1fr] gap-10 mt-4">
      <div className="w-[300px] rounded-xl overflow-hidden">
        <Scanner onScan={(result) => console.log(result)} scanDelay={0} />
      </div>
      <div className="">
        <h1 className="text-2xl font-bold h-16 rounded-xl flex items-center">
          {query.data?.section} - {query.data?.name}
        </h1>

        <div className="mt-4 w-[380px]">
          <h2 className="">QR Logs</h2>
          <div className="relative grid grid-cols-[32px_120px_1fr] items-center border rounded-md px-2 py-2 bg-white mt-2">
            <QrCode />
            <div>19001397900</div>
            <div>Sun Oct 12 3:35 PM</div>
            <AlertDialog>
              <Button
                variant={"secondary"}
                className="absolute h-10 w-10 right-0 top-0"
              >
                <Trash2 className="" />
              </Button>
            </AlertDialog>
          </div>
          <div className="relative grid grid-cols-[32px_120px_1fr] items-center border rounded-md px-2 py-2 bg-white mt-2">
            <QrCode />
            <div>19001397900</div>
            <div>Sun Oct 12 3:35 PM</div>

            <AlertDialog>
              <Button
                variant={"secondary"}
                className="absolute h-10 w-10 right-0 top-0"
              >
                <Trash2 className="" />
              </Button>
            </AlertDialog>
          </div>
          <div className="grid grid-cols-[32px_120px_1fr_32px] relative items-center border rounded-md px-2 py-2 bg-white mt-2">
            <QrCode />
            <div>19001397900</div>
            <div>Sun Oct 12 3:35 PM</div>
            <AlertDialog>
              <Button
                variant={"secondary"}
                className="absolute h-10 w-10 right-0 top-0"
              >
                <Trash2 className="" />
              </Button>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanQr;
