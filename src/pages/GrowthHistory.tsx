import { PageHeader } from '@/components/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGrowthHistory } from '@/hooks/useGrowthHistory';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Trash2, TrendingUp, Calendar, Ruler, Scale, FileText, FileSpreadsheet, Download } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { useToast } from '@/hooks/use-toast';

export default function GrowthHistory() {
  const { records, deleteRecord, clearHistory } = useGrowthHistory();
  const { toast } = useToast();

  const chartData = records.map(r => ({
    date: format(new Date(r.date), 'dd MMM', { locale: id }),
    usia: r.ageMonths,
    'TB/U': r.haz,
    'BB/U': r.waz,
    'BB/TB': r.whz,
    tinggi: r.height,
    berat: r.weight,
  }));

  const getStatusColor = (status: string) => {
    if (status === 'Normal') return 'text-risk-low';
    if (status === 'At Risk of Stunting') return 'text-risk-moderate';
    return 'text-risk-high';
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Normal': return 'Normal';
      case 'At Risk of Stunting': return 'Berisiko';
      case 'Stunted': return 'Stunting';
      case 'Severely Stunted': return 'Stunting Berat';
      default: return status;
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.setTextColor(22, 163, 74); // Green color
    doc.text('Tanggap Stunting', 14, 20);
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Riwayat Pertumbuhan Anak', 14, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Diekspor: ${format(new Date(), 'dd MMMM yyyy HH:mm', { locale: id })}`, 14, 38);

    // Table data
    const tableData = records.map(r => [
      format(new Date(r.date), 'dd/MM/yyyy', { locale: id }),
      `${r.ageMonths} bln`,
      r.gender === 'male' ? 'L' : 'P',
      `${r.height} cm`,
      `${r.weight} kg`,
      r.haz.toFixed(2),
      r.waz.toFixed(2),
      r.whz.toFixed(2),
      getStatusLabel(r.status),
    ]);

    autoTable(doc, {
      startY: 45,
      head: [['Tanggal', 'Usia', 'JK', 'Tinggi', 'Berat', 'TB/U', 'BB/U', 'BB/TB', 'Status']],
      body: tableData,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [22, 163, 74], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save(`riwayat-pertumbuhan-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    toast({ title: 'Berhasil!', description: 'Data berhasil diekspor ke PDF' });
  };

  const exportToExcel = () => {
    const excelData = records.map(r => ({
      'Tanggal': format(new Date(r.date), 'dd/MM/yyyy'),
      'Usia (bulan)': r.ageMonths,
      'Jenis Kelamin': r.gender === 'male' ? 'Laki-laki' : 'Perempuan',
      'Tinggi (cm)': r.height,
      'Berat (kg)': r.weight,
      'Z-Score TB/U': r.haz.toFixed(2),
      'Z-Score BB/U': r.waz.toFixed(2),
      'Z-Score BB/TB': r.whz.toFixed(2),
      'Status': getStatusLabel(r.status),
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Riwayat Pertumbuhan');
    
    // Auto-size columns
    const colWidths = [
      { wch: 12 }, { wch: 12 }, { wch: 14 }, { wch: 12 }, { wch: 12 },
      { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 16 }
    ];
    ws['!cols'] = colWidths;

    XLSX.writeFile(wb, `riwayat-pertumbuhan-${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
    toast({ title: 'Berhasil!', description: 'Data berhasil diekspor ke Excel' });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title="Riwayat Pertumbuhan" 
        subtitle="Pantau perkembangan anak dari waktu ke waktu"
      />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        {records.length === 0 ? (
          <Card className="p-8 text-center space-y-4">
            <TrendingUp className="w-16 h-16 mx-auto text-muted-foreground/50" />
            <div>
              <h3 className="font-semibold text-foreground">Belum Ada Riwayat</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Mulai periksa pertumbuhan anak untuk melihat grafik perkembangan
              </p>
            </div>
            <Link to="/child-detection">
              <Button>Mulai Pemeriksaan</Button>
            </Link>
          </Card>
        ) : (
          <>
            {/* Z-Score Chart */}
            <Card className="p-4 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">Grafik Z-Score</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <YAxis domain={[-4, 2]} tick={{ fontSize: 12 }} className="text-muted-foreground" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <ReferenceLine y={-2} stroke="hsl(var(--destructive))" strokeDasharray="5 5" label={{ value: 'Stunting', fontSize: 10 }} />
                    <ReferenceLine y={-3} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label={{ value: 'Berat', fontSize: 10 }} />
                    <Line type="monotone" dataKey="TB/U" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                    <Line type="monotone" dataKey="BB/U" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))' }} />
                    <Line type="monotone" dataKey="BB/TB" stroke="hsl(var(--secondary-foreground))" strokeWidth={2} dot={{ fill: 'hsl(var(--secondary-foreground))' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Physical Growth Chart */}
            <Card className="p-4 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">Pertumbuhan Fisik</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="usia" tick={{ fontSize: 12 }} label={{ value: 'Usia (bulan)', position: 'bottom', fontSize: 10 }} />
                    <YAxis yAxisId="height" orientation="left" tick={{ fontSize: 12 }} label={{ value: 'cm', angle: -90, position: 'insideLeft', fontSize: 10 }} />
                    <YAxis yAxisId="weight" orientation="right" tick={{ fontSize: 12 }} label={{ value: 'kg', angle: 90, position: 'insideRight', fontSize: 10 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Line yAxisId="height" type="monotone" dataKey="tinggi" name="Tinggi (cm)" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line yAxisId="weight" type="monotone" dataKey="berat" name="Berat (kg)" stroke="hsl(var(--accent))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Export Buttons */}
            <Card className="p-4 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <Download className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Ekspor Data</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={exportToPDF} variant="outline" className="w-full">
                  <FileText className="w-4 h-4 mr-2 text-red-500" />
                  Ekspor PDF
                </Button>
                <Button onClick={exportToExcel} variant="outline" className="w-full">
                  <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />
                  Ekspor Excel
                </Button>
              </div>
            </Card>

            {/* History List */}
            <Card className="p-4 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Riwayat Pemeriksaan</h3>
                <Button variant="ghost" size="sm" onClick={clearHistory} className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Hapus Semua
                </Button>
              </div>
              
              <div className="space-y-3">
                {records.slice().reverse().map((record) => (
                  <div key={record.id} className="bg-secondary/50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(record.date), 'dd MMMM yyyy', { locale: id })}
                      </div>
                      <span className={`text-xs font-medium ${getStatusColor(record.status)}`}>
                        {getStatusLabel(record.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-muted-foreground">Usia:</span>
                        <span className="font-medium">{record.ageMonths} bln</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Ruler className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium">{record.height} cm</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Scale className="w-3 h-3 text-muted-foreground" />
                        <span className="font-medium">{record.weight} kg</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex gap-3 text-xs">
                        <span>TB/U: <strong>{record.haz.toFixed(1)}</strong></span>
                        <span>BB/U: <strong>{record.waz.toFixed(1)}</strong></span>
                        <span>BB/TB: <strong>{record.whz.toFixed(1)}</strong></span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteRecord(record.id)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
