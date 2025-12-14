import { AlertTriangle } from 'lucide-react';

interface MedicalDisclaimerProps {
  compact?: boolean;
}

export function MedicalDisclaimer({ compact = false }: MedicalDisclaimerProps) {
  if (compact) {
    return (
      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
        <p>
          Aplikasi ini hanya untuk tujuan edukasi dan tidak menggantikan saran medis profesional.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2 text-accent">
        <AlertTriangle className="w-5 h-5" />
        <h4 className="font-semibold text-sm">Disclaimer Medis</h4>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Aplikasi ini hanya untuk <strong>tujuan edukasi dan deteksi dini</strong>. 
        Tidak menggantikan diagnosis atau pengobatan medis profesional. Selalu konsultasikan 
        dengan tenaga kesehatan yang berkualifikasi untuk saran, diagnosis, dan pengobatan medis. 
        Perhitungan dan rekomendasi yang diberikan berdasarkan panduan WHO dan dimaksudkan 
        untuk mendukung, bukan menggantikan, layanan kesehatan profesional.
      </p>
    </div>
  );
}
