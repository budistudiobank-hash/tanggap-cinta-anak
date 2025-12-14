import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { FormField } from '@/components/FormField';
import { RiskIndicator } from '@/components/RiskIndicator';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { getIdealWeightRange, getWeightStatus } from '@/lib/who-standards';
import { ArrowRight, Scale, TrendingUp, TrendingDown, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WeightData {
  ageMonths: number;
  gender: 'male' | 'female';
  currentWeight: number;
}

interface WeightResult {
  range: ReturnType<typeof getIdealWeightRange>;
  status: ReturnType<typeof getWeightStatus>;
}

export default function IdealWeight() {
  const [formData, setFormData] = useState<WeightData>({
    ageMonths: 0,
    gender: 'male',
    currentWeight: 0,
  });

  const [result, setResult] = useState<WeightResult | null>(null);

  const handleChange = (name: keyof WeightData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'gender' ? value : parseFloat(value) || 0,
    }));
    setResult(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const range = getIdealWeightRange(formData.ageMonths, formData.gender);
    const status = getWeightStatus(formData.currentWeight, formData.ageMonths, formData.gender);

    setResult({ range, status });
  };

  const isFormValid = 
    formData.ageMonths > 0 &&
    formData.currentWeight > 0;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'Normal';
      case 'Below Ideal':
        return 'Di Bawah Ideal';
      case 'Above Ideal':
        return 'Di Atas Ideal';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title="Berat Ideal Bayi" 
        subtitle="Cek berat badan ideal anak Anda"
      />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <MedicalDisclaimer compact />

        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="p-4 space-y-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Masukkan Data Anak</h3>
            </div>
            
            <FormField
              label="Usia"
              name="ageMonths"
              type="number"
              placeholder="12"
              value={formData.ageMonths || ''}
              onChange={(v) => handleChange('ageMonths', v)}
              unit="bulan"
              min={0}
              max={60}
              required
            />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Jenis Kelamin</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(v) => handleChange('gender', v)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male-weight" />
                  <Label htmlFor="male-weight" className="cursor-pointer">Laki-laki</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female-weight" />
                  <Label htmlFor="female-weight" className="cursor-pointer">Perempuan</Label>
                </div>
              </RadioGroup>
            </div>

            <FormField
              label="Berat Badan Saat Ini"
              name="currentWeight"
              type="number"
              placeholder="9.5"
              value={formData.currentWeight || ''}
              onChange={(v) => handleChange('currentWeight', v)}
              unit="kg"
              min={1}
              max={50}
              step={0.1}
              required
            />
          </Card>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={!isFormValid}
          >
            Cek Status Berat Badan
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {result && (
          <Card className="p-5 space-y-5 shadow-card animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-foreground">Penilaian Berat Badan</h3>
              <RiskIndicator 
                level={result.status.color} 
                label={getStatusLabel(result.status.status)} 
              />
            </div>

            {/* Weight Range Visual */}
            <div className="bg-secondary/50 rounded-xl p-4 space-y-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Rentang Berat Ideal</div>
                <div className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground">
                  <span>{result.range.min}</span>
                  <span className="text-muted-foreground">–</span>
                  <span>{result.range.max}</span>
                  <span className="text-sm font-normal text-muted-foreground">kg</span>
                </div>
              </div>

              {/* Visual bar */}
              <div className="relative pt-6 pb-2">
                <div className="h-3 bg-gradient-to-r from-risk-high via-risk-low to-risk-moderate rounded-full" />
                
                {/* Markers */}
                <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                  <span>{result.range.min} kg</span>
                  <span>{result.range.median} kg</span>
                  <span>{result.range.max} kg</span>
                </div>

                {/* Current weight indicator */}
                {(() => {
                  const percentage = Math.min(
                    100,
                    Math.max(
                      0,
                      ((formData.currentWeight - result.range.min) / (result.range.max - result.range.min)) * 100
                    )
                  );
                  return (
                    <div
                      className="absolute top-4 -translate-x-1/2"
                      style={{ left: `${percentage}%` }}
                    >
                      <div className="w-4 h-4 bg-foreground rounded-full border-2 border-background shadow-lg" />
                    </div>
                  );
                })()}
              </div>

              <div className="text-center">
                <div className="text-sm text-muted-foreground">Berat Saat Ini</div>
                <div className="text-xl font-bold text-foreground">{formData.currentWeight} kg</div>
              </div>
            </div>

            {/* Status Message */}
            <div className="space-y-3">
              {result.status.status === 'Normal' && (
                <p className="text-sm text-muted-foreground bg-risk-low/10 p-3 rounded-lg flex items-start gap-2">
                  <Check className="w-4 h-4 text-risk-low flex-shrink-0 mt-0.5" />
                  Berat badan anak Anda berada dalam rentang sehat. Lanjutkan dengan nutrisi seimbang dan pemantauan rutin.
                </p>
              )}

              {result.status.status === 'Below Ideal' && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground bg-risk-high/10 p-3 rounded-lg flex items-start gap-2">
                    <TrendingDown className="w-4 h-4 text-risk-high flex-shrink-0 mt-0.5" />
                    Berat badan anak Anda di bawah rentang ideal. Pertimbangkan untuk meningkatkan nutrisi dengan makanan padat kalori dan bergizi.
                  </p>
                  <Link to="/nutrition">
                    <Button variant="accent" size="sm" className="w-full">
                      Lihat Rekomendasi Gizi
                    </Button>
                  </Link>
                </div>
              )}

              {result.status.status === 'Above Ideal' && (
                <p className="text-sm text-muted-foreground bg-risk-moderate/10 p-3 rounded-lg flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-risk-moderate flex-shrink-0 mt-0.5" />
                  Berat badan anak Anda di atas rentang ideal. Fokus pada nutrisi seimbang dan konsultasikan dengan tenaga kesehatan jika diperlukan.
                </p>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
