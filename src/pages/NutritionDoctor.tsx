import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { nutritionData, getCategoryColor, getCategoryLabel, type FoodItem } from '@/lib/nutrition-data';
import { Utensils, MapPin, Phone, Navigation, Loader2, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Geolocation } from '@capacitor/geolocation';

interface HealthcareProvider {
  id: string;
  name: string;
  type: 'doctor' | 'midwife' | 'puskesmas';
  distance: string;
  phone: string;
  address: string;
}

// Data contoh untuk fasilitas kesehatan
const mockProviders: HealthcareProvider[] = [
  {
    id: '1',
    name: 'Puskesmas Kecamatan Menteng',
    type: 'puskesmas',
    distance: '1,2 km',
    phone: '021-3141234',
    address: 'Jl. Menteng Raya No. 25',
  },
  {
    id: '2',
    name: 'dr. Siti Aminah, Sp.A',
    type: 'doctor',
    distance: '2,5 km',
    phone: '021-5678901',
    address: 'RS Bunda Menteng Lt. 3',
  },
  {
    id: '3',
    name: 'Bidan Praktik Dewi Sartika',
    type: 'midwife',
    distance: '0,8 km',
    phone: '0812-3456-7890',
    address: 'Jl. Cikini Raya No. 12',
  },
  {
    id: '4',
    name: 'Puskesmas Tanah Abang',
    type: 'puskesmas',
    distance: '3,1 km',
    phone: '021-3144567',
    address: 'Jl. Tanah Abang II No. 5',
  },
  {
    id: '5',
    name: 'dr. Bambang Widodo, Sp.A',
    type: 'doctor',
    distance: '4,2 km',
    phone: '021-7890123',
    address: 'Klinik Sehat Sejahtera',
  },
];

export default function NutritionDoctor() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'doctor' ? 'doctor' : 'nutrition';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedAge, setSelectedAge] = useState<string>('6-12');
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [providers, setProviders] = useState<HealthcareProvider[]>([]);
  const { toast } = useToast();

  const selectedAgeGroup = nutritionData.find((g) => g.id === selectedAge);

  const requestLocation = async () => {
    setLoadingLocation(true);
    
    try {
      // Request permission first (for native apps)
      const permissionStatus = await Geolocation.requestPermissions();
      
      if (permissionStatus.location !== 'granted') {
        toast({
          title: 'Akses Lokasi Ditolak',
          description: 'Mohon izinkan akses lokasi di pengaturan perangkat Anda.',
          variant: 'destructive',
        });
        setLoadingLocation(false);
        return;
      }

      // Get current position
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      setLocation(position.coords);
      setProviders(mockProviders); // Di aplikasi nyata, ambil berdasarkan lokasi
      setLoadingLocation(false);
      toast({
        title: 'Lokasi Ditemukan',
        description: 'Menampilkan fasilitas kesehatan di sekitar Anda.',
      });
    } catch (error) {
      console.error('Geolocation error:', error);
      toast({
        title: 'Gagal Mendapatkan Lokasi',
        description: 'Pastikan GPS aktif dan coba lagi.',
        variant: 'destructive',
      });
      setLoadingLocation(false);
    }
  };

  const getTypeColor = (type: HealthcareProvider['type']) => {
    switch (type) {
      case 'doctor':
        return 'bg-primary/10 text-primary';
      case 'midwife':
        return 'bg-accent/10 text-accent';
      case 'puskesmas':
        return 'bg-risk-low/10 text-risk-low';
    }
  };

  const getTypeLabel = (type: HealthcareProvider['type']) => {
    switch (type) {
      case 'doctor':
        return 'Dokter';
      case 'midwife':
        return 'Bidan';
      case 'puskesmas':
        return 'Puskesmas';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <PageHeader 
        title="Gizi & Fasilitas Kesehatan" 
        subtitle="Panduan makanan dan fasilitas terdekat"
      />

      <div className="px-4 py-4 max-w-lg mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="nutrition" className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              Gizi
            </TabsTrigger>
            <TabsTrigger value="doctor" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Cari Dokter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nutrition" className="space-y-4 mt-0">
            {/* Age Group Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {nutritionData.map((group) => (
                <Button
                  key={group.id}
                  variant={selectedAge === group.id ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedAge(group.id)}
                  className="flex-shrink-0"
                >
                  {group.label}
                </Button>
              ))}
            </div>

            {selectedAgeGroup && (
              <div className="space-y-3">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">
                    {selectedAgeGroup.description}
                  </p>
                </div>

                {selectedAgeGroup.foods.map((food, index) => (
                  <FoodCard key={index} food={food} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="doctor" className="space-y-4 mt-0">
            <MedicalDisclaimer compact />

            {!location ? (
              <Card className="p-6 text-center space-y-4 shadow-card">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Temukan Fasilitas Kesehatan Terdekat</h3>
                  <p className="text-sm text-muted-foreground">
                    Izinkan akses lokasi untuk menemukan dokter, bidan, dan puskesmas di sekitar Anda.
                  </p>
                </div>
                <Button 
                  onClick={requestLocation} 
                  disabled={loadingLocation}
                  className="w-full"
                >
                  {loadingLocation ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mencari Lokasi...
                    </>
                  ) : (
                    <>
                      <Navigation className="w-4 h-4" />
                      Aktifkan Lokasi
                    </>
                  )}
                </Button>
              </Card>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {providers.length} fasilitas ditemukan
                  </p>
                  <Button variant="ghost" size="sm" onClick={requestLocation}>
                    Refresh
                  </Button>
                </div>

                {providers.map((provider) => (
                  <Card key={provider.id} className="p-4 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeColor(provider.type)}`}>
                            {getTypeLabel(provider.type)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {provider.distance}
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground truncate">
                          {provider.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {provider.address}
                        </p>
                      </div>
                      <a
                        href={`tel:${provider.phone}`}
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:brightness-110 transition-all"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function FoodCard({ food }: { food: FoodItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card 
      className="p-4 shadow-card cursor-pointer transition-all hover:shadow-lg"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(food.category)}`}>
              {getCategoryLabel(food.category)}
            </span>
          </div>
          <h4 className="font-semibold text-foreground">{food.name}</h4>
          <p className="text-sm text-muted-foreground mt-1">{food.benefits}</p>
        </div>
        <ChevronRight 
          className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ${expanded ? 'rotate-90' : ''}`} 
        />
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border space-y-3 animate-fade-in">
          <div>
            <h5 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">
              Ukuran Porsi
            </h5>
            <p className="text-sm text-muted-foreground">{food.portion}</p>
          </div>
          <div>
            <h5 className="text-xs font-semibold text-foreground uppercase tracking-wide mb-1">
              Cara Penyajian
            </h5>
            <p className="text-sm text-muted-foreground">{food.preparation}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
