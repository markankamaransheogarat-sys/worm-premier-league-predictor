import React, { useState } from 'react';
import { 
  Zap, 
  TrendingUp, 
  Calculator, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  ExternalLink,
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MatchFixture } from './MatchPredictionsBoard';

interface Props {
  selectedMatch: MatchFixture | null;
  selectedOutcome: 'home' | 'draw' | 'away';
}

export const LeveragedSimulator: React.FC<Props> = ({ 
  selectedMatch: propMatch, 
  selectedOutcome: propOutcome 
}) => {
  const defaultMatch: MatchFixture = {
    id: 'epl-01',
    homeTeam: 'Arsenal',
    awayTeam: 'Manchester City',
    homeBadge: '🔴',
    awayBadge: '🔵',
    date: 'Saturday, 17:30 BST',
    stadium: 'Emirates Stadium',
    homeProb: 44,
    drawProb: 27,
    awayProb: 29,
    totalVolumeUsdc: 482500
  };

  const match = propMatch || defaultMatch;
  const [outcome, setOutcome] = useState<'home' | 'draw' | 'away'>(propOutcome || 'home');
  const [deposit, setDeposit] = useState<number>(100);
  const [leverage, setLeverage] = useState<number>(3.0);

  // Compute probabilities and payouts
  const currentProb = outcome === 'home' ? match.homeProb : outcome === 'draw' ? match.drawProb : match.awayProb;
  const decimalOdds = 100 / currentProb; // Fair implied probability price
  const outcomeLabel = outcome === 'home' ? `${match.homeTeam} Win` : outcome === 'draw' ? 'Draw' : `${match.awayTeam} Win`;

  // Leverage calculations
  const effectivePosition = deposit * leverage;
  const borrowedAmount = effectivePosition - deposit;
  
  // Potential return: gross payout minus borrowed principal
  const grossPayout = effectivePosition * decimalOdds;
  const netProfit = grossPayout - borrowedAmount - deposit;
  const totalReturn = netProfit + deposit;
  const roiPercent = (netProfit / deposit) * 100;

  // Unleveraged benchmark
  const unleveragedReturn = deposit * decimalOdds;
  const unleveragedNetProfit = unleveragedReturn - deposit;
  const unleveragedRoi = (unleveragedNetProfit / deposit) * 100;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Worm Protocol Engine
          </span>
          <span className="text-xs text-slate-400">Solana's Only Leveraged Prediction Market</span>
        </div>
        <h2 className="text-2xl font-black text-white">
          Up to 3× Leveraged Match Prediction Simulator
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Back your Premier League calls with enhanced capital efficiency. Predict the outcome and watch how live market probability translates into magnified USDC returns.
        </p>

        {/* Selected Match Card */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">Active Fixture</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl">{match.homeBadge}</span>
              <span className="font-bold text-white text-base">{match.homeTeam}</span>
              <span className="text-xs text-slate-500 font-bold">VS</span>
              <span className="font-bold text-white text-base">{match.awayTeam}</span>
              <span className="text-xl">{match.awayBadge}</span>
            </div>
            <span className="text-xs text-slate-400">{match.stadium} • {match.date}</span>
          </div>

          {/* Outcome Selector */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-stretch sm:self-auto">
            <button
              onClick={() => setOutcome('home')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                outcome === 'home'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Home ({match.homeProb}%)
            </button>
            <button
              onClick={() => setOutcome('draw')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                outcome === 'draw'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Draw ({match.drawProb}%)
            </button>
            <button
              onClick={() => setOutcome('away')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                outcome === 'away'
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Away ({match.awayProb}%)
            </button>
          </div>
        </div>

        {/* Sliders: Deposit & Leverage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Deposit Slider */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">Your Prediction Collateral</label>
              <span className="text-sm font-mono font-bold text-white">${deposit.toLocaleString()} USDC</span>
            </div>
            <input
              type="range"
              min={10}
              max={1500}
              step={10}
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>$10 USDC</span>
              <span>$750 USDC</span>
              <span>$1,500 USDC</span>
            </div>
          </div>

          {/* Leverage Selector */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <label className="text-xs font-semibold text-slate-300">Leverage Multiplier</label>
              </div>
              <span className="text-sm font-mono font-bold text-emerald-400">{leverage.toFixed(1)}×</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[1.0, 1.5, 2.0, 2.5, 3.0].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLeverage(lvl)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    leverage === lvl
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md font-black scale-105'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {lvl}×
                </button>
              ))}
            </div>
            <span className="text-[10px] text-slate-400 mt-2 block">
              worm enables up to 3× leverage on Solana with zero slippage execution.
            </span>
          </div>
        </div>

        {/* Calculation Result Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Total Effective Exposure</span>
            <div className="text-2xl font-black text-white mt-1">
              ${effectivePosition.toLocaleString()} <span className="text-xs font-mono text-emerald-400">USDC</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              (${deposit} collateral + ${borrowedAmount} liquidity)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Market Probability Odds</span>
            <div className="text-2xl font-black text-white mt-1">
              {currentProb}% <span className="text-xs font-mono text-slate-400">({decimalOdds.toFixed(2)}x fair)</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Pure peer-to-peer live pricing
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/80 to-slate-950 border border-emerald-500/40">
            <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Potential Net Payout If You Hit
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              ${totalReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs font-mono text-emerald-300">USDC</span>
            </div>
            <div className="text-[11px] font-mono text-emerald-300 mt-1 font-semibold">
              +${netProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })} profit ({roiPercent.toFixed(1)}% ROI)
            </div>
          </div>
        </div>

        {/* Comparison: 1x vs 3x Leverage Comparison */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/50 border border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            Leverage Amplification on worm
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-semibold text-slate-300">Standard Prediction (1×):</span>
              <p className="text-slate-400 mt-1">
                Deposit ${deposit} → Return ${unleveragedReturn.toFixed(0)} USDC (+${unleveragedNetProfit.toFixed(0)} net profit, {unleveragedRoi.toFixed(1)}% ROI).
              </p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30">
              <span className="font-semibold text-emerald-300">Enhanced Prediction ({leverage}× on worm):</span>
              <p className="text-emerald-400/90 mt-1">
                Deposit ${deposit} → Return ${totalReturn.toFixed(0)} USDC (+${netProfit.toFixed(0)} net profit, {roiPercent.toFixed(1)}% ROI).
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Predict on worm */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-300">
            Think you know ball? Prove it on <strong className="text-emerald-400">worm.wtf</strong> with the marquee {match.homeTeam} vs {match.awayTeam} fixture.
          </div>
          <a
            href="https://www.worm.wtf/sports?league=eng.1"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95 shrink-0"
          >
            <span>Predict on worm.wtf</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
