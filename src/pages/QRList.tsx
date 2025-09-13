import { Button } from "@/components/ui/button";
import { useQrCode } from "@/hooks/useQrCode";
import { useLocation } from "react-router-dom";

const QRList = () => {
  const { state } = useLocation();

  const studentList = state as { usn: string; name: string }[];

  return (
    <div>
      <div className="w-[21cm] mx-auto no-print py-9">
        <Button onClick={window.print}>Print A4</Button>
      </div>
      <main className="w-[21cm] h-[29.7cm] mx-auto grid grid-cols-[repeat(3,calc(21cm/3))] items-start grid-rows-[calc(29.7cm/4)]">
        {studentList.map((i) => {
          const qr = useQrCode({ data: i.usn, width: 212, height: 212 });

          return (
            <div
              key={i.usn}
              className="flex flex-col items-center border rounded-md h-fit p-4 gap-2"
            >
              <div ref={qr}></div>
              <h2 className="mt-px">{i.name}</h2>
            </div>
          );
        })}
      </main>
      <style> {`@media print {.no-print{display: none;}}`}</style>
    </div>
  );
};

export default QRList;
