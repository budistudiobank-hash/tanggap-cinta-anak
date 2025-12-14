export interface FoodItem {
  name: string;
  benefits: string;
  portion: string;
  preparation: string;
  category: 'protein' | 'iron' | 'budget';
}

export interface AgeGroup {
  id: string;
  label: string;
  description: string;
  foods: FoodItem[];
}

export const nutritionData: AgeGroup[] = [
  {
    id: '0-6',
    label: '0-6 Months',
    description: 'Exclusive breastfeeding is recommended',
    foods: [
      {
        name: 'Breast Milk',
        benefits: 'Complete nutrition, antibodies, perfect for baby\'s development',
        portion: 'On demand, 8-12 times per day',
        preparation: 'Feed directly or express and store properly',
        category: 'protein',
      },
      {
        name: 'Formula Milk (if needed)',
        benefits: 'Alternative when breastfeeding is not possible',
        portion: 'Follow package instructions based on weight',
        preparation: 'Use boiled water cooled to 70°C, measure accurately',
        category: 'protein',
      },
    ],
  },
  {
    id: '6-12',
    label: '6-12 Months',
    description: 'Introduction to complementary foods',
    foods: [
      {
        name: 'Rice Porridge (Bubur)',
        benefits: 'Easy to digest, good energy source',
        portion: '2-3 tablespoons, increasing gradually',
        preparation: 'Cook rice until very soft, blend if needed',
        category: 'budget',
      },
      {
        name: 'Mashed Banana',
        benefits: 'Rich in potassium, natural sweetness, easy to digest',
        portion: 'Half a small banana',
        preparation: 'Choose ripe banana, mash with fork until smooth',
        category: 'budget',
      },
      {
        name: 'Pureed Chicken Liver',
        benefits: 'Excellent iron source, supports brain development',
        portion: '1-2 tablespoons',
        preparation: 'Boil until cooked, blend with a little water',
        category: 'iron',
      },
      {
        name: 'Steamed Egg Yolk',
        benefits: 'High in protein, iron, and vitamins',
        portion: 'Half an egg yolk',
        preparation: 'Steam or boil, mash with milk or water',
        category: 'protein',
      },
      {
        name: 'Tofu (Tahu)',
        benefits: 'Affordable protein, easy to digest',
        portion: '2-3 tablespoons mashed',
        preparation: 'Steam and mash, mix with porridge',
        category: 'budget',
      },
      {
        name: 'Spinach Puree (Bayam)',
        benefits: 'High in iron and vitamins',
        portion: '1-2 tablespoons',
        preparation: 'Steam leaves, blend until smooth',
        category: 'iron',
      },
    ],
  },
  {
    id: '1-3',
    label: '1-3 Years',
    description: 'Family foods with modified texture',
    foods: [
      {
        name: 'Fish (Ikan)',
        benefits: 'High-quality protein, omega-3 for brain',
        portion: '30-40g per meal',
        preparation: 'Steam or grill, remove all bones carefully',
        category: 'protein',
      },
      {
        name: 'Tempe',
        benefits: 'Fermented soy, probiotics, affordable protein',
        portion: '2-3 thin slices',
        preparation: 'Steam, fry lightly, or add to soup',
        category: 'budget',
      },
      {
        name: 'Chicken (Ayam)',
        benefits: 'Lean protein, supports muscle growth',
        portion: '30-40g per meal',
        preparation: 'Shred or cut into small pieces, cook until soft',
        category: 'protein',
      },
      {
        name: 'Red Beans (Kacang Merah)',
        benefits: 'Plant protein, iron, fiber',
        portion: '2-3 tablespoons cooked',
        preparation: 'Soak overnight, boil until very soft',
        category: 'iron',
      },
      {
        name: 'Sweet Potato (Ubi)',
        benefits: 'Vitamin A, energy, affordable',
        portion: '50-75g',
        preparation: 'Steam or boil, mash or cut into pieces',
        category: 'budget',
      },
      {
        name: 'Beef (Daging Sapi)',
        benefits: 'High iron content, complete protein',
        portion: '20-30g per meal',
        preparation: 'Cook until very tender, cut small or shred',
        category: 'iron',
      },
    ],
  },
  {
    id: '3-5',
    label: '3-5 Years',
    description: 'Regular family meals with all food groups',
    foods: [
      {
        name: 'Eggs (Telur)',
        benefits: 'Complete protein, choline for brain',
        portion: '1 egg per day',
        preparation: 'Boiled, scrambled, or in omelets with vegetables',
        category: 'protein',
      },
      {
        name: 'Moringa Leaves (Daun Kelor)',
        benefits: 'Super nutritious, high iron and calcium',
        portion: 'Small handful, 2-3 times per week',
        preparation: 'Add to soup, stir-fry, or mix in rice',
        category: 'iron',
      },
      {
        name: 'Anchovies (Teri)',
        benefits: 'Calcium, protein, affordable',
        portion: '1-2 tablespoons',
        preparation: 'Dry fry for crispy snack or add to sambal',
        category: 'budget',
      },
      {
        name: 'Chicken Liver',
        benefits: 'Highest iron content, vitamin A',
        portion: '30-40g, 2 times per week',
        preparation: 'Sauté with onion and soy sauce',
        category: 'iron',
      },
      {
        name: 'Peanuts (Kacang Tanah)',
        benefits: 'Protein, healthy fats, energy',
        portion: 'Small handful (supervision needed)',
        preparation: 'Roasted or in peanut sauce',
        category: 'budget',
      },
      {
        name: 'Milk and Dairy',
        benefits: 'Calcium for bones, protein',
        portion: '2 glasses per day',
        preparation: 'Fresh milk, yogurt, or cheese',
        category: 'protein',
      },
    ],
  },
];

export const getCategoryColor = (category: FoodItem['category']) => {
  switch (category) {
    case 'protein':
      return 'bg-primary/10 text-primary';
    case 'iron':
      return 'bg-risk-high/10 text-risk-high';
    case 'budget':
      return 'bg-risk-low/10 text-risk-low';
  }
};

export const getCategoryLabel = (category: FoodItem['category']) => {
  switch (category) {
    case 'protein':
      return 'High Protein';
    case 'iron':
      return 'Iron Rich';
    case 'budget':
      return 'Budget Friendly';
  }
};
