export async function generateQRCode(credentialId: string, credentialData?: any): Promise<string> {
  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    let verificationUrl: string

    if (credentialData) {
      const jsonString = JSON.stringify(credentialData)
      const base64 =
        typeof window !== "undefined"
          ? btoa(unescape(encodeURIComponent(jsonString)))
          : Buffer.from(jsonString).toString("base64")
      const urlSafeBase64 = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
      verificationUrl = `${baseUrl}/verify?data=${urlSafeBase64}`
    } else {
      verificationUrl = `${baseUrl}/verify?id=${encodeURIComponent(credentialId)}`
    }

    console.log("[v0] Generated QR Code URL:", verificationUrl)

    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(verificationUrl)}`

    return qrApiUrl
  } catch (error) {
    console.error("[v0] Error generating QR code:", error)
    throw error
  }
}
