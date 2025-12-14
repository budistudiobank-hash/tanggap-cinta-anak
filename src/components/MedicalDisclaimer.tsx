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
          This app is for educational purposes only and does not replace professional medical advice.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-secondary/50 border border-border rounded-lg p-4 space-y-2">
      <div className="flex items-center gap-2 text-accent">
        <AlertTriangle className="w-5 h-5" />
        <h4 className="font-semibold text-sm">Medical Disclaimer</h4>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        This application is for <strong>educational and early detection purposes only</strong>. 
        It does not replace professional medical diagnosis or treatment. Always consult a 
        qualified healthcare provider for medical advice, diagnosis, and treatment. 
        The calculations and recommendations provided are based on WHO guidelines and are 
        meant to support, not replace, professional healthcare.
      </p>
    </div>
  );
}
