// WHO Child Growth Standards - LMS values for Z-score calculations
// Reference: WHO Multicentre Growth Reference Study Group (2006)

// Height-for-Age (HAZ) - Boys
export const hazBoys: Record<number, { L: number; M: number; S: number }> = {
  0: { L: 1, M: 49.9, S: 0.03795 },
  1: { L: 1, M: 54.7, S: 0.03557 },
  2: { L: 1, M: 58.4, S: 0.03424 },
  3: { L: 1, M: 61.4, S: 0.03328 },
  4: { L: 1, M: 63.9, S: 0.03257 },
  5: { L: 1, M: 65.9, S: 0.03204 },
  6: { L: 1, M: 67.6, S: 0.03165 },
  7: { L: 1, M: 69.2, S: 0.03139 },
  8: { L: 1, M: 70.6, S: 0.03124 },
  9: { L: 1, M: 72.0, S: 0.03117 },
  10: { L: 1, M: 73.3, S: 0.03118 },
  11: { L: 1, M: 74.5, S: 0.03125 },
  12: { L: 1, M: 75.7, S: 0.03137 },
  18: { L: 1, M: 82.3, S: 0.03204 },
  24: { L: 1, M: 87.1, S: 0.03280 },
  30: { L: 1, M: 91.9, S: 0.03320 },
  36: { L: 1, M: 96.1, S: 0.03340 },
  42: { L: 1, M: 99.9, S: 0.03350 },
  48: { L: 1, M: 103.3, S: 0.03360 },
  54: { L: 1, M: 106.7, S: 0.03370 },
  60: { L: 1, M: 110.0, S: 0.03380 },
};

// Height-for-Age (HAZ) - Girls
export const hazGirls: Record<number, { L: number; M: number; S: number }> = {
  0: { L: 1, M: 49.1, S: 0.03790 },
  1: { L: 1, M: 53.7, S: 0.03540 },
  2: { L: 1, M: 57.1, S: 0.03403 },
  3: { L: 1, M: 59.8, S: 0.03310 },
  4: { L: 1, M: 62.1, S: 0.03243 },
  5: { L: 1, M: 64.0, S: 0.03194 },
  6: { L: 1, M: 65.7, S: 0.03156 },
  7: { L: 1, M: 67.3, S: 0.03126 },
  8: { L: 1, M: 68.7, S: 0.03104 },
  9: { L: 1, M: 70.1, S: 0.03089 },
  10: { L: 1, M: 71.5, S: 0.03080 },
  11: { L: 1, M: 72.8, S: 0.03075 },
  12: { L: 1, M: 74.0, S: 0.03074 },
  18: { L: 1, M: 80.7, S: 0.03100 },
  24: { L: 1, M: 86.4, S: 0.03160 },
  30: { L: 1, M: 91.2, S: 0.03210 },
  36: { L: 1, M: 95.1, S: 0.03250 },
  42: { L: 1, M: 98.8, S: 0.03280 },
  48: { L: 1, M: 102.3, S: 0.03300 },
  54: { L: 1, M: 105.6, S: 0.03320 },
  60: { L: 1, M: 108.9, S: 0.03340 },
};

// Weight-for-Age (WAZ) - Boys
export const wazBoys: Record<number, { L: number; M: number; S: number }> = {
  0: { L: 0.3487, M: 3.3, S: 0.14602 },
  1: { L: 0.2297, M: 4.5, S: 0.13395 },
  2: { L: 0.1970, M: 5.6, S: 0.12385 },
  3: { L: 0.1738, M: 6.4, S: 0.11727 },
  4: { L: 0.1553, M: 7.0, S: 0.11316 },
  5: { L: 0.1395, M: 7.5, S: 0.11080 },
  6: { L: 0.1257, M: 7.9, S: 0.10958 },
  7: { L: 0.1134, M: 8.3, S: 0.10902 },
  8: { L: 0.1021, M: 8.6, S: 0.10882 },
  9: { L: 0.0917, M: 8.9, S: 0.10881 },
  10: { L: 0.0820, M: 9.2, S: 0.10891 },
  11: { L: 0.0730, M: 9.4, S: 0.10906 },
  12: { L: 0.0644, M: 9.6, S: 0.10925 },
  18: { L: 0.0212, M: 10.9, S: 0.11080 },
  24: { L: -0.0011, M: 12.2, S: 0.11200 },
  30: { L: -0.0168, M: 13.3, S: 0.11310 },
  36: { L: -0.0275, M: 14.3, S: 0.11410 },
  42: { L: -0.0345, M: 15.3, S: 0.11510 },
  48: { L: -0.0388, M: 16.3, S: 0.11600 },
  54: { L: -0.0412, M: 17.3, S: 0.11690 },
  60: { L: -0.0422, M: 18.3, S: 0.11770 },
};

// Weight-for-Age (WAZ) - Girls
export const wazGirls: Record<number, { L: number; M: number; S: number }> = {
  0: { L: 0.3809, M: 3.2, S: 0.14171 },
  1: { L: 0.1714, M: 4.2, S: 0.13724 },
  2: { L: 0.0962, M: 5.1, S: 0.13000 },
  3: { L: 0.0402, M: 5.8, S: 0.12619 },
  4: { L: -0.0050, M: 6.4, S: 0.12402 },
  5: { L: -0.0423, M: 6.9, S: 0.12274 },
  6: { L: -0.0739, M: 7.3, S: 0.12204 },
  7: { L: -0.1014, M: 7.6, S: 0.12178 },
  8: { L: -0.1258, M: 7.9, S: 0.12181 },
  9: { L: -0.1478, M: 8.2, S: 0.12199 },
  10: { L: -0.1679, M: 8.5, S: 0.12223 },
  11: { L: -0.1865, M: 8.7, S: 0.12247 },
  12: { L: -0.2039, M: 8.9, S: 0.12268 },
  18: { L: -0.2714, M: 10.2, S: 0.12450 },
  24: { L: -0.3096, M: 11.5, S: 0.12600 },
  30: { L: -0.3314, M: 12.7, S: 0.12750 },
  36: { L: -0.3421, M: 13.9, S: 0.12900 },
  42: { L: -0.3456, M: 15.0, S: 0.13050 },
  48: { L: -0.3442, M: 16.1, S: 0.13200 },
  54: { L: -0.3395, M: 17.2, S: 0.13350 },
  60: { L: -0.3325, M: 18.2, S: 0.13500 },
};

// Get closest available age in months
function getClosestAge(ageMonths: number, data: Record<number, { L: number; M: number; S: number }>): number {
  const ages = Object.keys(data).map(Number).sort((a, b) => a - b);
  let closest = ages[0];
  let minDiff = Math.abs(ageMonths - closest);
  
  for (const age of ages) {
    const diff = Math.abs(ageMonths - age);
    if (diff < minDiff) {
      minDiff = diff;
      closest = age;
    }
  }
  return closest;
}

// Calculate Z-score using LMS method
function calculateZScore(value: number, L: number, M: number, S: number): number {
  if (L === 0) {
    return Math.log(value / M) / S;
  }
  return (Math.pow(value / M, L) - 1) / (L * S);
}

export function calculateHAZ(ageMonths: number, height: number, gender: 'male' | 'female'): number {
  const data = gender === 'male' ? hazBoys : hazGirls;
  const closestAge = getClosestAge(ageMonths, data);
  const { L, M, S } = data[closestAge];
  return calculateZScore(height, L, M, S);
}

export function calculateWAZ(ageMonths: number, weight: number, gender: 'male' | 'female'): number {
  const data = gender === 'male' ? wazBoys : wazGirls;
  const closestAge = getClosestAge(ageMonths, data);
  const { L, M, S } = data[closestAge];
  return calculateZScore(weight, L, M, S);
}

// Simple WHZ calculation using weight/height ratio
export function calculateWHZ(height: number, weight: number, gender: 'male' | 'female'): number {
  // Simplified calculation based on expected weight for height
  const expectedWeight = gender === 'male' 
    ? 0.0001 * Math.pow(height, 2.5)
    : 0.00009 * Math.pow(height, 2.5);
  
  const ratio = weight / expectedWeight;
  return (ratio - 1) * 3; // Approximate Z-score
}

export function getStuntingStatus(haz: number): {
  status: string;
  severity: 'normal' | 'at-risk' | 'stunted' | 'severely-stunted';
  color: 'low' | 'moderate' | 'high';
} {
  if (haz >= -1) {
    return { status: 'Normal', severity: 'normal', color: 'low' };
  } else if (haz >= -2) {
    return { status: 'At Risk of Stunting', severity: 'at-risk', color: 'moderate' };
  } else if (haz >= -3) {
    return { status: 'Stunted', severity: 'stunted', color: 'high' };
  } else {
    return { status: 'Severely Stunted', severity: 'severely-stunted', color: 'high' };
  }
}

export function getIdealWeightRange(ageMonths: number, gender: 'male' | 'female'): {
  min: number;
  max: number;
  median: number;
} {
  const data = gender === 'male' ? wazBoys : wazGirls;
  const closestAge = getClosestAge(ageMonths, data);
  const { M, S } = data[closestAge];
  
  // -2 SD to +2 SD range
  const min = M * Math.exp(-2 * S);
  const max = M * Math.exp(2 * S);
  
  return { min: Math.round(min * 10) / 10, max: Math.round(max * 10) / 10, median: M };
}

export function getWeightStatus(weight: number, ageMonths: number, gender: 'male' | 'female'): {
  status: string;
  color: 'low' | 'moderate' | 'high';
} {
  const range = getIdealWeightRange(ageMonths, gender);
  
  if (weight < range.min) {
    return { status: 'Below Ideal', color: 'high' };
  } else if (weight > range.max) {
    return { status: 'Above Ideal', color: 'moderate' };
  } else {
    return { status: 'Normal', color: 'low' };
  }
}
