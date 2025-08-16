"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileText, FileSpreadsheet, File } from "lucide-react"
import type { Transaction } from "@/types/wallet"
import { exportToCSV, exportToPDF, exportToExcel } from "@/lib/export-utils"
import { useToast } from "@/hooks/use-toast"

interface ExportButtonsProps {
  transactions: Transaction[]
  disabled?: boolean
}

export const ExportButtons = ({ transactions, disabled = false }: ExportButtonsProps) => {
  const { toast } = useToast()

  const handleExport = (format: "csv" | "pdf" | "excel") => {
    if (transactions.length === 0) {
      toast({
        title: "No Data to Export",
        description: "There are no transactions to export.",
        variant: "destructive",
      })
      return
    }

    const timestamp = new Date().toISOString().split("T")[0]

    try {
      switch (format) {
        case "csv":
          exportToCSV(transactions, `transactions-${timestamp}.csv`)
          break
        case "pdf":
          exportToPDF(transactions, `transactions-${timestamp}.pdf`)
          break
        case "excel":
          exportToExcel(transactions, `transactions-${timestamp}.xlsx`)
          break
      }

      toast({
        title: "Export Successful",
        description: `Transactions exported as ${format.toUpperCase()}`,
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your transactions.",
        variant: "destructive",
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          <File className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          <FileText className="h-4 w-4 mr-2" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("excel")}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
