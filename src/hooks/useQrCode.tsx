import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

type UseQrCodeProps = {
  data: string;
  width?: number;
  height?: number;
};

export function useQrCode({ data, width = 200, height = 200 }: UseQrCodeProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  // Initialize QRCode once
  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      width,
      height,
      type: "svg",
      data: data,
      dotsOptions: {
        color: "#000000",
        type: "dots",
      },
      backgroundOptions: {
        color: "transparent",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
      cornersSquareOptions: {
        type: "dot",
      },
      cornersDotOptions: {
        type: "dot",
      },
    });

    if (ref.current) {
      qrCode.current.append(ref.current);
    }

    return () => {
      qrCode.current = null;
    };
  }, []);

  // Update data when it changes
  useEffect(() => {
    if (qrCode.current) {
      qrCode.current.update({ data });
    }
  }, [data]);

  return ref;
}
