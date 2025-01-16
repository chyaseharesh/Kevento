'use client'
import { useEffect, useRef, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { toast } from "sonner"

interface QRScannerProps {
  eventId: string
}

export function QRScanner({ eventId }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  useEffect(() => {
    if (!isScanning) return

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    )

    scannerRef.current.render(onScanSuccess, onScanError)

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((error) => console.error("Failed to clear scanner", error))
      }
    }
  }, [isScanning])

  const onScanSuccess = async (qrCode: string) => {
    try {
      const response = await fetch("/api/tickets/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrCode, eventId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error)
      }

      toast.success("Ticket validated successfully!")
      // Optional: Display ticket details
      console.log("Ticket details:", data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to validate ticket")
    }
  }

  const onScanError = (error: string) => {
    console.error("QR scan error:", error)
  }

  return (
    <div className="space-y-4">
      {!isScanning ? (
        <button
          onClick={() => setIsScanning(true)}
          className="w-full rounded-lg bg-black px-4 py-2 text-white"
        >
          Start Scanning
        </button>
      ) : (
        <>
          <div id="qr-reader" className="mx-auto max-w-sm" />
          <button
            onClick={() => {
              setIsScanning(false)
              scannerRef.current?.clear()
            }}
            className="w-full rounded-lg border border-black px-4 py-2"
          >
            Stop Scanning
          </button>
        </>
      )}
    </div>
  )
} 