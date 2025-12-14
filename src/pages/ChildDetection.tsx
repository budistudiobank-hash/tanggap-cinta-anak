import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { FormField } from '@/components/FormField';
import { RiskIndicator } from '@/components/RiskIndicator';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { calculateHAZ, calculateWAZ, calculateWHZ, getStuntingStatus } from '@/lib/who-standards';
import { ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChildData {
  ageMonths: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
}

interface DetectionResult {
  haz: number;
  waz: number;
  whz: number;
  status: ReturnType<typeof getStuntingStatus>;
}

export default function ChildDetection() {
  const [formData, setFormData] = useState<ChildData>({
    ageMonths: 0,
    gender: 'male',
    height: 0,
    weight: 0,
  });

  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleChange = (name: keyof ChildData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'gender' ? value : parseFloat(value) || 0,
    }));
    setResult(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const haz = calculateHAZ(formData.ageMonths, formData.height, formData.gender);
    const waz = calculateWAZ(formData.ageMonths, formData.weight, formData.gender);
    const whz = calculateWHZ(formData.height, formData.weight, formData.gender);
    const status = getStuntingStatus(haz);

    setResult({ haz, waz, whz, status });
  };

  const isFormValid = 
    formData.ageMonths > 0 &&
    formData.height > 0 &&
    formData.weight > 0;

  const getZScoreIcon = (zscore: number) => {
    if (zscore >= 0) return TrendingUp;
    if (zscore >= -2) return Minus;
    return TrendingDown;
  };

  const getZScoreColor = (zscore: number) => {
    if (zscore >= -1) return 'text-risk-low';
    if (zscore >= -2) return 'text-risk-moderate';
    return 'text-risk-high';
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title="Child Stunting Detection" 
        subtitle="For children aged 0-5 years"
      />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <MedicalDisclaimer compact />

        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="p-4 space-y-4 shadow-card">
            <h3 className="font-semibold text-foreground">Child's Information</h3>
            
            <FormField
              label="Age"
              name="ageMonths"
              type="number"
              placeholder="12"
              value={formData.ageMonths || ''}
              onChange={(v) => handleChange('ageMonths', v)}
              unit="months"
              min={0}
              max={60}
              required
            />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(v) => handleChange('gender', v)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="cursor-pointer">Female</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Height"
                name="height"
                type="number"
                placeholder="75"
                value={formData.height || ''}
                onChange={(v) => handleChange('height', v)}
                unit="cm"
                min={40}
                max={150}
                step={0.1}
                required
              />
              <FormField
                label="Weight"
                name="weight"
                type="number"
                placeholder="9.5"
                value={formData.weight || ''}
                onChange={(v) => handleChange('weight', v)}
                unit="kg"
                min={1}
                max={50}
                step={0.1}
                required
              />
            </div>
          </Card>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={!isFormValid}
          >
            Check Growth Status
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {result && (
          <Card className="p-5 space-y-5 shadow-card animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-foreground">Growth Assessment</h3>
              <RiskIndicator 
                level={result.status.color} 
                label={result.status.status} 
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Height-for-Age', value: result.haz, abbr: 'HAZ' },
                { label: 'Weight-for-Age', value: result.waz, abbr: 'WAZ' },
                { label: 'Weight-for-Height', value: result.whz, abbr: 'WHZ' },
              ].map(({ label, value, abbr }) => {
                const Icon = getZScoreIcon(value);
                const colorClass = getZScoreColor(value);
                return (
                  <div key={abbr} className="bg-secondary/50 rounded-lg p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">{abbr}</div>
                    <div className={`flex items-center justify-center gap-1 ${colorClass}`}>
                      <Icon className="w-4 h-4" />
                      <span className="font-bold">{value.toFixed(1)}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1">{label}</div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-semibold text-foreground">What This Means</h4>
              
              {result.status.severity === 'normal' && (
                <p className="text-sm text-muted-foreground bg-risk-low/10 p-3 rounded-lg">
                  Your child's growth is within the normal range according to WHO standards. 
                  Continue with regular checkups and balanced nutrition.
                </p>
              )}

              {result.status.severity === 'at-risk' && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground bg-risk-moderate/10 p-3 rounded-lg">
                    Your child's height is slightly below expected for their age. This is an 
                    early warning sign that needs attention.
                  </p>
                  <Link to="/nutrition">
                    <Button variant="accent" size="sm" className="w-full">
                      View Nutrition Recommendations
                    </Button>
                  </Link>
                </div>
              )}

              {(result.status.severity === 'stunted' || result.status.severity === 'severely-stunted') && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground bg-risk-high/10 p-3 rounded-lg">
                    Your child's growth indicates stunting. Please consult a healthcare 
                    professional for proper evaluation and treatment plan.
                  </p>
                  <Link to="/nutrition?tab=doctor">
                    <Button variant="destructive" size="sm" className="w-full">
                      Find Healthcare Provider
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
