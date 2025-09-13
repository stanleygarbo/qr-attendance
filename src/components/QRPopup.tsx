import { useQrCode } from "@/hooks/useQrCode";

const QRPopup = ({ usn }: { usn: string }) => {
  const qrRef = useQrCode({
    data: usn,
    width: 250,
    height: 250,
  });

  return (
    <div>
      <div ref={qrRef}></div>
    </div>
  );
};

export default QRPopup;
