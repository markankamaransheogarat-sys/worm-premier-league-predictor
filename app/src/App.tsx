import React, { useState } from 'react';
import { 
  Trophy, 
  Zap, 
  Coins, 
  Share2, 
  ShieldCheck, 
  ExternalLink, 
  Activity, 
  Sparkles, 
  Flame, 
  TrendingUp, 
  Users,
  Award
} from 'lucide-react';
import { MatchPredictionsBoard, MatchFixture } from './components/MatchPredictionsBoard';
import { LeveragedSimulator } from './components/LeveragedSimulator';
import { ReferralCalculator } from './components/ReferralCalculator';
import { ContentThreadSuite } from './components/ContentThreadSuite';

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

export function App() {
  const [activeTab, setActiveTab] = useState<'fixtures' | 'simulator' | 'referral' | 'thread' | 'about'>('fixtures');
  const [selectedMatch, setSelectedMatch] = useState<MatchFixture | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<'home' | 'draw' | 'away'>('home');

  const handleSelectMatchFromBoard = (match: MatchFixture, outcome: 'home' | 'draw' | 'away') => {
    setSelectedMatch(match);
    setSelectedOutcome(outcome);
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900/60 to-slate-900 border-b border-emerald-500/20 py-2 px-4 text-center text-xs">
        <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          Worm 🪱⚽ Leveraged Prediction Market on Solana • All 20 Premier League Clubs
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
              🪱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  worm Premier League Predictor
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Up to 3× Leverage
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Solana Leveraged Prediction Markets • Matchweek 6</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.worm.wtf/sports?league=eng.1"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
            >
              <span>Trade on worm.wtf</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="https://github.com/markankamaransheogarat-sys/worm-premier-league-predictor"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex space-x-1 sm:space-x-2 border-t border-slate-900 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('fixtures')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'fixtures'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Trophy className="w-4 h-4" />
            Premier League Fixtures
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'simulator'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-400" />
            3× Leverage Simulator
          </button>

          <button
            onClick={() => setActiveTab('referral')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'referral'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Coins className="w-4 h-4 text-teal-400" />
            30% Referral Calculator
          </button>

          <button
            onClick={() => setActiveTab('thread')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'thread'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <TwitterIcon className="w-4 h-4 text-sky-400" />
            Viral Content Thread (7 Tweets)
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'about'
                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Protocol &amp; Rules
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'fixtures' && (
          <MatchPredictionsBoard onSelectMatch={handleSelectMatchFromBoard} />
        )}

        {activeTab === 'simulator' && (
          <LeveragedSimulator 
            selectedMatch={selectedMatch} 
            selectedOutcome={selectedOutcome} 
          />
        )}

        {activeTab === 'referral' && <ReferralCalculator />}

        {activeTab === 'thread' && <ContentThreadSuite />}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                About worm Protocol &amp; Prediction Rules
              </h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                worm is the one and only leveraged prediction market on Solana. Built for football enthusiasts and on-chain traders who want transparent, mathematical markets.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-emerald-400 uppercase font-bold">Why worm Differs</span>
                  <ul className="mt-2 space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>All 20 clubs:</strong> Predict every single Premier League match.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>Dynamic Live %:</strong> Real market chances that adjust continuously.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>Up to 3× Leverage:</strong> Back your football IQ with amplified capital efficiency.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span><strong>Instant Settlements:</strong> Zero withdrawal delays, settled straight to Solana.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-amber-400 uppercase font-bold">Rewards &amp; Leaderboards</span>
                  <ul className="mt-2 space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">★</span>
                      <span><strong>$1,500 USDC Weekly:</strong> Top 10 traders earn weekly prize pool payouts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">★</span>
                      <span><strong>30% Trading Fee Share:</strong> 90 days of referral fees paid in USDC.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">★</span>
                      <span><strong>20% Sub-Referrals:</strong> Second tier revenue stream on your friends' invites.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">★</span>
                      <span><strong>Strict Standard:</strong> Strictly "Predict", never betting/gambling.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="text-white font-medium">worm Premier League Predictor</span> • Built for Superteam Earn &amp; worm Community
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://x.com/wormwtf" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-sky-400 transition-colors flex items-center gap-1"
            >
              <TwitterIcon className="w-3.5 h-3.5" /> @wormwtf
            </a>
            <a 
              href="https://www.worm.wtf/referral" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              Earn Referral
            </a>
            <a 
              href="https://github.com/markankamaransheogarat-sys/worm-premier-league-predictor" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
