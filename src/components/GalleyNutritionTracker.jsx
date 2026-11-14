import React, { useState } from 'react';
import { 
  Utensils, 
  Droplets, 
  Apple, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Flame,
  Award
} from 'lucide-react';

export default function GalleyNutritionTracker({ activeCrew }) {
  // Hydration State
  const [fluidIntake, setFluidIntake] = useState(1850); // in mL
  const targetFluid = 2500; // in mL
  const [hydrationReminderDismissed, setHydrationReminderDismissed] = useState(false);

  // Daily Meal Log State
  const [meals, setMeals] = useState([
    {
      id: 'm1',
      mealType: 'Breakfast (07:30 MET)',
      name: 'Rehydrated Scrambled Eggs with Spinach & Wheat Tortilla',
      calories: 420,
      protein: 28, // grams
      fiber: 6, // grams
      sodium: 380, // mg
      vitD: 400 // IU
    },
    {
      id: 'm2',
      mealType: 'Lunch (12:45 MET)',
      name: 'Thermo-stabilized Wild Salmon with Quinoa & Steamed Broccoli',
      calories: 580,
      protein: 44,
      fiber: 9,
      sodium: 460,
      vitD: 600
    },
    {
      id: 'm3',
      mealType: 'Post-Workout Snack (16:00 MET)',
      name: 'High-Protein Nut & Dried Berry Energy Bar + Electrolyte Pouch',
      calories: 340,
      protein: 22,
      fiber: 5,
      sodium: 220,
      vitD: 0
    }
  ]);

  // Medical Targets Set by NASA Flight Surgeon
  const targetMacros = {
    calories: 3100, // kcal
    protein: 140, // g (1.6 g/kg bodyweight for 88kg astronaut)
    fiber: 35, // g
    sodiumMax: 2300, // mg (Strict cap to prevent bone calcium flushing)
    vitD: 1000 // IU
  };

  // Calculate Totals
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalFiber = meals.reduce((sum, m) => sum + m.fiber, 0);
  const totalSodium = meals.reduce((sum, m) => sum + m.sodium, 0);
  const totalVitD = meals.reduce((sum, m) => sum + m.vitD, 0);

  // Quick Food Add Form State
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [newMealName, setNewMealName] = useState('');
  const [newCalories, setNewCalories] = useState('');
  const [newProtein, setNewProtein] = useState('');
  const [newFiber, setNewFiber] = useState('');

  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!newMealName) return;

    const added = {
      id: Date.now().toString(),
      mealType: 'Dinner (19:30 MET)',
      name: newMealName,
      calories: parseInt(newCalories) || 450,
      protein: parseInt(newProtein) || 30,
      fiber: parseInt(newFiber) || 5,
      sodium: 410,
      vitD: 0
    };

    setMeals([...meals, added]);
    setNewMealName('');
    setNewCalories('');
    setNewProtein('');
    setNewFiber('');
    setIsAddingMeal(false);
  };

  const handleAddFluid = (amount) => {
    setFluidIntake(prev => Math.min(3500, prev + amount));
  };

  // Kidney stone risk calculation based on hydration deficit
  const fluidDeficit = targetFluid - fluidIntake;
  const kidneyStoneRisk = fluidDeficit > 800 ? 'ELEVATED RISK' : fluidDeficit > 400 ? 'MODERATE' : 'OPTIMAL (LOW)';
  const kidneyRiskClass = fluidDeficit > 800 
    ? 'text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/40' 
    : fluidDeficit > 400 
      ? 'text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/80 border-zinc-300 dark:border-zinc-700/50' 
      : 'text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 border-emerald-300 dark:border-emerald-500/40';

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-zinc-900 dark:text-white" />
            <h2 className="font-hud font-bold text-base text-zinc-900 dark:text-white tracking-wide uppercase">
              Space Galley Nutrition & Hydration Countermeasures
            </h2>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono-space">
            Dietary protocols calibrated for microgravity muscle preservation & renal protection
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-space text-zinc-700 dark:text-zinc-300 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 font-medium">
            PRESCRIPTION: <strong className="text-zinc-900 dark:text-zinc-100">NASA-STD-3001 VOL 1</strong>
          </span>
        </div>
      </div>

      {/* Hydration & Kidney Stone Protection Card */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6 gap-3">
          <div>
            <h3 className="font-hud text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Droplets className="w-5 h-5 text-zinc-900 dark:text-white animate-bounce" />
              Daily Spaceflight Fluid Intake & Nephrolithiasis Shield
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono-space">
              2.5L daily target required to flush leached bone calcium and prevent kidney stones
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono-space px-2.5 py-1 rounded-lg border font-bold ${kidneyRiskClass}`}>
              KIDNEY STONE RISK: {kidneyStoneRisk}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Fluid Progress Gauge */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex justify-between items-baseline font-mono-space text-xs">
              <div>
                <span className="font-hud text-4xl font-extrabold text-zinc-900 dark:text-white">{fluidIntake}</span>
                <span className="text-zinc-500 dark:text-zinc-400 ml-1.5">/ {targetFluid} mL INGESTED</span>
              </div>
              <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm">
                {Math.round((fluidIntake / targetFluid) * 100)}% TARGET
              </span>
            </div>

            {/* Custom Progress Bar */}
            <div className="w-full bg-zinc-100 dark:bg-zinc-950 rounded-full h-3 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-zinc-600 via-zinc-800 to-black dark:from-zinc-500 dark:via-zinc-300 dark:to-white h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (fluidIntake / targetFluid) * 100)}%` }}
              />
            </div>

            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <span className="text-xs font-mono-space text-zinc-500 dark:text-zinc-400 mr-2">LOG INTAKE:</span>
              <button
                onClick={() => handleAddFluid(250)}
                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-mono-space font-semibold transition-all shadow-sm"
              >
                +250 mL Hydropack
              </button>
              <button
                onClick={() => handleAddFluid(500)}
                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-mono-space font-semibold transition-all shadow-sm"
              >
                +500 mL Electrolyte Bag
              </button>
              <button
                onClick={() => setFluidIntake(0)}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-500 text-xs font-mono-space border border-zinc-300 dark:border-zinc-800"
                title="Reset counter"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Hydration Protocol Notice */}
          <div className="lg:col-span-5 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-xs font-sans text-zinc-700 dark:text-zinc-300 space-y-2">
            <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-hud font-bold">
              <Clock className="w-4 h-4 text-zinc-700 dark:text-white" />
              <span>ACTIVE HYDRATION ALARM:</span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
              T-Minus 30 mins before scheduled <strong>T2 Cycle Ergometer HIIT</strong> session. Ingest 350 mL chilled electrolyte water to preempt exercise hypovolemia.
            </p>
          </div>

        </div>
      </div>

      {/* Macronutrient Tracking Grid vs NASA Targets */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Calories */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-hud font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500" /> CALORIES
            </span>
            <span className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400">Target: {targetMacros.calories}</span>
          </div>
          <div className="font-hud text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
            {totalCalories} <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 font-mono-space">kcal</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-950 rounded-full h-1.5 mt-2 overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="bg-orange-500 h-full rounded-full" style={{ width: `${Math.min(100, (totalCalories / targetMacros.calories) * 100)}%` }} />
          </div>
        </div>

        {/* Protein (Muscle Preservation) */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-hud font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> PROTEIN
            </span>
            <span className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400">Target: {targetMacros.protein}g</span>
          </div>
          <div className="font-hud text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
            {totalProtein} <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 font-mono-space">g</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-950 rounded-full h-1.5 mt-2 overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, (totalProtein / targetMacros.protein) * 100)}%` }} />
          </div>
        </div>

        {/* Dietary Fiber (Gut Microbiome) */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-hud font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Apple className="w-4 h-4 text-zinc-700 dark:text-zinc-300" /> DIETARY FIBER
            </span>
            <span className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400">Target: {targetMacros.fiber}g</span>
          </div>
          <div className="font-hud text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
            {totalFiber} <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 font-mono-space">g</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-950 rounded-full h-1.5 mt-2 overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="bg-zinc-800 dark:bg-white h-full rounded-full" style={{ width: `${Math.min(100, (totalFiber / targetMacros.fiber) * 100)}%` }} />
          </div>
        </div>

        {/* Sodium Cap (Bone Preservation) */}
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-hud font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> SODIUM CAP
            </span>
            <span className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400">Max: {targetMacros.sodiumMax}mg</span>
          </div>
          <div className="font-hud text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
            {totalSodium} <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400 font-mono-space">mg</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-950 rounded-full h-1.5 mt-2 overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, (totalSodium / targetMacros.sodiumMax) * 100)}%` }} />
          </div>
        </div>

      </div>

      {/* Recorded Meals Table & Food Logging */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-4">
          <div>
            <h3 className="font-hud text-base font-bold text-zinc-900 dark:text-white tracking-wide uppercase flex items-center gap-2">
              <Utensils className="w-4 h-4 text-zinc-900 dark:text-white" />
              Recorded Spaceflight Meals (Mission Day 142)
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono-space">
              NASA Food Technology Facility (FTF) certified space rations
            </p>
          </div>

          <button
            onClick={() => setIsAddingMeal(!isAddingMeal)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-xs font-bold transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>{isAddingMeal ? 'Cancel' : 'Log Space Ration'}</span>
          </button>
        </div>

        {/* Quick Add Meal Form */}
        {isAddingMeal && (
          <form onSubmit={handleAddMeal} className="mb-4 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 animate-in fade-in space-y-3">
            <div className="font-hud font-bold text-xs text-zinc-900 dark:text-zinc-200 uppercase">
              Log Meal into Telemetry Database
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Ration Name (e.g. Teriyaki Chicken & Rice)"
                value={newMealName}
                onChange={e => setNewMealName(e.target.value)}
                className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono-space md:col-span-2"
                required
              />
              <input
                type="number"
                placeholder="Calories (kcal)"
                value={newCalories}
                onChange={e => setNewCalories(e.target.value)}
                className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono-space"
              />
              <input
                type="number"
                placeholder="Protein (g)"
                value={newProtein}
                onChange={e => setNewProtein(e.target.value)}
                className="bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono-space"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-hud text-xs font-bold transition-colors shadow-md"
              >
                Save to Astronaut Log
              </button>
            </div>
          </form>
        )}

        {/* Meals Table */}
        <div className="space-y-2.5">
          {meals.map((m) => (
            <div
              key={m.id}
              className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono-space text-zinc-500 dark:text-zinc-400 block font-semibold">
                  {m.mealType}
                </span>
                <span className="font-hud font-bold text-xs text-zinc-900 dark:text-white">
                  {m.name}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono-space text-zinc-700 dark:text-zinc-300">
                <span><strong className="text-orange-600 dark:text-orange-400">{m.calories}</strong> kcal</span>
                <span><strong className="text-emerald-600 dark:text-emerald-400">{m.protein}g</strong> Protein</span>
                <span><strong className="text-zinc-900 dark:text-zinc-200">{m.fiber}g</strong> Fiber</span>
                <span><strong className="text-zinc-500 dark:text-zinc-400">{m.sodium}mg</strong> Na⁺</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinical Correlation Card: Nutrition vs. Bone & Muscle Health Trends */}
      <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3 text-xs text-zinc-700 dark:text-zinc-300 shadow-sm">
        <Sparkles className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
        <div>
          <span className="font-hud font-bold text-zinc-900 dark:text-white block uppercase mb-1">
            NASA Human Research Program Clinical Correlation:
          </span>
          Flight data from the ISS demonstrates that maintaining protein intake &gt; 1.4 g/kg/day paired with daily ARED resistive training preserves 97.5% of soleus and quadriceps muscle volume. 
          Conversely, caloric deficits accelerate bone mineral loss and diminish cardiovascular orthostatic tolerance during Mars landing.
        </div>
      </div>

    </div>
  );
}
