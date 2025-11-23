export function generateQRCodeUrl(data: string, size = 200): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}`
}

export async function downloadQRCode(data: string, filename = "credential-qr.png"): Promise<void> {
  const url = generateQRCodeUrl(data, 300)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
}
