/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { SwitchCamera } from "lucide-react";

type QrDatta={
  ticket_id:string;
  event:{
    title:string;
    date:string;
    venue:string;
  }
}
const QRScanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrData, setQrData] = useState<QrDatta | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [cameraMode, setCameraMode] = useState<"user" | "environment">("environment"); // Default to back camera
  // const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateQrcode = async (result: string) => {
    try {
      const response = await fetch('/api/purchases/ticket/validator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrString: result }),
      });

      const data = await response.json();
      console.log(response)
      if (data.success) {
        // setIsValid(true)
        console.log(data.ticketTier);
        setQrData(data.ticketTier);
      } else {
        // setIsValid(false)
        console.log('Failed to validate ticket:', data.error);
        setErrorMessage('Failed to validate ticket.\n Either ticket is used or still pending')
      }
    } catch (error) {
      // setIsValid(false)
      console.log(error);
      setErrorMessage('Failed to validate ticket.\n Either ticket is used or still pending')

    }
  }
  const startCamera = async () => {
    setIsScanning(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: cameraMode },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        console.log("Camera started");
        setIsScanning(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setErrorMessage("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    console.log("Camera stopped");
    setIsScanning(false);
  };

  useEffect(() => {
    const scanQRCode = () => {
      if (!videoRef.current || !canvasRef.current || !isScanning) return;

      const canvas = canvasRef.current;
      const video = videoRef.current;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Canvas context is null");
        return;
      }

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.log("Waiting for video dimensions...");
        requestAnimationFrame(scanQRCode);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        console.log("QR Code Found:", code.data);
        // setQrData(code.data);
        validateQrcode(code.data);
        stopCamera();
        setIsScanning(false)
      } else {
        console.log("No QR code found in this frame");
        requestAnimationFrame(scanQRCode);
      }
    };

    if (isScanning) {
      console.log("Starting QR code scan...");
      requestAnimationFrame(scanQRCode);
    }
  }, [isScanning]);

  const handleCameraSwitch = () => {
    setCameraMode((prev) => (prev === "user" ? "environment" : "user"));
    console.log("Switched camera to:", cameraMode === "user" ? "Back" : "Front");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setErrorMessage("No file selected. Please choose an image.");
      return;
    }

    const img = new Image();
    img.onload = () => {
      // Dynamically create a canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Canvas context is null.");
        setErrorMessage("Failed to initialize canvas for processing.");
        return;
      }

      // Maintain aspect ratio for the canvas
      const MAX_DIMENSION = 1000; // Limit size to avoid performance issues
      let width = img.width;
      let height = img.height;

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = (height / width) * MAX_DIMENSION;
          width = MAX_DIMENSION;
        } else {
          width = (width / height) * MAX_DIMENSION;
          height = MAX_DIMENSION;
        }
      }

      canvas.width = Math.round(width);
      canvas.height = Math.round(height);

      // Draw the resized image onto the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Extract image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Pass to jsQR
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        console.log("QR Code Found in Image:", code.data);
        // setQrData(code.data);
        validateQrcode(code.data);
      } else {
        console.log("No QR code found in the uploaded image.");
        setErrorMessage("No QR code detected in the selected image. Ensure the image contains a clear QR code.");
      }
    };

    img.onerror = () => {
      setErrorMessage("Failed to load the image. Please try another file.");
    };

    // Read the file as a Data URL and set it as the image source
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };



  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-bold">Ticket QR Code Scanner</h1>

      <div className="flex justify-center gap-4 mt-4">
        <button
          className="p-1 px-3 bg-purple-800 rounded-lg text-white" onClick={startCamera} disabled={isScanning} >
          Scan
        </button>

        <button onClick={stopCamera} disabled={!isScanning} className="p-1 px-3 bg-red-500 rounded-lg text-white">
          Stop
        </button>
      </div>

      <div className="">
        <button
          className=""
          onClick={handleCameraSwitch}
          disabled={isScanning}>
          <SwitchCamera />
        </button>
        <div className="flex gap-2 flex-col">
{
  isScanning &&(
    <video ref={videoRef}
    style={{
      width: "350px",
      height: "350px",
      border: "1px solid black",
      borderRadius: "5px",
    }}
  ></video>
  )
}
        <canvas
        className={`${isScanning?"hidden":""}`}
            ref={canvasRef}
            style={{
              width: "350px",
              height: "350px",
              border: "1px solid black",
              borderRadius: "5px",
            }}
          ></canvas>
        </div>

      </div>

      <div className="mt-8">
        <label
          style={{
            padding: "8px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "#FFF",
            borderRadius: "5px",
          }}
        >
          Chhose Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>


      <div style={{ marginTop: "20px" }}>
        {qrData ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg mx-auto">
              <h2 className="text-lg font-bold text-gray-800">Validation Successful!</h2>
              <div className='text-center  flex justify-center flex-col items-center'>
                <img className='w-44' src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1200px-Eo_circle_green_checkmark.svg.png" alt="" />
                <h1 className='font-bold'>Ticket Details:</h1>
                {/* <p className='text-sm'>{qrData}</p> */}
                <p className='text-sm font-bold'>{qrData.event.title}</p>
                <p className='text-sm'>Venue: {qrData.event.venue}</p>
                <p className='text-sm'>Event Time: {new Date(qrData.event.date).toLocaleTimeString()}</p>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={() => setQrData(null)}
                >
                  OK
                </button>

              </div>
            </div>
          </div>
        ) : (
          <p>{isScanning ? "Scanning for QR codes..." : "Click 'Scan' or 'Choose Image' to begin."}</p>
        )}
      </div>
      {
        errorMessage && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xl mx-auto">
              <h2 className="text-lg font-bold text-gray-800">Validation Failed!</h2>
              <p className="mt-2 text-red-600">{errorMessage}</p>

              <div className="flex justify-center gap-2">
                <button
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={() => setErrorMessage(null)}
                >
                  OK
                </button>

              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default QRScanner;




// import { useEffect, useRef, useState } from "react";
// import jsQR from "jsqr";

// const QRScanner = () => {
//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [qrData, setQrData] = useState<string | null>(null);
//   const [isScanning, setIsScanning] = useState(false);
//   const [cameraMode, setCameraMode] = useState<"user" | "environment">("environment"); // Default to back camera

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: cameraMode },
//       });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//         videoRef.current.play();
//         console.log("Camera started");
//         setIsScanning(true);
//       }
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//       setErrorMessage("Could not access camera. Please check permissions.");
//     }
//   };

//   const stopCamera = () => {
//     if (videoRef.current && videoRef.current.srcObject) {
//       const stream = videoRef.current.srcObject as MediaStream;
//       stream.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//     console.log("Camera stopped");
//     setIsScanning(false);
//   };

//   useEffect(() => {
//     const scanQRCode = () => {
//       if (!videoRef.current || !canvasRef.current || !isScanning) return;

//       const canvas = canvasRef.current;
//       const video = videoRef.current;

//       const ctx = canvas.getContext("2d");
//       if (!ctx) {
//         console.error("Canvas context is null");
//         return;
//       }

//       if (video.videoWidth === 0 || video.videoHeight === 0) {
//         console.log("Waiting for video dimensions...");
//         requestAnimationFrame(scanQRCode);
//         return;
//       }

//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;

//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//       const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//       const code = jsQR(imageData.data, imageData.width, imageData.height);

//       if (code) {
//         console.log("QR Code Found:", code.data);
//         setQrData(code.data);
//         stopCamera();
//       } else {
//         console.log("No QR code found in this frame");
//         requestAnimationFrame(scanQRCode);
//       }
//     };

//     if (isScanning) {
//       console.log("Starting QR code scan...");
//       requestAnimationFrame(scanQRCode);
//     }
//   }, [isScanning]);

//   const handleCameraSwitch = () => {
//     setCameraMode((prev) => (prev === "user" ? "environment" : "user"));
//     console.log("Switched camera to:", cameraMode === "user" ? "Back" : "Front");
//   };

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const img = new Image();
//     img.onload = () => {
//       if (!canvasRef.current) return;

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//       if (!ctx) return;

//       canvas.width = img.width;
//       canvas.height = img.height;

//       ctx.drawImage(img, 0, 0, img.width, img.height);

//       const imageData = ctx.getImageData(0, 0, img.width, img.height);
//       const code = jsQR(imageData.data, imageData.width, imageData.height);

//       if (code) {
//         console.log("QR Code Found in Image:", code.data);
//         setQrData(code.data);
//       } else {
//         console.log("No QR code found in the uploaded image");
//         setErrorMessage("No QR code detected in the selected image.");
//       }
//     };

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       img.src = e.target?.result as string;
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <h1>QR Code Scanner</h1>

//       <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
//         <button
//           onClick={startCamera}
//           disabled={isScanning}
//           style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
//         >
//           Start Scanning
//         </button>
//         <button
//           onClick={handleCameraSwitch}
//           disabled={isScanning}
//           style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
//         >
//           Switch to {cameraMode === "user" ? "Back" : "Front"} Camera
//         </button>
//         <button
//           onClick={stopCamera}
//           disabled={!isScanning}
//           style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
//         >
//           Stop Scanning
//         </button>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <label
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             cursor: "pointer",
//             backgroundColor: "#007BFF",
//             color: "#FFF",
//             borderRadius: "5px",
//           }}
//         >
//           Select Image
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//             style={{ display: "none" }}
//           />
//         </label>
//       </div>

//       <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
//         {/* Video Element */}
//         <video
//           ref={videoRef}
//           style={{
//             width: "320px",
//             height: "240px",
//             border: "1px solid black",
//             borderRadius: "5px",
//           }}
//         ></video>

//         {/* Canvas Element */}
//         <canvas
//           ref={canvasRef}
//           style={{
//             width: "320px",
//             height: "240px",
//             border: "1px solid black",
//             borderRadius: "5px",
//           }}
//         ></canvas>
//       </div>

//       <div style={{ marginTop: "20px" }}>
//         {qrData ? (
//           <p style={{ fontWeight: "bold", color: "green" }}>QR Code Data: {qrData}</p>
//         ) : (
//           <p>{isScanning ? "Scanning for QR codes..." : "Click 'Start Scanning' or 'Select Image' to begin."}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QRScanner;
