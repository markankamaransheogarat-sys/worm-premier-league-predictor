import React, { useState } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  Flame, 
  ExternalLink, 
  CheckCircle, 
  Zap, 
  ArrowUpRight,
  ShieldCheck,
  Search
} from 'lucide-react';

export interface MatchFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeBadge: string;
  awayBadge: string;
  date: string;
  stadium: string;
  homeProb: number; // e.g. 48%
  drawProb: number; // e.g. 26%
  awayProb: number; // e.g. 26%
  totalVolumeUsdc: number;
  highlight?: boolean;
}

const FIXTURES: MatchFixture[] = [
  {
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
    totalVolumeUsdc: 482500,
    highlight: true
  },
  {
    id: 'epl-02',
    homeTeam: 'Liverpool',
    awayTeam: 'Chelsea',
    homeBadge: '🔴',
    awayBadge: '🦁',
    date: 'Sunday, 16:30 BST',
    stadium: 'Anfield',
    homeProb: 52,
    drawProb: 24,
    awayProb: 24,
    totalVolumeUsdc: 395100,
    highlight: true
  },
  {
    id: 'epl-03',
    homeTeam: 'Tottenham Hotspur',
    awayTeam: 'Newcastle United',
    homeBadge: '⚪',
    awayBadge: '⬛',
    date: 'Saturday, 12:30 BST',
    stadium: 'Tottenham Hotspur Stadium',
    homeProb: 41,
    drawProb: 29,
    awayProb: 30,
    totalVolumeUsdc: 218900
  },
  {
    id: 'epl-04',
    homeTeam: 'Aston Villa',
    awayTeam: 'Manchester United',
    homeBadge: '🦁',
    awayBadge: '😈',
    date: 'Sunday, 14:00 BST',
    stadium: 'Villa Park',
    homeProb: 46,
    drawProb: 28,
    awayProb: 26,
    totalVolumeUsdc: 194300
  },
  {
    id: 'epl-05',
    homeTeam: 'Brighton & Hove Albion',
    awayTeam: 'Everton',
    homeBadge: '🕊️',
    awayBadge: '🟦',
    date: 'Saturday, 15:00 BST',
    stadium: 'Amex Stadium',
    homeProb: 55,
    drawProb: 25,
    awayProb: 20,
    totalVolumeUsdc: 142000
  }
];

interface Props {
  onSelectMatch: (match: MatchFixture, outcome: 'home' | 'draw' | 'away') => void;
}

export const MatchPredictionsBoard: React.FC<Props> = ({ onSelectMatch }) => {
  const [search, setSearch] = useState('');

  const filteredFixtures = FIXTURES.filter(f => 
    f.homeTeam.toLowerCase().includes(search.toLowerCase()) ||
    f.awayTeam.toLowerCase().includes(search.toLowerCase()) ||
    f.stadium.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Hero Highlight */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Premier League on worm 🪱⚽
            </span>
            <span className="text-xs text-slate-400">All 20 Clubs • Matchweek 6</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <Flame className="w-3.5 h-3.5" />
            Weekly Prize Pool: $1,500 USDC
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Live Premier League Prediction Markets
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Predict every match outcome. Live percentages move in real-time as market confidence and game action shifts. Back your call with <strong className="text-emerald-400">up to 3× leverage</strong> on Solana.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Solana Native Settlements</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Up to 3× Capital Efficiency</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-sky-400" />
            <span>Top 10 Leaderboard Rewards</span>
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Premier League clubs (Arsenal, City, Liverpool...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          Showing {filteredFixtures.length} of {FIXTURES.length} marquee matches
        </span>
      </div>

      {/* Fixtures Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredFixtures.map((fixture) => (
          <div 
            key={fixture.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-white">{fixture.stadium}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{fixture.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">
                  Volume: <span className="text-white font-semibold">${fixture.totalVolumeUsdc.toLocaleString()} USDC</span>
                </span>
                <a
                  href="https://www.worm.wtf/sports?league=eng.1"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                >
                  worm.wtf <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Teams Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Home Team Outcome */}
              <div 
                onClick={() => onSelectMatch(fixture, 'home')}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{fixture.homeBadge}</span>
                    <span className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                      {fixture.homeTeam}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    {fixture.homeProb}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all" 
                    style={{ width: `${fixture.homeProb}%` }} 
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Home Win</span>
                  <span className="text-emerald-300 font-semibold group-hover:underline">Predict with 3× ⚡</span>
                </div>
              </div>

              {/* Draw Outcome */}
              <div 
                onClick={() => onSelectMatch(fixture, 'draw')}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤝</span>
                    <span className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                      Draw
                    </span>
                  </div>
                  <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                    {fixture.drawProb}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full transition-all" 
                    style={{ width: `${fixture.drawProb}%` }} 
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Match Tied</span>
                  <span className="text-amber-300 font-semibold group-hover:underline">Predict with 3× ⚡</span>
                </div>
              </div>

              {/* Away Team Outcome */}
              <div 
                onClick={() => onSelectMatch(fixture, 'away')}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/60 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{fixture.awayBadge}</span>
                    <span className="font-bold text-sm text-white group-hover:text-sky-400 transition-colors">
                      {fixture.awayTeam}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-sky-400 font-bold bg-sky-500/10 px-2 py-0.5 rounded">
                    {fixture.awayProb}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-sky-500 h-full rounded-full transition-all" 
                    style={{ width: `${fixture.awayProb}%` }} 
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Away Win</span>
                  <span className="text-sky-300 font-semibold group-hover:underline">Predict with 3× ⚡</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
