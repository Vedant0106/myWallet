import type { Transaction } from "@/types/wallet"
import { formatCurrency } from "@/lib/exchange-rates"

export const exportToCSV = (transactions: Transaction[], filename = "transactions.csv") => {
  const headers = ["Date", "Type", "Amount", "Currency", "To Currency", "Status", "Description"]

  const csvContent = [
    headers.join(","),
    ...transactions.map((transaction) =>
      [
        new Date(transaction.date).toLocaleDateString(),
        transaction.type,
        transaction.amount.toString(),
        transaction.currency,
        transaction.toCurrency || "",
        transaction.status,
        `"${transaction.description}"`,
      ].join(","),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportToPDF = (transactions: Transaction[], filename = "transactions.pdf") => {
  try {
    // Create a simple HTML table for PDF export
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Transaction History</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          h1 { color: #333; }
          @media print {
            body { margin: 0; }
          }
        </style>
      </head>
      <body>
        <h1>Transaction History</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>To Currency</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${transactions
              .map(
                (transaction) => `
              <tr>
                <td>${new Date(transaction.date).toLocaleDateString()}</td>
                <td>${transaction.type}</td>
                <td>${formatCurrency(transaction.amount, transaction.currency)}</td>
                <td>${transaction.currency}</td>
                <td>${transaction.toCurrency || "-"}</td>
                <td>${transaction.status}</td>
                <td>${transaction.description}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() {
              window.close();
            }, 1000);
          }
        </script>
      </body>
      </html>
    `

    // Open in new window and trigger print dialog for PDF generation
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()
    } else {
      // Fallback: download as HTML if popup blocked
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = filename.replace(".pdf", ".html")
      link.click()
      URL.revokeObjectURL(url)
    }
  } catch (error) {
    console.error("  PDF export failed:", error)
    // Fallback to HTML download
    const htmlContent = `
      <h1>Transaction History</h1>
      <p>Generated on: ${new Date().toLocaleDateString()}</p>
      <table border="1" style="border-collapse: collapse; width: 100%;">
        <tr><th>Date</th><th>Type</th><th>Amount</th><th>Currency</th><th>To Currency</th><th>Status</th><th>Description</th></tr>
        ${transactions
          .map(
            (t) => `
          <tr>
            <td>${new Date(t.date).toLocaleDateString()}</td>
            <td>${t.type}</td>
            <td>${formatCurrency(t.amount, t.currency)}</td>
            <td>${t.currency}</td>
            <td>${t.toCurrency || "-"}</td>
            <td>${t.status}</td>
            <td>${t.description}</td>
          </tr>
        `,
          )
          .join("")}
      </table>
    `
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename.replace(".pdf", ".html")
    link.click()
    URL.revokeObjectURL(url)
  }
}

export const exportToExcel = (transactions: Transaction[], filename = "transactions.xlsx") => {
  // For simplicity, we'll export as CSV with .xlsx extension
  // In a real app, you'd use a library like xlsx or exceljs
  const headers = ["Date", "Type", "Amount", "Currency", "To Currency", "Status", "Description"]

  const csvContent = [
    headers.join("\t"),
    ...transactions.map((transaction) =>
      [
        new Date(transaction.date).toLocaleDateString(),
        transaction.type,
        transaction.amount.toString(),
        transaction.currency,
        transaction.toCurrency || "",
        transaction.status,
        transaction.description,
      ].join("\t"),
    ),
  ].join("\n")

  const blob = new Blob([csvContent], { type: "application/vnd.ms-excel" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
