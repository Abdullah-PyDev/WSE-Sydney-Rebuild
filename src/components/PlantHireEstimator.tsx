import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Truck, 
  Settings, 
  Fuel, 
  User, 
  DollarSign, 
  ArrowRight,
  Info,
  CheckCircle2,
  ShieldAlert,
  Lock
} from 'lucide-react';
import ContactUnlockForm from './ContactUnlockForm';

interface PlantItem {
  type: string;
  size: string;
  netCost: number;
  fuelLtrHr: number;
}

const PLANT_DATA: PlantItem[] = [
  { type: 'Excavator', size: '1.5 Ton', netCost: 24.91, fuelLtrHr: 1.0125 },
  { type: 'Excavator', size: '3 Ton', netCost: 29.33, fuelLtrHr: 2.025 },
  { type: 'Excavator', size: '5 Ton', netCost: 35.22, fuelLtrHr: 3.375 },
  { type: 'Excavator', size: '8 Ton', netCost: 44.05, fuelLtrHr: 5.4 },
  { type: 'Excavator', size: '12 Ton', netCost: 44.05, fuelLtrHr: 8.1 },
  { type: 'Excavator', size: '13 Ton', netCost: 46.02, fuelLtrHr: 8.775 },
  { type: 'Excavator', size: '23 Ton', netCost: 65.65, fuelLtrHr: 13.9725 },
  { type: 'Excavator', size: '30 Ton', netCost: 79.40, fuelLtrHr: 16.2 },
  { type: 'Excavator', size: '35 Ton', netCost: 89.22, fuelLtrHr: 18.9 },
  { type: 'Excavator', size: '48 Ton', netCost: 114.75, fuelLtrHr: 25.92 },
  { type: 'Excavator', size: '50 Ton', netCost: 118.68, fuelLtrHr: 27 },
  { type: 'Tipper', size: '2 Ton', netCost: 30.31, fuelLtrHr: 1.35 },
  { type: 'Tipper', size: '4 Ton', netCost: 36.20, fuelLtrHr: 2.7 },
  { type: 'Tipper', size: '6 Ton', netCost: 39.34, fuelLtrHr: 4.05 },
  { type: 'Tipper', size: '8 Ton', netCost: 45.62, fuelLtrHr: 5.4 },
  { type: 'Tipper', size: '10 Ton', netCost: 49.94, fuelLtrHr: 6.075 },
  { type: 'Tipper', size: '12 Ton', netCost: 55.84, fuelLtrHr: 7.29 },
  { type: 'Tipper', size: '30 Ton', netCost: 85.29, fuelLtrHr: 16.2 },
  { type: 'Smooth Drum Roller', size: '2 Ton', netCost: 26.38, fuelLtrHr: 1.35 },
  { type: 'Smooth Drum Roller', size: '3.5 Ton', netCost: 29.42, fuelLtrHr: 2.3625 },
  { type: 'Smooth Drum Roller', size: '6 Ton', netCost: 34.63, fuelLtrHr: 4.05 },
  { type: 'Smooth Drum Roller', size: '8 Ton', netCost: 39.34, fuelLtrHr: 5.4 },
  { type: 'Smooth Drum Roller', size: '12 Ton', netCost: 44.05, fuelLtrHr: 8.1 },
  { type: 'Smooth Drum Roller', size: '14 Ton', netCost: 47.98, fuelLtrHr: 9.45 },
  { type: 'Smooth Drum Roller', size: '20 Ton', netCost: 51.91, fuelLtrHr: 13.5 },
  { type: 'Padfoot Roller', size: '3 Ton', netCost: 28.15, fuelLtrHr: 2.025 },
  { type: 'Padfoot Roller', size: '5 Ton', netCost: 33.25, fuelLtrHr: 3.375 },
  { type: 'Padfoot Roller', size: '7 Ton', netCost: 35.61, fuelLtrHr: 4.725 },
  { type: 'Padfoot Roller', size: '12 Ton', netCost: 44.05, fuelLtrHr: 8.1 },
  { type: 'Padfoot Roller', size: '13 Ton', netCost: 44.74, fuelLtrHr: 8.775 },
  { type: 'Padfoot Roller', size: '15 Ton', netCost: 48.47, fuelLtrHr: 10.125 },
  { type: 'Padfoot Roller', size: '20 Ton', netCost: 51.91, fuelLtrHr: 13.5 },
  { type: 'Front End loader - Bucket m3', size: '0.6 m3', netCost: 26.97, fuelLtrHr: 0.891 },
  { type: 'Front End loader - Bucket m3', size: '1.3 m3', netCost: 34.53, fuelLtrHr: 1.9305 },
  { type: 'Front End loader - Bucket m3', size: '1.6 m3', netCost: 37.77, fuelLtrHr: 2.376 },
  { type: 'Front End loader - Bucket m3', size: '2 m3', netCost: 42.09, fuelLtrHr: 2.97 },
  { type: 'Front End loader - Bucket m3', size: '2.5 m3', netCost: 47.49, fuelLtrHr: 3.7125 },
  { type: 'Front End loader - Bucket m3', size: '3 m3', netCost: 52.89, fuelLtrHr: 4.455 },
  { type: 'Front End loader - Bucket m3', size: '3.5 m3', netCost: 58.29, fuelLtrHr: 5.1975 },
  { type: 'Grader - Blade Ft', size: '10 Ft', netCost: 63.69, fuelLtrHr: 6.75 },
  { type: 'Grader - Blade Ft', size: '12 Ft', netCost: 72.33, fuelLtrHr: 8.1 },
  { type: 'Grader - Blade Ft', size: '14 Ft', netCost: 80.97, fuelLtrHr: 9.45 },
  { type: 'Grader - Blade Ft', size: '16 Ft', netCost: 89.61, fuelLtrHr: 10.8 },
  { type: 'Grader - Blade Ft', size: '18 Ft', netCost: 98.25, fuelLtrHr: 12.15 },
  { type: 'Small Dozer - T', size: '7 Ton', netCost: 54.85, fuelLtrHr: 5.67 },
  { type: 'Small Dozer - T', size: '10 Ton', netCost: 69.58, fuelLtrHr: 8.1 },
  { type: 'Medium Dozer - T', size: '13 Ton', netCost: 76.65, fuelLtrHr: 8.775 },
  { type: 'Medium Dozer - T', size: '20 Ton', netCost: 99.04, fuelLtrHr: 13.5 },
  { type: 'Large Civil Dozer - T', size: '35 Ton', netCost: 157.95, fuelLtrHr: 23.625 },
  { type: 'Small Towed Scraper - Capacity m3', size: '8 m3', netCost: 39.34, fuelLtrHr: 8.1 },
  { type: 'Small Towed Scraper - Capacity m3', size: '12 m3', netCost: 48.77, fuelLtrHr: 12.15 },
  { type: 'Single Engine Scraper - Capacity m3', size: '16 m3', netCost: 114.75, fuelLtrHr: 16.2 },
  { type: 'Single Engine Scraper - Capacity m3', size: '25 m3', netCost: 167.77, fuelLtrHr: 25.3125 },
  { type: 'Twin Engine Scraper - Capacity m3', size: '30 m3', netCost: 167.77, fuelLtrHr: 30.375 },
  { type: 'Twin Engine Scraper - Capacity m3', size: '40 m3', netCost: 216.86, fuelLtrHr: 40.5 },
  { type: 'Watercart - Ltr', size: '5000 Ltr', netCost: 45.04, fuelLtrHr: 3.375 },
  { type: 'Watercart - Ltr', size: '7000 Ltr', netCost: 54.85, fuelLtrHr: 4.725 },
  { type: 'Watercart - Ltr', size: '8000 Ltr', netCost: 51.91, fuelLtrHr: 5.4 },
  { type: 'Watercart - Ltr', size: '10000 Ltr', netCost: 59.76, fuelLtrHr: 6.75 },
  { type: 'Watercart - Ltr', size: '12000 Ltr', netCost: 62.91, fuelLtrHr: 8.1 },
  { type: 'Watercart - Ltr', size: '15000 Ltr', netCost: 73.51, fuelLtrHr: 10.125 },
  { type: 'Watercart - Ltr', size: '18000 Ltr', netCost: 77.04, fuelLtrHr: 12.15 },
  { type: 'Watercart - Ltr', size: '20000 Ltr', netCost: 83.33, fuelLtrHr: 13.5 },
  { type: 'Backhoe - T', size: '5 Ton', netCost: 38.16, fuelLtrHr: 4.05 },
  { type: 'Backhoe - T', size: '6 Ton', netCost: 41.70, fuelLtrHr: 4.05 },
  { type: 'Backhoe - T', size: '7 Ton', netCost: 45.23, fuelLtrHr: 4.725 },
  { type: 'Backhoe - T', size: '8 Ton', netCost: 48.77, fuelLtrHr: 5.4 },
  { type: 'Backhoe - T', size: '9 Ton', netCost: 52.30, fuelLtrHr: 6.075 },
  { type: 'Backhoe - T', size: '10.5 Ton', netCost: 55.54, fuelLtrHr: 7.0875 },
  { type: 'Bobcat - T', size: '2.2 Ton', netCost: 32.58, fuelLtrHr: 2.97 },
  { type: 'Bobcat - T', size: '2.8 Ton', netCost: 35.88, fuelLtrHr: 3.78 },
  { type: 'Bobcat - T', size: '3 Ton', netCost: 36.39, fuelLtrHr: 4.05 },
  { type: 'Bobcat - T', size: '3.5 Ton', netCost: 39.05, fuelLtrHr: 4.725 },
];

const OPERATOR_RATE = 81.05;
const FUEL_PRICE = 3.25;

import { apiFetch } from '../lib/api';

const PlantHireEstimator = () => {
  const [selectedType, setSelectedType] = useState<string>('Excavator');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [hours, setHours] = useState<number>(8);
  const [showResult, setShowResult] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [usageInfo, setUsageInfo] = useState<{ usageCount: number, usageLimit: number, isUnlocked: boolean } | null>(null);

  const plantTypes = Array.from(new Set(PLANT_DATA.map(p => p.type)));
  const sizesForType = PLANT_DATA.filter(p => p.type === selectedType);

  React.useEffect(() => {
    checkStatus();
  }, [showResult]);

  // Initialize size when type changes
  React.useEffect(() => {
    if (sizesForType.length > 0) {
      setSelectedSize(sizesForType[0].size);
    }
    checkStatus();
  }, [selectedType]);

  const checkStatus = async () => {
    try {
      const res = await apiFetch('/api/check-limit');
      const data = await res.json();
      console.log('Usage status:', data);
      setUsageInfo(data);
      setNeedsVerification(data.limitReached && !data.isUnlocked);
      return data;
    } catch (err) {
      console.error('Failed to check status:', err);
      return null;
    }
  };

  const handleCalculate = async () => {
    // Re-check status just before calculating to be sure
    const status = await checkStatus();
    
    if (status?.limitReached && !status?.isUnlocked) {
      console.log('Plant Hire: Limit reached, blocking calculation');
      setNeedsVerification(true);
      setShowResult(false);
      return;
    }

    setShowResult(true);

    // Record the estimate in the backend (increment count)
    console.log('Plant Hire: Tracking usage...');
    try {
      const response = await apiFetch('/api/track-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Plant Hire: Track usage response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Plant Hire: Track usage failed:', errorData);
      }
      checkStatus();
    } catch (err) {
      console.error('Plant Hire: Failed to track usage:', err);
    }
  };

  const calculateWetHire = () => {
    const plant = PLANT_DATA.find(p => p.type === selectedType && p.size === selectedSize);
    if (!plant) return 0;

    // Formula: Net Cost Per Hr + Operator $/Hr + (Fuel Price $/L * Fuel Ltr/Hr)
    const fuelCost = FUEL_PRICE * plant.fuelLtrHr;
    const wetHireRate = plant.netCost + OPERATOR_RATE + fuelCost;
    
    return wetHireRate;
  };

  const wetHireRate = calculateWetHire();
  const totalCost = wetHireRate * hours;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
    }).format(value);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl md:rounded-3xl border border-outline-variant shadow-2xl overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-primary p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Truck className="w-20 h-20 md:w-[120px] md:h-[120px]" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full mb-4">
            <Settings className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Plant Hire Estimator v2.0</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-headline tracking-tighter">Wet Hire Cost Estimator</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-white/70 text-xs md:text-sm mt-2 font-body max-w-md">
              Calculate accurate wet hire rates based on current operator and fuel costs.
            </p>
            {usageInfo && !usageInfo.isUnlocked && (
              <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(usageInfo.usageLimit)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 h-1.5 rounded-full ${i < usageInfo.usageCount ? 'bg-white/30' : 'bg-white'}`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                  {Math.max(0, usageInfo.usageLimit - usageInfo.usageCount)} Free Uses Left
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 lg:p-12 relative">
        <div className={needsVerification && !showResult ? "filter blur-md pointer-events-none opacity-40 transition-all duration-500" : "transition-all duration-500"}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Inputs */}
            <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block font-headline">Select Plant Type</label>
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body focus:ring-2 focus:ring-surface-tint outline-none"
                  >
                    {plantTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block font-headline">Select Size / Capacity</label>
                  <select 
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body focus:ring-2 focus:ring-surface-tint outline-none"
                  >
                    {sizesForType.map(s => (
                      <option key={s.size} value={s.size}>{s.size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block font-headline">Hire Duration (Hours)</label>
                  <div className="flex items-center space-x-4">
                    <input 
                      type="range" 
                      min="1" 
                      max="24" 
                      step="1"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="flex-grow h-2 bg-surface-container-low rounded-lg appearance-none cursor-pointer accent-surface-tint"
                    />
                    <span className="text-xl font-bold text-surface-tint font-headline w-12">{hours}h</span>
                  </div>
                </div>

                <button 
                  onClick={handleCalculate}
                  className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold font-headline flex items-center justify-center space-x-2 hover:scale-[1.02] transition-all shadow-lg shadow-primary/20"
                >
                  <span>Calculate Wet Hire Rate</span>
                  <Calculator size={18} />
                </button>
              </div>

              {/* Rate Components */}
              <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant flex flex-col justify-center">
                <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-6 font-headline flex items-center gap-2">
                  <Info size={14} />
                  Current Rate Parameters
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-on-surface-variant" />
                      <span className="text-sm text-on-surface-variant font-body">Operator Rate</span>
                    </div>
                    <span className="text-sm font-bold text-primary font-headline">{formatCurrency(OPERATOR_RATE)}/hr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Fuel size={14} className="text-on-surface-variant" />
                      <span className="text-sm text-on-surface-variant font-body">Fuel Price</span>
                    </div>
                    <span className="text-sm font-bold text-primary font-headline">{formatCurrency(FUEL_PRICE)}/L</span>
                  </div>
                  <div className="pt-4 border-t border-outline-variant">
                    <p className="text-[10px] text-on-surface-variant font-body italic">
                      *Rates are updated based on March 2026 market data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <AnimatePresence>
              {showResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 pt-8 border-t border-outline-variant"
                >
                  {needsVerification && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 mb-6">
                      <Lock className="text-amber-600 w-5 h-5 flex-shrink-0" />
                      <p className="text-xs text-amber-900 font-medium">
                        This is your last free estimate. Please verify your details to unlock unlimited access.
                      </p>
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full mb-4">
                      <CheckCircle2 size={18} />
                      <span className="text-xs font-bold uppercase tracking-widest font-headline">Calculation Complete</span>
                    </div>
                    <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-[0.2em] font-headline mb-2">Estimated Wet Hire Rate</h3>
                    <div className="text-4xl md:text-6xl font-black text-primary font-headline tracking-tighter">
                      {formatCurrency(wetHireRate)}<span className="text-xl md:text-2xl text-on-surface-variant">/hr</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold text-primary font-headline">Total Cost ({hours} hours)</span>
                        <span className="text-2xl font-black text-primary font-headline">{formatCurrency(totalCost)}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant font-body">
                        Includes operator, fuel, and plant net cost.
                      </p>
                    </div>

                    <div className="flex items-center justify-center">
                      <button 
                        onClick={() => window.location.href = '/request'}
                        className="w-full bg-surface-tint text-white px-8 py-4 rounded-xl font-bold font-headline flex items-center justify-center space-x-2 hover:scale-[1.05] transition-all shadow-lg shadow-surface-tint/20"
                      >
                        <span>Request Official Quote</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Lock Overlay */}
        <AnimatePresence>
          {needsVerification && !showResult && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center p-4 md:p-8"
            >
              <div className="max-w-xl w-full bg-white/90 backdrop-blur-sm p-1 rounded-3xl shadow-2xl border border-outline-variant">
                <div className="text-center pt-8 pb-4">
                  <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-2 font-headline tracking-tight">Estimator Tool Locked</h2>
                  <p className="text-on-surface-variant font-body max-w-md mx-auto text-sm px-6">
                    You've reached the limit for free anonymous estimates. Please complete the form below to unlock the tool and continue your project planning.
                  </p>
                </div>
                <ContactUnlockForm 
                  onVerified={() => {
                    console.log('PlantHireEstimator: Verification complete, proceeding with calculation');
                    setNeedsVerification(false);
                    handleCalculate();
                  }}
                  title="Unlock Plant Hire Estimator"
                  description="Provide your details to unlock unlimited access to our wet hire cost estimating tools."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default PlantHireEstimator;
