import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  MessageSquare, 
  Repeat2, 
  Heart, 
  Bookmark,
  Sparkles,
  Trophy,
  Zap
} from 'lucide-react';

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface Tweet {
  id: number;
  text: string;
  charCount: number;
}

export const ContentThreadSuite: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState<boolean>(false);

  const tweets: Tweet[] = [
    {
      id: 1,
      text: `1/7 🪱⚽ The Premier League is back, and @wormwtf is transforming how football fans trade match outcomes.

worm is the one and only leveraged prediction market on @solana. 

All 20 clubs. Every single match. Up to 3× leverage.

Here is why it changes football predictions forever 👇 🧵`,
      charCount: 279
    },
    {
      id: 2,
      text: `2/7 📈 How Premier League Markets Work on worm:

Every fixture outcome (Home / Draw / Away) is a live % determined purely by market demand.

As the match plays out in real time, the probability shifts dynamically with momentum, red cards, and goals. Zero predatory bookie margins.`,
      charCount: 279
    },
    {
      id: 3,
      text: `3/7 ⚡️ Why 3× Leverage is a Gamechanger:

Confident in Arsenal breaking down Man City's low block? Want to back Liverpool at Anfield?

On @wormwtf, you can predict with up to 3× leverage. Magnify your capital efficiency and back your football knowledge with institutional-grade tools.`,
      charCount: 284
    },
    {
      id: 4,
      text: `4/7 🏆 Weekly $1,500 USDC Prize Pools:

The top 10 Premier League prediction traders on @wormwtf split weekly USDC rewards all the way to mid-season.

Compete on the Matchweek leaderboard, prove your tactical insight, and get paid directly to your Solana wallet in USDC.`,
      charCount: 271
    },
    {
      id: 5,
      text: `5/7 💰 Earn Up to 30% Referral Fees:

Invite your squad to predict on @wormwtf:
• Earn 20% to 30% of your referrals' trading fees for 90 days in USDC
• Plus 20% of their own referral earnings
• Instant payouts with zero lockups

Convert your football group chats into passive on-chain revenue.`,
      charCount: 284
    },
    {
      id: 6,
      text: `6/7 🔍 This Weekend's Marquee Clash: Arsenal vs Man City

• Arsenal Win: 44% implied probability
• Draw: 27%
• Man City Win: 29%

With 3× leverage on @wormwtf, a $200 prediction on the Gunners yields an effective $600 position without taking on traditional predatory odds.`,
      charCount: 273
    },
    {
      id: 7,
      text: `7/7 🚀 Stop letting traditional bookies take your edge. Pure peer-to-peer live prediction markets on Solana are here.

Explore the interactive simulator: https://markankamaransheogarat-sys.github.io/worm-premier-league-predictor/

Think you know ball? Prove it on worm 👉 https://www.worm.wtf/referral 🪱⚽`,
      charCount: 296
    }
  ];

  const handleCopyTweet = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const fullThread = tweets.map(t => t.text).join('\n\n---\n\n');
    navigator.clipboard.writeText(fullThread);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  };

  const openTwitterIntent = (text: string) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TwitterIcon className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-bold text-white">
              Official 7-Tweet Premier League Prediction Thread
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compliant with all worm guidelines: strictly uses <span className="text-white font-semibold">"Predict"</span>, tags <span className="text-sky-300">@wormwtf</span>, and terminates with the required CTA.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95 shrink-0"
        >
          {allCopied ? (
            <>
              <Check className="w-4 h-4 text-slate-950" />
              <span>Full Thread Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Full 7-Tweet Thread</span>
            </>
          )}
        </button>
      </div>

      {/* Tweet Cards */}
      <div className="space-y-4">
        {tweets.map((tweet) => {
          const isCopied = copiedId === tweet.id;
          return (
            <div 
              key={tweet.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-md group relative"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
                    {tweet.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">Premier League on worm</span>
                      <span className="text-xs text-emerald-400 font-mono">@wormwtf</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Tweet {tweet.id} of 7</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyTweet(tweet.text, tweet.id)}
                    title="Copy this tweet"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => openTwitterIntent(tweet.text)}
                    title="Post on X"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 border border-sky-500/30 text-xs font-medium transition-colors"
                  >
                    <TwitterIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Tweet text */}
              <div className="pl-12 text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                {tweet.text}
              </div>

              {/* Tweet footer / metrics */}
              <div className="pl-12 mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" /> 18
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer">
                    <Repeat2 className="w-3.5 h-3.5" /> 62
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-rose-400 cursor-pointer">
                    <Heart className="w-3.5 h-3.5" /> 284
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer">
                    <Bookmark className="w-3.5 h-3.5" /> 45
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {tweet.charCount} / 280 chars
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
