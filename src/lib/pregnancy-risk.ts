// Pregnancy stunting risk assessment based on WHO and Indonesian Ministry of Health guidelines

export interface PregnancyData {
  motherAge: number;
  pregnancyWeeks: number;
  motherHeight: number;
  prePregnancyWeight: number;
  currentWeight: number;
  ironFolicIntake: boolean;
  ancVisits: number;
}

export interface RiskAssessment {
  level: 'low' | 'moderate' | 'high';
  score: number;
  factors: string[];
  recommendations: string[];
}

export function assessPregnancyRisk(data: PregnancyData): RiskAssessment {
  let score = 0;
  const factors: string[] = [];
  const recommendations: string[] = [];

  // Calculate BMI before pregnancy
  const bmiPrePregnancy = data.prePregnancyWeight / Math.pow(data.motherHeight / 100, 2);
  
  // Calculate expected weight gain based on pregnancy week
  const expectedWeightGain = data.pregnancyWeeks <= 12 
    ? 0.5 * (data.pregnancyWeeks / 12)
    : 0.5 + (data.pregnancyWeeks - 12) * 0.4;
  
  const actualWeightGain = data.currentWeight - data.prePregnancyWeight;

  // Age assessment (optimal: 20-35 years)
  if (data.motherAge < 18) {
    score += 3;
    factors.push('Mother is under 18 years old (high risk)');
    recommendations.push('Young maternal age increases stunting risk. Ensure extra nutritional support and regular medical checkups.');
  } else if (data.motherAge < 20) {
    score += 2;
    factors.push('Mother is under 20 years old');
    recommendations.push('Consider additional nutritional counseling for young mothers.');
  } else if (data.motherAge > 35) {
    score += 1;
    factors.push('Mother is over 35 years old');
    recommendations.push('Advanced maternal age requires closer monitoring. Ensure regular checkups.');
  }

  // Height assessment (risk if under 150cm)
  if (data.motherHeight < 145) {
    score += 3;
    factors.push('Mother\'s height is below 145 cm (high risk)');
    recommendations.push('Short maternal stature is associated with higher stunting risk. Focus on protein-rich nutrition and monitor fetal growth closely.');
  } else if (data.motherHeight < 150) {
    score += 2;
    factors.push('Mother\'s height is below 150 cm');
    recommendations.push('Ensure adequate calcium and protein intake for optimal fetal bone development.');
  }

  // BMI assessment
  if (bmiPrePregnancy < 18.5) {
    score += 3;
    factors.push('Pre-pregnancy BMI indicates underweight');
    recommendations.push('Focus on calorie-dense, nutritious foods. Aim for balanced weight gain during pregnancy.');
  } else if (bmiPrePregnancy >= 30) {
    score += 1;
    factors.push('Pre-pregnancy BMI indicates obesity');
    recommendations.push('Monitor weight gain carefully. Focus on nutritious foods rather than quantity.');
  }

  // Weight gain assessment
  if (actualWeightGain < expectedWeightGain * 0.5) {
    score += 2;
    factors.push('Weight gain is significantly below expected');
    recommendations.push('Increase caloric intake with nutritious foods. Consider adding healthy snacks between meals.');
  } else if (actualWeightGain < expectedWeightGain * 0.75) {
    score += 1;
    factors.push('Weight gain is slightly below expected');
    recommendations.push('Ensure you\'re eating enough calories. Add protein-rich foods to your diet.');
  }

  // Iron/Folic acid intake
  if (!data.ironFolicIntake) {
    score += 2;
    factors.push('Not taking iron/folic acid supplements');
    recommendations.push('Start taking iron and folic acid supplements as recommended by your healthcare provider. These are essential for preventing anemia and supporting fetal development.');
  }

  // ANC visits assessment
  const expectedAncVisits = Math.floor(data.pregnancyWeeks / 4);
  if (data.ancVisits < expectedAncVisits * 0.5) {
    score += 3;
    factors.push('Antenatal care visits are significantly below recommended');
    recommendations.push('Schedule regular prenatal checkups immediately. ANC visits are crucial for monitoring your health and baby\'s development.');
  } else if (data.ancVisits < expectedAncVisits) {
    score += 1;
    factors.push('Antenatal care visits are below recommended');
    recommendations.push('Try to attend all scheduled prenatal appointments for optimal monitoring.');
  }

  // Determine risk level
  let level: 'low' | 'moderate' | 'high';
  if (score <= 2) {
    level = 'low';
    recommendations.unshift('Continue with your current healthy practices. Maintain regular checkups and balanced nutrition.');
  } else if (score <= 5) {
    level = 'moderate';
    recommendations.unshift('There are some risk factors that need attention. Follow the recommendations below and consult your healthcare provider.');
  } else {
    level = 'high';
    recommendations.unshift('Please consult a healthcare professional as soon as possible. Several risk factors need immediate attention.');
  }

  // Add general recommendations
  recommendations.push('Eat a variety of foods including vegetables, fruits, protein, and whole grains.');
  recommendations.push('Stay hydrated by drinking at least 8 glasses of water daily.');
  recommendations.push('Get adequate rest and avoid strenuous activities.');

  return { level, score, factors, recommendations };
}
