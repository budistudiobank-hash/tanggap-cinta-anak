import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';
import { FormField } from '@/components/FormField';
import { RiskIndicator } from '@/components/RiskIndicator';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { assessPregnancyRisk, type PregnancyData, type RiskAssessment } from '@/lib/pregnancy-risk';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function PregnancyDetection() {
  const [formData, setFormData] = useState<PregnancyData>({
    motherAge: 0,
    pregnancyWeeks: 0,
    motherHeight: 0,
    prePregnancyWeight: 0,
    currentWeight: 0,
    ironFolicIntake: false,
    ancVisits: 0,
  });

  const [result, setResult] = useState<RiskAssessment | null>(null);

  const handleChange = (name: keyof PregnancyData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: typeof value === 'boolean' ? value : parseFloat(value) || 0,
    }));
    setResult(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assessment = assessPregnancyRisk(formData);
    setResult(assessment);
  };

  const isFormValid = 
    formData.motherAge > 0 &&
    formData.pregnancyWeeks > 0 &&
    formData.motherHeight > 0 &&
    formData.prePregnancyWeight > 0 &&
    formData.currentWeight > 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title="Pregnancy Stunting Detection" 
        subtitle="Assess risk before birth"
      />

      <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
        <MedicalDisclaimer compact />

        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="p-4 space-y-4 shadow-card">
            <h3 className="font-semibold text-foreground">Mother's Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Age"
                name="motherAge"
                type="number"
                placeholder="25"
                value={formData.motherAge || ''}
                onChange={(v) => handleChange('motherAge', v)}
                unit="years"
                min={10}
                max={60}
                required
              />
              <FormField
                label="Pregnancy Age"
                name="pregnancyWeeks"
                type="number"
                placeholder="20"
                value={formData.pregnancyWeeks || ''}
                onChange={(v) => handleChange('pregnancyWeeks', v)}
                unit="weeks"
                min={1}
                max={42}
                required
              />
            </div>

            <FormField
              label="Height"
              name="motherHeight"
              type="number"
              placeholder="155"
              value={formData.motherHeight || ''}
              onChange={(v) => handleChange('motherHeight', v)}
              unit="cm"
              min={100}
              max={200}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Pre-pregnancy Weight"
                name="prePregnancyWeight"
                type="number"
                placeholder="50"
                value={formData.prePregnancyWeight || ''}
                onChange={(v) => handleChange('prePregnancyWeight', v)}
                unit="kg"
                min={30}
                max={150}
                required
              />
              <FormField
                label="Current Weight"
                name="currentWeight"
                type="number"
                placeholder="55"
                value={formData.currentWeight || ''}
                onChange={(v) => handleChange('currentWeight', v)}
                unit="kg"
                min={30}
                max={200}
                required
              />
            </div>
          </Card>

          <Card className="p-4 space-y-4 shadow-card">
            <h3 className="font-semibold text-foreground">Health Checkups</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="ironFolicIntake" className="text-sm cursor-pointer flex-1">
                Taking Iron/Folic Acid Supplements?
              </Label>
              <Switch
                id="ironFolicIntake"
                checked={formData.ironFolicIntake}
                onCheckedChange={(checked) => handleChange('ironFolicIntake', checked)}
              />
            </div>

            <FormField
              label="Antenatal Care (ANC) Visits"
              name="ancVisits"
              type="number"
              placeholder="4"
              value={formData.ancVisits || ''}
              onChange={(v) => handleChange('ancVisits', v)}
              unit="visits"
              min={0}
              max={20}
              required
            />
          </Card>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={!isFormValid}
          >
            Assess Risk
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {result && (
          <Card className="p-5 space-y-5 shadow-card animate-slide-up">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-foreground">Assessment Result</h3>
              <RiskIndicator 
                level={result.level} 
                label={result.level === 'low' ? 'Low Risk' : result.level === 'moderate' ? 'Moderate Risk' : 'High Risk'} 
              />
            </div>

            {result.factors.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-risk-moderate" />
                  Risk Factors Identified
                </h4>
                <ul className="space-y-1.5">
                  {result.factors.map((factor, index) => (
                    <li key={index} className="text-sm text-muted-foreground pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-muted-foreground">
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-risk-low" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
