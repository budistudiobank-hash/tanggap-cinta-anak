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
    factors.push('Usia ibu di bawah 18 tahun (risiko tinggi)');
    recommendations.push('Usia ibu muda meningkatkan risiko stunting. Pastikan dukungan nutrisi ekstra dan pemeriksaan medis rutin.');
  } else if (data.motherAge < 20) {
    score += 2;
    factors.push('Usia ibu di bawah 20 tahun');
    recommendations.push('Pertimbangkan konseling nutrisi tambahan untuk ibu muda.');
  } else if (data.motherAge > 35) {
    score += 1;
    factors.push('Usia ibu di atas 35 tahun');
    recommendations.push('Usia ibu lanjut memerlukan pemantauan lebih ketat. Pastikan pemeriksaan rutin.');
  }

  // Height assessment (risk if under 150cm)
  if (data.motherHeight < 145) {
    score += 3;
    factors.push('Tinggi badan ibu di bawah 145 cm (risiko tinggi)');
    recommendations.push('Tinggi badan ibu yang pendek dikaitkan dengan risiko stunting lebih tinggi. Fokus pada nutrisi kaya protein dan pantau pertumbuhan janin dengan ketat.');
  } else if (data.motherHeight < 150) {
    score += 2;
    factors.push('Tinggi badan ibu di bawah 150 cm');
    recommendations.push('Pastikan asupan kalsium dan protein yang cukup untuk perkembangan tulang janin yang optimal.');
  }

  // BMI assessment
  if (bmiPrePregnancy < 18.5) {
    score += 3;
    factors.push('IMT sebelum hamil menunjukkan berat badan kurang');
    recommendations.push('Fokus pada makanan padat kalori dan bergizi. Targetkan kenaikan berat badan yang seimbang selama kehamilan.');
  } else if (bmiPrePregnancy >= 30) {
    score += 1;
    factors.push('IMT sebelum hamil menunjukkan obesitas');
    recommendations.push('Pantau kenaikan berat badan dengan hati-hati. Fokus pada makanan bergizi daripada kuantitas.');
  }

  // Weight gain assessment
  if (actualWeightGain < expectedWeightGain * 0.5) {
    score += 2;
    factors.push('Kenaikan berat badan jauh di bawah yang diharapkan');
    recommendations.push('Tingkatkan asupan kalori dengan makanan bergizi. Pertimbangkan menambah camilan sehat di antara waktu makan.');
  } else if (actualWeightGain < expectedWeightGain * 0.75) {
    score += 1;
    factors.push('Kenaikan berat badan sedikit di bawah yang diharapkan');
    recommendations.push('Pastikan Anda makan cukup kalori. Tambahkan makanan kaya protein ke dalam diet Anda.');
  }

  // Iron/Folic acid intake
  if (!data.ironFolicIntake) {
    score += 2;
    factors.push('Tidak mengonsumsi suplemen zat besi/asam folat');
    recommendations.push('Mulai mengonsumsi suplemen zat besi dan asam folat sesuai anjuran tenaga kesehatan. Ini penting untuk mencegah anemia dan mendukung perkembangan janin.');
  }

  // ANC visits assessment
  const expectedAncVisits = Math.floor(data.pregnancyWeeks / 4);
  if (data.ancVisits < expectedAncVisits * 0.5) {
    score += 3;
    factors.push('Kunjungan pemeriksaan kehamilan (ANC) jauh di bawah yang dianjurkan');
    recommendations.push('Segera jadwalkan pemeriksaan kehamilan rutin. Kunjungan ANC sangat penting untuk memantau kesehatan Anda dan perkembangan bayi.');
  } else if (data.ancVisits < expectedAncVisits) {
    score += 1;
    factors.push('Kunjungan pemeriksaan kehamilan di bawah yang dianjurkan');
    recommendations.push('Usahakan menghadiri semua jadwal pemeriksaan kehamilan untuk pemantauan optimal.');
  }

  // Determine risk level
  let level: 'low' | 'moderate' | 'high';
  if (score <= 2) {
    level = 'low';
    recommendations.unshift('Lanjutkan praktik sehat Anda saat ini. Pertahankan pemeriksaan rutin dan nutrisi seimbang.');
  } else if (score <= 5) {
    level = 'moderate';
    recommendations.unshift('Ada beberapa faktor risiko yang perlu diperhatikan. Ikuti rekomendasi di bawah dan konsultasikan dengan tenaga kesehatan.');
  } else {
    level = 'high';
    recommendations.unshift('Segera konsultasikan dengan tenaga kesehatan profesional. Beberapa faktor risiko memerlukan perhatian segera.');
  }

  // Add general recommendations
  recommendations.push('Makan berbagai jenis makanan termasuk sayuran, buah-buahan, protein, dan biji-bijian utuh.');
  recommendations.push('Tetap terhidrasi dengan minum minimal 8 gelas air setiap hari.');
  recommendations.push('Istirahat yang cukup dan hindari aktivitas berat.');

  return { level, score, factors, recommendations };
}
