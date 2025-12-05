import AlertDialog from "@/components/AlertDialog";
import { Button } from "@/components/ui/button";
import { useAttendanceMutations } from "@/hooks/useAttendanceMutations";
import { useAttendanceQuery } from "@/hooks/useAttendanceQuery";
import { useClassQuery } from "@/hooks/useClassQuery";
import { authStore } from "@/store/authStore";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { QrCode, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "sonner";

const ScanQr = () => {
  const params = useParams();
  const classQuery = useClassQuery(params.id || "");
  const attendanceMutations = useAttendanceMutations();
  const attendanceQuery = useAttendanceQuery(params.id || "");

  const onScan = useCallback(async (result: IDetectedBarcode[]) => {
    if (authStore.user?.uid && params.id) {
      let isEnrolled = false;
      console.log(classQuery.data?.students);
      for (const student of classQuery.data?.students || []) {
        if (result[0].rawValue === student.id) {
          isEnrolled = true;
        }
      }
      if (!isEnrolled) {
        toast.error(
          "Student with usn:" + result[0].rawValue + " is not enrolled"
        );
        return;
      }

      attendanceMutations.add.mutate({
        classId: params.id,
        studentId: result[0].rawValue,
        userId: authStore.user.uid,
        status: "present",
      });
    }
  }, []);

  return (
    <div className="grid grid-cols-[300px_1fr] gap-10 mt-4">
      <div className="w-[300px] self-start rounded-xl overflow-hidden relative">
        {attendanceMutations.add.isPending && (
          <div className="w-full h-full absolute left-0 right-0 bg-black/50 z-50 flex items-center justify-center">
            <img src="/loading.svg" className="invert" alt="" />
          </div>
        )}
        <Scanner onScan={onScan} scanDelay={1} />
      </div>
      <div className="">
        <h1 className="text-2xl font-bold h-16 rounded-xl flex items-center">
          {classQuery.data?.section} - {classQuery.data?.name}
        </h1>

        <div className="mt-4 w-[380px]">
          <h2 className="">
            {attendanceQuery.data ? "QR Logs" : "No attendance record."}
          </h2>
          {attendanceQuery.data?.map((i) => (
            <div
              key={i.id}
              className="relative grid grid-cols-[32px_120px_1fr] items-center border rounded-md px-2 py-2 bg-white mt-2"
            >
              <QrCode />
              <div>{i.studentRef.id}</div>
              <div>
                {dayjs(i.createdAt.toDate()).format("ddd MMM D h:mm A")}
              </div>
              <AlertDialog
                onConfirm={() => {
                  attendanceMutations.delete.mutate({
                    attendanceId: i.id,
                    classId: params.id || "",
                  });
                }}
              >
                <Button
                  variant={"secondary"}
                  className="absolute h-10 w-10 right-0 top-0"
                >
                  <Trash2 size={20} />
                </Button>
              </AlertDialog>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScanQr;
