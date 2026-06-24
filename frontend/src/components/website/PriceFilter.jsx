import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function PriceFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Project Limits (Database items ke boundary ke hisab se change kar sakte ho)
  const MIN_LIMIT = 0;
  const MAX_LIMIT = 5000;

  // Syncing initial state with URL values on page load/refresh
  const minQuery = Number(searchParams.get('min_price')) || MIN_LIMIT;
  const maxQuery = Number(searchParams.get('max_price')) || MAX_LIMIT;

  const [min, setMin] = useState(minQuery);
  const [max, setMax] = useState(maxQuery);
  const [isError, setIsError] = useState(false);

  // URL clear hote hi inputs ko reset karne ke liye effect hook
  useEffect(() => {
    setMin(Number(searchParams.get('min_price')) || MIN_LIMIT);
    setMax(Number(searchParams.get('max_price')) || MAX_LIMIT);
    setIsError(false);
  }, [searchParams]);

  const handleMinChange = (e) => {
    let value = Number(e.target.value);
    if (value < MIN_LIMIT) value = MIN_LIMIT;
    if (value > MAX_LIMIT) value = MAX_LIMIT;
    
    if (value >= max && max !== MAX_LIMIT) setIsError(true);
    else setIsError(false);
    setMin(value);
  };

  const handleMaxChange = (e) => {
    let value = Number(e.target.value);
    if (value < MIN_LIMIT) value = MIN_LIMIT;
    if (value > MAX_LIMIT) value = MAX_LIMIT;
    
    if (value <= min && value !== MIN_LIMIT) setIsError(true);
    else setIsError(false);
    setMax(value);
  };

  const applyFilter = () => {
    if (isError) return;
    const params = new URLSearchParams(searchParams);

    // Agar value default ranges par hain toh clean rakho URL, nahi toh set karo
    if (min === MIN_LIMIT) params.delete('min_price');
    else params.set('min_price', String(min));

    if (max === MAX_LIMIT) params.delete('max_price');
    else params.set('max_price', String(max));

    // Jab bhi filter badle, pagination page ko 1 par reset karna zaroori hai
    params.delete('page'); 

    setSearchParams(params);
  };

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('min_price');
    params.delete('max_price');
    params.delete('page');

    setMin(MIN_LIMIT);
    setMax(MAX_LIMIT);
    setIsError(false);
    setSearchParams(params);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm">
      <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-wider mb-4">Price Filter</h4>
      
      <div className="flex items-center gap-2 mb-2">
        <input
          type="number"
          value={min === 0 ? '' : min}
          onChange={handleMinChange}
          className={`w-full p-2 text-sm rounded-xl border outline-none ${isError ? 'border-red-500 bg-red-50' : 'border-neutral-200'}`}
          placeholder="Min"
        />
        <span className="text-neutral-400 text-xs">to</span>
        <input
          type="number"
          value={max === 5000 ? '' : max}
          onChange={handleMaxChange}
          className={`w-full p-2 text-sm rounded-xl border outline-none ${isError ? 'border-red-500 bg-red-50' : 'border-neutral-200'}`}
          placeholder="Max"
        />
      </div>

      {isError && (
        <p className="text-[11px] text-red-500 font-semibold mb-2">* Min must be less than Max</p>
      )}

      <div className="flex gap-2 mt-3">
        <button
          onClick={applyFilter}
          disabled={isError}
          className={`w-full py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-white ${isError ? 'bg-neutral-300' : 'bg-emerald-600 hover:bg-emerald-700'}`}
        >
          Apply
        </button>
        <button
          onClick={clearFilter}
          className="w-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 py-2 rounded-xl text-xs font-bold uppercase tracking-wider"
        >
          Clear
        </button>
      </div>
    </div>
  );
}