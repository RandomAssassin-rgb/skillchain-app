interface PDFCredentialData {
  title: string
  issuer: string
  recipientAddress: string
  issuedDate: string
  expiryDate?: string
  field: string
  qrCodeUrl: string
  credentialId: string
  signature: string
}

export async function generateCredentialPDF(data: PDFCredentialData): Promise<void> {
  // Create HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; background: #f8fafc; }
        .certificate { background: white; padding: 60px; max-width: 800px; margin: 0 auto; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 30px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 32px; }
        .details { margin: 20px 0; }
        .detail-row { display: flex; margin: 15px 0; padding: 10px; background: #f1f5f9; border-radius: 6px; }
        .label { font-weight: bold; width: 200px; color: #475569; }
        .value { color: #1e293b; }
        .qr-section { text-align: center; margin: 30px 0; }
        .qr-section img { width: 200px; height: 200px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 12px; }
        .signature { font-size: 10px; color: #94a3b8; word-break: break-all; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="certificate">
        <div class="header">
          <h1>CREDENTIAL CERTIFICATE</h1>
          <p>Verified Blockchain Credential</p>
        </div>
        
        <div class="details">
          <div class="detail-row">
            <div class="label">Credential Name:</div>
            <div class="value">${data.title}</div>
          </div>
          <div class="detail-row">
            <div class="label">Field of Study:</div>
            <div class="value">${data.field}</div>
          </div>
          <div class="detail-row">
            <div class="label">Issued By:</div>
            <div class="value">${data.issuer}</div>
          </div>
          <div class="detail-row">
            <div class="label">Issued Date:</div>
            <div class="value">${new Date(data.issuedDate).toLocaleDateString()}</div>
          </div>
          ${
            data.expiryDate
              ? `
          <div class="detail-row">
            <div class="label">Expiry Date:</div>
            <div class="value">${new Date(data.expiryDate).toLocaleDateString()}</div>
          </div>
          `
              : ""
          }
          <div class="detail-row">
            <div class="label">Recipient Address:</div>
            <div class="value">${data.recipientAddress}</div>
          </div>
          <div class="detail-row">
            <div class="label">Credential ID:</div>
            <div class="value">${data.credentialId}</div>
          </div>
        </div>
        
        <div class="qr-section">
          <h3>Verification QR Code</h3>
          <img src="${data.qrCodeUrl}" alt="QR Code" />
          <p>Scan to verify this credential</p>
        </div>
        
        <div class="footer">
          <p><strong>This is a verified blockchain credential</strong></p>
          <p>Verify at: https://skillchain.vercel.app/verify?id=${data.credentialId}</p>
          <div class="signature">Digital Signature: ${data.signature}</div>
        </div>
      </div>
    </body>
    </html>
  `

  // Create blob and trigger download
  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `credential-${data.credentialId}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  // Note: Users can open the HTML file and print to PDF using browser's print dialog
  setTimeout(() => {
    alert(
      'Certificate downloaded as HTML. You can open it and use your browser\'s "Print to PDF" option to save as PDF.',
    )
  }, 100)
}

export async function generateVerificationReportPDF(data: any): Promise<void> {
  const isValid = data.verified && data.status === "Valid"

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 40px; background: #f8fafc; }
        .report { background: white; padding: 60px; max-width: 800px; margin: 0 auto; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: ${isValid ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #ef4444, #dc2626)"}; color: white; padding: 40px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
        .header h1 { margin: 0; font-size: 48px; }
        .header p { margin: 10px 0 0 0; font-size: 16px; }
        .title-section { background: #eff6ff; padding: 20px; text-align: center; border-radius: 8px; margin-bottom: 30px; }
        .title-section h2 { margin: 0; font-size: 24px; color: #1e293b; }
        .title-section p { margin: 5px 0 0 0; color: #64748b; }
        .details { margin: 20px 0; }
        .detail-row { display: flex; margin: 15px 0; padding: 12px; background: #f8fafc; border-radius: 6px; border-left: 4px solid #3b82f6; }
        .label { font-weight: bold; width: 180px; color: #475569; }
        .value { color: #1e293b; flex: 1; }
        .status-box { background: ${isValid ? "#d1fae5" : "#fee2e2"}; padding: 20px; border-radius: 8px; margin: 30px 0; border: 2px solid ${isValid ? "#10b981" : "#ef4444"}; }
        .status-box h3 { margin: 0 0 10px 0; color: ${isValid ? "#065f46" : "#991b1b"}; }
        .status-box p { margin: 0; color: ${isValid ? "#047857" : "#b91c1c"}; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="report">
        <div class="header">
          <h1>${isValid ? "✓ VERIFIED" : "✗ INVALID"}</h1>
          <p>${isValid ? "This credential is authentic and verified" : "This credential could not be verified"}</p>
        </div>
        
        <div class="title-section">
          <h2>${data.title || "Credential Report"}</h2>
          <p>${data.issuer || "Unknown Issuer"}</p>
        </div>
        
        <h3 style="color: #1e293b; margin: 30px 0 20px 0;">Credential Details</h3>
        
        <div class="details">
          <div class="detail-row">
            <div class="label">Credential ID:</div>
            <div class="value">${data.id || "N/A"}</div>
          </div>
          <div class="detail-row">
            <div class="label">Status:</div>
            <div class="value">${data.status || "Unknown"}</div>
          </div>
          <div class="detail-row">
            <div class="label">Issued Date:</div>
            <div class="value">${data.issuedDate || "N/A"}</div>
          </div>
          <div class="detail-row">
            <div class="label">Expiry Date:</div>
            <div class="value">${data.expiryDate || "No expiry"}</div>
          </div>
          <div class="detail-row">
            <div class="label">Student Address:</div>
            <div class="value">${data.student || "N/A"}</div>
          </div>
        </div>
        
        <div class="status-box">
          <h3>Verification Status</h3>
          <p>${
            isValid
              ? "This credential has been verified on the blockchain and is authentic."
              : "This credential could not be verified. It may be forged, expired, or not registered."
          }</p>
        </div>
        
        <div class="footer">
          <p><strong>Generated by SkillChain - Blockchain Credential Verification</strong></p>
          <p>Report generated on: ${new Date().toLocaleString()}</p>
          <p>Verify at: https://skillchain.vercel.app/verify</p>
        </div>
      </div>
    </body>
    </html>
  `

  const blob = new Blob([htmlContent], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `verification-report-${data.id || Date.now()}.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  setTimeout(() => {
    alert(
      'Verification report downloaded as HTML. You can open it and use your browser\'s "Print to PDF" option to save as PDF.',
    )
  }, 100)
}
