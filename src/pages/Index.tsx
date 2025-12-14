import { Link } from 'react-router-dom';
import { Baby, Heart, Calculator, Utensils, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';

const menuItems = [
  {
    path: '/pregnancy',
    icon: Heart,
    title: 'Deteksi Stunting Kehamilan',
    description: 'Menilai risiko stunting sebelum kelahiran',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    path: '/child',
    icon: Baby,
    title: 'Deteksi Stunting Anak',
    description: 'Cek status pertumbuhan anak usia 0-5 tahun',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    path: '/weight',
    icon: Calculator,
    title: 'Kalkulator Berat Ideal Bayi',
    description: 'Cek berat badan ideal anak Anda',
    color: 'text-risk-low',
    bgColor: 'bg-risk-low/10',
  },
  {
    path: '/nutrition',
    icon: Utensils,
    title: 'Gizi & Menu Makanan',
    description: 'Rekomendasi makanan sesuai usia',
    color: 'text-risk-moderate',
    bgColor: 'bg-risk-moderate/10',
  },
  {
    path: '/nutrition?tab=doctor',
    icon: MapPin,
    title: 'Dokter Terdekat',
    description: 'Temukan fasilitas kesehatan di sekitar Anda',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="relative px-4 pt-8 pb-6 max-w-lg mx-auto">
          <div className="text-center space-y-3 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-button mb-2">
              <Baby className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Tanggap Stunting
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
              Deteksi, cegah, dan tangani stunting sejak dini menggunakan indikator berbasis WHO dan panduan praktis.
            </p>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-4 max-w-lg mx-auto space-y-3">
        {menuItems.map((item, index) => (
          <Link
            key={item.path}
            to={item.path}
            className="block animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Button
              variant="menu"
              size="menu"
              className="w-full group"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="flex-1 text-left ml-3">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.description}
                </p>
              </div>
            </Button>
          </Link>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="px-4 mt-8 max-w-lg mx-auto">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
