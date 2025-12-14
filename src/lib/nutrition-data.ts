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
    label: '0-6 Bulan',
    description: 'ASI eksklusif sangat dianjurkan',
    foods: [
      {
        name: 'ASI (Air Susu Ibu)',
        benefits: 'Nutrisi lengkap, antibodi, sempurna untuk perkembangan bayi',
        portion: 'Sesuai permintaan, 8-12 kali per hari',
        preparation: 'Susui langsung atau perah dan simpan dengan benar',
        category: 'protein',
      },
      {
        name: 'Susu Formula (jika diperlukan)',
        benefits: 'Alternatif ketika ASI tidak memungkinkan',
        portion: 'Ikuti petunjuk kemasan berdasarkan berat badan',
        preparation: 'Gunakan air matang yang sudah didinginkan hingga 70°C, ukur dengan akurat',
        category: 'protein',
      },
    ],
  },
  {
    id: '6-12',
    label: '6-12 Bulan',
    description: 'Pengenalan makanan pendamping ASI (MPASI)',
    foods: [
      {
        name: 'Bubur Nasi',
        benefits: 'Mudah dicerna, sumber energi yang baik',
        portion: '2-3 sendok makan, tingkatkan secara bertahap',
        preparation: 'Masak nasi hingga sangat lunak, blender jika perlu',
        category: 'budget',
      },
      {
        name: 'Pisang Lumat',
        benefits: 'Kaya kalium, manis alami, mudah dicerna',
        portion: 'Setengah pisang kecil',
        preparation: 'Pilih pisang matang, lumatkan dengan garpu hingga halus',
        category: 'budget',
      },
      {
        name: 'Hati Ayam Haluskan',
        benefits: 'Sumber zat besi yang sangat baik, mendukung perkembangan otak',
        portion: '1-2 sendok makan',
        preparation: 'Rebus hingga matang, blender dengan sedikit air',
        category: 'iron',
      },
      {
        name: 'Kuning Telur Kukus',
        benefits: 'Tinggi protein, zat besi, dan vitamin',
        portion: 'Setengah kuning telur',
        preparation: 'Kukus atau rebus, lumatkan dengan susu atau air',
        category: 'protein',
      },
      {
        name: 'Tahu',
        benefits: 'Protein terjangkau, mudah dicerna',
        portion: '2-3 sendok makan dilumatkan',
        preparation: 'Kukus dan lumatkan, campur dengan bubur',
        category: 'budget',
      },
      {
        name: 'Puree Bayam',
        benefits: 'Tinggi zat besi dan vitamin',
        portion: '1-2 sendok makan',
        preparation: 'Kukus daunnya, blender hingga halus',
        category: 'iron',
      },
    ],
  },
  {
    id: '1-3',
    label: '1-3 Tahun',
    description: 'Makanan keluarga dengan tekstur yang disesuaikan',
    foods: [
      {
        name: 'Ikan',
        benefits: 'Protein berkualitas tinggi, omega-3 untuk otak',
        portion: '30-40g per makan',
        preparation: 'Kukus atau panggang, buang semua duri dengan hati-hati',
        category: 'protein',
      },
      {
        name: 'Tempe',
        benefits: 'Kedelai fermentasi, probiotik, protein terjangkau',
        portion: '2-3 iris tipis',
        preparation: 'Kukus, goreng ringan, atau tambahkan ke sup',
        category: 'budget',
      },
      {
        name: 'Ayam',
        benefits: 'Protein rendah lemak, mendukung pertumbuhan otot',
        portion: '30-40g per makan',
        preparation: 'Suwir atau potong kecil-kecil, masak hingga lunak',
        category: 'protein',
      },
      {
        name: 'Kacang Merah',
        benefits: 'Protein nabati, zat besi, serat',
        portion: '2-3 sendok makan yang sudah dimasak',
        preparation: 'Rendam semalaman, rebus hingga sangat lunak',
        category: 'iron',
      },
      {
        name: 'Ubi Jalar',
        benefits: 'Vitamin A, energi, terjangkau',
        portion: '50-75g',
        preparation: 'Kukus atau rebus, lumatkan atau potong-potong',
        category: 'budget',
      },
      {
        name: 'Daging Sapi',
        benefits: 'Kandungan zat besi tinggi, protein lengkap',
        portion: '20-30g per makan',
        preparation: 'Masak hingga sangat empuk, potong kecil atau suwir',
        category: 'iron',
      },
    ],
  },
  {
    id: '3-5',
    label: '3-5 Tahun',
    description: 'Makanan keluarga reguler dengan semua kelompok makanan',
    foods: [
      {
        name: 'Telur',
        benefits: 'Protein lengkap, kolin untuk otak',
        portion: '1 butir telur per hari',
        preparation: 'Rebus, orak-arik, atau dalam omelet dengan sayuran',
        category: 'protein',
      },
      {
        name: 'Daun Kelor',
        benefits: 'Super bergizi, tinggi zat besi dan kalsium',
        portion: 'Segenggam kecil, 2-3 kali per minggu',
        preparation: 'Tambahkan ke sup, tumis, atau campur dengan nasi',
        category: 'iron',
      },
      {
        name: 'Teri',
        benefits: 'Kalsium, protein, terjangkau',
        portion: '1-2 sendok makan',
        preparation: 'Goreng kering untuk camilan renyah atau tambahkan ke sambal',
        category: 'budget',
      },
      {
        name: 'Hati Ayam',
        benefits: 'Kandungan zat besi tertinggi, vitamin A',
        portion: '30-40g, 2 kali seminggu',
        preparation: 'Tumis dengan bawang dan kecap',
        category: 'iron',
      },
      {
        name: 'Kacang Tanah',
        benefits: 'Protein, lemak sehat, energi',
        portion: 'Segenggam kecil (perlu pengawasan)',
        preparation: 'Sangrai atau dalam bumbu kacang',
        category: 'budget',
      },
      {
        name: 'Susu dan Produk Olahan',
        benefits: 'Kalsium untuk tulang, protein',
        portion: '2 gelas per hari',
        preparation: 'Susu segar, yogurt, atau keju',
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
      return 'Tinggi Protein';
    case 'iron':
      return 'Kaya Zat Besi';
    case 'budget':
      return 'Hemat Budget';
  }
};
