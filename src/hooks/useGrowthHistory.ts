import { useState, useEffect } from 'react';

export interface GrowthRecord {
  id: string;
  date: string;
  ageMonths: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  haz: number;
  waz: number;
  whz: number;
  status: string;
}

const STORAGE_KEY = 'tanggap-stunting-history';

export function useGrowthHistory() {
  const [records, setRecords] = useState<GrowthRecord[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch {
        setRecords([]);
      }
    }
  }, []);

  const saveRecord = (record: Omit<GrowthRecord, 'id' | 'date'>) => {
    const newRecord: GrowthRecord = {
      ...record,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    const updated = [...records, newRecord].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setRecords(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newRecord;
  };

  const deleteRecord = (id: string) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const clearHistory = () => {
    setRecords([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { records, saveRecord, deleteRecord, clearHistory };
}
