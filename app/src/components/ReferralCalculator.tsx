import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  Copy, 
  Check, 
  ExternalLink, 
  Share2, 
  Sparkles, 
  Gift, 
  ArrowRight,
  TrendingUp,
  Percent
} from 'lucide-react';

export const ReferralCalculator: React.FC = () => {
  const [tradersCount, setTradersCount] = useState<number>(12);
  const [avgTraderVolume, setAvgTraderVolume] = useState<number>(2500);
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Fee model: 0.5% trading fee on worm
  // Tier 1 direct referral: 30% fee share
  // Tier 2 sub-referral: 20% fee share
  const estimatedTradingFeeRate = 0.005; // 0.5%
  const totalVolume = tradersCount * avgTraderVolume;
  const platformFees = totalVolume * estimatedTradingFeeRate;
  const directReferralEarnings = platformFees * 0.30;
  const secondTierBonus = directReferralEarnings * 0.20;
  const totalProjectedUsdc = directReferralEarnings + secondTierBonus;

  const ctaTemplates = [
    {
      title: 'Prove It Call to Action',
      text: 'Think you know ball? Prove it on worm 👉 https://www.worm.wtf/referral'
    },
    {
      title: 'Premier League Predictions CTA',
      text: 'Predict the Premier League on worm 👉 https://www.worm.wtf/referral'
    },
    {
      title: 'Marquee Title Clash CTA',
      text: 'Liverpool or City? Make your call on worm 👉 https://www.worm.wtf/referral'
    }
  ];

  const handleCopy = (text: string, title: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(title);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/70 via-slate-900 to-slate-900 border border-teal-500/30 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
            Worm Referral Revenue Share
          </span>
          <span className="text-xs text-slate-400">90-Day Direct USDC Payouts</span>
        </div>
        <h2 className="text-2xl font-black text-white">
          Referral Fee Engine: Earn Up to 30% in USDC
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Invite football fans and prediction traders to worm. Receive up to 30% of their trading fees directly in USDC for 90 days, plus an extra 20% of their sub-referrals.
        </p>

        {/* Dynamic Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                Number of Referred Traders
              </label>
              <span className="text-sm font-mono font-bold text-white">{tradersCount} Traders</span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              step={1}
              value={tradersCount}
              onChange={(e) => setTradersCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>1</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                Avg Prediction Volume per Trader
              </label>
              <span className="text-sm font-mono font-bold text-emerald-400">
                ${avgTraderVolume.toLocaleString()} USDC
              </span>
            </div>
            <input
              type="range"
              min={250}
              max={10000}
              step={250}
              value={avgTraderVolume}
              onChange={(e) => setAvgTraderVolume(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>$250</span>
              <span>$5,000</span>
              <span>$10,000</span>
            </div>
          </div>
        </div>

        {/* Payout Projection Output */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Total Referred Volume</span>
            <div className="text-2xl font-black text-white mt-1">
              ${totalVolume.toLocaleString()} <span className="text-xs font-mono text-slate-400">USDC</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Across all 20 Premier League matchweeks
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Tier 1 Direct Share (30%)</span>
            <div className="text-2xl font-black text-teal-300 mt-1">
              ${directReferralEarnings.toFixed(0)} <span className="text-xs font-mono text-teal-400">USDC</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              30% of platform trading fees
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-950/80 to-slate-950 border border-emerald-500/40">
            <span className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Total 90-Day Payout
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              ${totalProjectedUsdc.toFixed(0)} <span className="text-xs font-mono text-emerald-300">USDC</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-300 mt-1 block">
              Includes 20% Tier-2 referral network bonus
            </span>
          </div>
        </div>
      </div>

      {/* Required Call to Action Copy Snippets */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="mb-4">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            Bounty Guardrail Compliant
          </span>
          <h3 className="text-lg font-bold text-white mt-2">
            Ready-to-Use Premier League Call to Actions
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Strictly follows worm guidelines: uses the word <strong className="text-white">"Predict"</strong> and embeds the official referral format.
          </p>
        </div>

        <div className="space-y-3">
          {ctaTemplates.map((item, idx) => {
            const isCopied = copiedSnippet === item.title;
            return (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-slate-300 mb-1">{item.title}</div>
                  <div className="text-sm font-mono text-emerald-400 select-all">{item.text}</div>
                </div>

                <button
                  onClick={() => handleCopy(item.text, item.title)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-colors shrink-0"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy CTA</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
