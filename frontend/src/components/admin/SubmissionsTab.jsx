import React, { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MessageSquare, Download, FileSpreadsheet, Trash2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import {
  getContactSubmissions,
  getCatalogueDownloads,
  deleteContactSubmission,
  deleteCatalogueDownload,
} from '@/lib/api';

const FORM_TYPES = {
  contact: {
    label: 'Contact & Quote Messages',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'organization', label: 'Organization' },
      { key: 'message', label: 'Message' },
      { key: 'created_at', label: 'Submitted' },
    ],
    fetch: getContactSubmissions,
    remove: deleteContactSubmission,
    fileName: 'contact-messages',
  },
  catalogue: {
    label: 'Catalogue Downloads',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'country_code', label: 'Country Code' },
      { key: 'mobile_number', label: 'Mobile' },
      { key: 'created_at', label: 'Submitted' },
    ],
    fetch: getCatalogueDownloads,
    remove: deleteCatalogueDownload,
    fileName: 'catalogue-downloads',
  },
};

function formatCell(key, value) {
  if (key === 'created_at') return value ? format(new Date(value), 'PPpp') : '-';
  return value ?? '-';
}

// Neutralize CSV formula injection: a cell value starting with =, +, -, @, tab,
// or CR would run as a formula when opened in Excel/Sheets. These cells come
// from public, unauthenticated form submissions, so an attacker could plant one.
function sanitizeCsvCell(value) {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

function toCsv(columns, rows) {
  const header = columns.map((c) => `"${c.label.replace(/"/g, '""')}"`).join(',');
  const lines = rows.map((row) =>
    columns
      .map((c) => `"${sanitizeCsvCell(String(formatCell(c.key, row[c.key]))).replace(/"/g, '""')}"`)
      .join(',')
  );
  return [header, ...lines].join('\n');
}

function downloadBlob(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const SubmissionsTab = () => {
  const { toast } = useToast();
  const [activeType, setActiveType] = useState('contact');
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const config = FORM_TYPES[activeType];

  const loadRows = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await FORM_TYPES[activeType].fetch();
      setRows(data);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Failed to load submissions',
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeType, toast]);

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  const handleDelete = async () => {
    if (!pendingDelete) return;
    setIsDeleting(true);
    try {
      await config.remove(pendingDelete.id);
      setRows((prev) => prev.filter((r) => r.id !== pendingDelete.id));
      toast({ title: 'Submission deleted', className: 'bg-green-50 border-green-200' });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Delete failed', description: err.message });
    } finally {
      setIsDeleting(false);
      setPendingDelete(null);
    }
  };

  const handleExportCsv = () => {
    if (!rows.length) return;
    const csv = toCsv(config.columns, rows);
    downloadBlob(csv, `${config.fileName}-${Date.now()}.csv`, 'text/csv;charset=utf-8;');
  };

  const handleExportPdf = () => {
    if (!rows.length) return;
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.text(config.label, 14, 14);
    autoTable(doc, {
      startY: 20,
      head: [config.columns.map((c) => c.label)],
      body: rows.map((row) => config.columns.map((c) => String(formatCell(c.key, row[c.key])))),
      styles: { fontSize: 8, cellWidth: 'wrap' },
      headStyles: { fillColor: [12, 59, 120] },
    });
    doc.save(`${config.fileName}-${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {Object.entries(FORM_TYPES).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setActiveType(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeType === key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv} disabled={!rows.length}>
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPdf} disabled={!rows.length}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        {isLoading ? (
          <Table>
            <TableHeader>
              <TableRow>
                {config.columns.map((c) => (
                  <TableHead key={c.key}>{c.label}</TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {config.columns.map((c) => (
                    <TableCell key={c.key} className="align-top">
                      <Skeleton className="h-4 w-full max-w-[160px]" />
                    </TableCell>
                  ))}
                  <TableCell className="text-right align-top">
                    <Skeleton className="h-4 w-4 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <MessageSquare className="w-10 h-10 mb-2" />
            No submissions yet
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {config.columns.map((c) => (
                  <TableHead key={c.key}>{c.label}</TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {config.columns.map((c) => (
                    <TableCell key={c.key} className="max-w-xs truncate align-top">
                      {formatCell(c.key, row[c.key])}
                    </TableCell>
                  ))}
                  <TableCell className="text-right align-top">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setPendingDelete(row)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this submission?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the submission from {pendingDelete?.name ?? 'this entry'}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubmissionsTab;
