import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  ArrowRight, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Droplets, 
  Waves, 
  Settings,
  TrendingUp,
  DollarSign,
  Ruler,
  Layers
} from 'lucide-react';

interface EstimateResult {
  low: number;
  high: number;
  breakdown: {
    materials: number;
    labor: number;
    excavation: number;
    reinstatement: number;
  };
}

const QuickEstimator = () => {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState<'water' | 'sewer' | 'stormwater'>('water');
  const [material, setMaterial] = useState('');
  const [diameter, setDiameter] = useState(150);
  const [length, setLength] = useState(50);
  const [depth, setDepth] = useState(1.5);
  const [groundType, setGroundType] = useState('standard');
  const [result, setResult] = useState<EstimateResult | null>(null);

  const materials = {
    water: ['PVC-O', 'DICL', 'MSCL', 'PE'],
    sewer: ['PVC-U', 'VC', 'DICL', 'PE'],
    stormwater: ['Concrete (RCP)', 'PVC', 'Polypropylene']
  };

  const diameters = {
    water: [100, 150, 200, 225, 250, 300, 375, 450, 500, 600],
    sewer: [150, 225, 300, 375, 450, 525, 600],
    stormwater: [300, 375, 450, 525, 600, 750, 900, 1050, 1200, 1500]
  };

  const groundTypes = [
    { id: 'standard', name: 'Standard Soil', multiplier: 1 },
    { id: 'clay', name: 'Heavy Clay', multiplier: 1.25 },
    { id: 'sand', name: 'Loose Sand', multiplier: 1.15 },
    { id: 'rock-soft', name: 'Soft Rock / Shale', multiplier: 2.5 },
    { id: 'rock-hard', name: 'Hard Rock (Sandstone)', multiplier: 4.5 }
  ];

  useEffect(() => {
    // Reset material when service type changes
    setMaterial(materials[serviceType][0]);
    // Reset diameter to a sensible default for the service
    setDiameter(diameters[serviceType][0]);
  }, [serviceType]);

  const calculateEstimate = () => {
    // Base rates per meter (highly simplified for ROM)
    let baseRate = 0;
    if (serviceType === 'water') baseRate = 250;
    if (serviceType === 'sewer') baseRate = 350;
    if (serviceType === 'stormwater') baseRate = 450;

    // Diameter multiplier
    const diameterFactor = diameter / 150;
    
    // Depth factor (exponentially increases cost)
    const depthFactor = Math.pow(depth / 1.5, 1.5);

    // Ground factor
    const groundFactor = groundTypes.find(g => g.id === groundType)?.multiplier || 1;

    // Material factor
    let materialFactor = 1;
    if (material === 'DICL') materialFactor = 1.4;
    if (material === 'MSCL') materialFactor = 1.8;
    if (material === 'Concrete (RCP)') materialFactor = 1.2;

    const totalBase = baseRate * length * diameterFactor * depthFactor * groundFactor * materialFactor;

    const estimate: EstimateResult = {
      low: totalBase * 0.85,
      high: totalBase * 1.25,
      breakdown: {
        materials: totalBase * 0.35,
        labor: totalBase * 0.30,
        excavation: totalBase * 0.25,
        reinstatement: totalBase * 0.10
      }
    };

    setResult(estimate);
    setStep(3);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl md:rounded-3xl border border-outline-variant shadow-2xl overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-primary p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Calculator className="w-20 h-20 md:w-[120px] md:h-[120px]" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full mb-4">
            <TrendingUp className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest">ROM Estimator v1.2</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold font-headline tracking-tighter">Quick Project Estimator</h2>
          <p className="text-white/70 text-xs md:text-sm mt-2 font-body max-w-md">
            Get an instant Rough Order of Magnitude (ROM) estimate for your Sydney infrastructure project.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-surface-container-low w-full">
        <motion.div 
          className="h-full bg-surface-tint"
          initial={{ width: '33%' }}
          animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
        />
      </div>

      <div className="p-6 md:p-8 lg:p-12">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 block font-headline">Select Infrastructure Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'water', name: 'Water Mains', icon: Droplets, color: 'blue' },
                    { id: 'sewer', name: 'Sewer Mains', icon: Waves, color: 'emerald' },
                    { id: 'stormwater', name: 'Stormwater', icon: Settings, color: 'amber' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setServiceType(type.id as any)}
                      className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all ${serviceType === type.id ? 'border-surface-tint bg-surface-tint/5 shadow-lg' : 'border-outline-variant bg-surface-container-low hover:border-surface-tint/50'}`}
                    >
                      <type.icon size={32} className={serviceType === type.id ? 'text-surface-tint' : 'text-on-surface-variant'} />
                      <span className={`mt-3 font-bold font-headline ${serviceType === type.id ? 'text-primary' : 'text-on-surface-variant'}`}>{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 block font-headline">Pipe Material</label>
                  <select 
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body focus:ring-2 focus:ring-surface-tint outline-none"
                  >
                    {materials[serviceType].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 block font-headline">Nominal Diameter (mm)</label>
                  <select 
                    value={diameter}
                    onChange={(e) => setDiameter(Number(e.target.value))}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl p-4 text-sm font-body focus:ring-2 focus:ring-surface-tint outline-none"
                  >
                    {diameters[serviceType].map(d => (
                      <option key={d} value={d}>{d}mm</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button 
                  onClick={() => setStep(2)}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold font-headline flex items-center space-x-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                  <span>Next: Project Scope</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Total Length (m)</label>
                    <span className="text-xl font-bold text-surface-tint font-headline">{length}m</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="1000" 
                    step="5"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-surface-container-low rounded-lg appearance-none cursor-pointer accent-surface-tint"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant font-bold">
                    <span>5m</span>
                    <span>1000m</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-primary uppercase tracking-widest font-headline">Average Depth (m)</label>
                    <span className="text-xl font-bold text-surface-tint font-headline">{depth}m</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.6" 
                    max="6.0" 
                    step="0.1"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full h-2 bg-surface-container-low rounded-lg appearance-none cursor-pointer accent-surface-tint"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant font-bold">
                    <span>0.6m</span>
                    <span>6.0m</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 block font-headline">Ground Conditions</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {groundTypes.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGroundType(g.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${groundType === g.id ? 'border-surface-tint bg-surface-tint/5' : 'border-outline-variant bg-surface-container-low hover:bg-surface-container'}`}
                    >
                      <div className="flex items-center space-x-2">
                        <Layers size={16} className={groundType === g.id ? 'text-surface-tint' : 'text-on-surface-variant'} />
                        <span className={`text-sm font-bold font-headline ${groundType === g.id ? 'text-primary' : 'text-on-surface-variant'}`}>{g.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="text-primary font-bold font-headline flex items-center space-x-2 hover:underline"
                >
                  <span>Back</span>
                </button>
                <button 
                  onClick={calculateEstimate}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold font-headline flex items-center space-x-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                  <span>Calculate Estimate</span>
                  <Calculator size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && result && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="text-center">
                <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full mb-6">
                  <CheckCircle2 size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest font-headline">Estimate Generated Successfully</span>
                </div>
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-[0.2em] font-headline mb-2">Rough Order of Magnitude</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                  <span className="text-4xl md:text-6xl font-black text-primary font-headline tracking-tighter">
                    {formatCurrency(result.low)}
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-on-surface-variant font-headline">—</span>
                  <span className="text-4xl md:text-6xl font-black text-primary font-headline tracking-tighter">
                    {formatCurrency(result.high)}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant mt-4 font-body italic">
                  *This is a high-level ROM estimate (+/- 25%) based on current Sydney market rates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant">
                  <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-6 font-headline flex items-center gap-2">
                    <DollarSign size={14} />
                    Estimated Cost Breakdown
                  </h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Materials & Fittings', value: result.breakdown.materials, icon: Settings },
                      { label: 'Labor & Installation', value: result.breakdown.labor, icon: Ruler },
                      { label: 'Excavation & Shoring', value: result.breakdown.excavation, icon: Layers },
                      { label: 'Reinstatement', value: result.breakdown.reinstatement, icon: Waves }
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <item.icon size={14} className="text-on-surface-variant" />
                          <span className="text-sm text-on-surface-variant font-body">{item.label}</span>
                        </div>
                        <span className="text-sm font-bold text-primary font-headline">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex items-start gap-4">
                    <AlertTriangle className="text-amber-600 flex-shrink-0" size={24} />
                    <div>
                      <h5 className="text-sm font-bold text-amber-900 font-headline">Important Disclaimer</h5>
                      <p className="text-xs text-amber-800/80 mt-1 font-body leading-relaxed">
                        This estimate excludes GST, specialized traffic control, major utility relocations, and complex environmental management.
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/5 border border-primary/10 p-6 rounded-2xl flex items-start gap-4">
                    <Info className="text-primary flex-shrink-0" size={24} />
                    <div>
                      <h5 className="text-sm font-bold text-primary font-headline">Need a Precise BOQ?</h5>
                      <p className="text-xs text-on-surface-variant mt-1 font-body leading-relaxed">
                        For tender-ready precision, upload your technical drawings to our expert estimating team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="px-8 py-4 rounded-xl font-bold font-headline text-primary border border-outline-variant hover:bg-surface-container-low transition-all"
                >
                  New Estimate
                </button>
                <button 
                  onClick={() => window.location.href = '/request'}
                  className="bg-primary text-white px-10 py-4 rounded-xl font-bold font-headline flex items-center justify-center space-x-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                  <span>Get Detailed Quote</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuickEstimator;
