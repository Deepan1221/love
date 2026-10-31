import React, { useState, useEffect, useRef } from 'react';
import {
  Gamepad2,
  Trophy,
  Lock,
  Unlock,
  KeyRound,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  PartyPopper,
  Flame,
} from 'lucide-react';
import { anniversaryData } from '../data/anniversaryData us';
import confetti from 'canvas-confetti';

export default function GamesSection() {
  const { games } = anniversaryData;

  // Active game tab
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz', 'arcade', 'wheel', 'vault'

  /* ----------------------------------------------------
   * 1. LOVE QUIZ STATE
   * ---------------------------------------------------- */
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSelectAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);

    const isCorrect = idx === games.quiz[quizIndex].correctIndex;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      confetti({ particleCount: 20, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex + 1 < games.quiz.length) {
      setQuizIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#38BDF8', '#7DD3FC', '#F472B6', '#FFFFFF'],
      });
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  /* ----------------------------------------------------
   * 2. CATCH MY HEART ARCADE GAME
   * ---------------------------------------------------- */
  const [arcadeScore, setArcadeScore] = useState(0);
  const [arcadeTime, setArcadeTime] = useState(25);
  const [arcadeRunning, setArcadeRunning] = useState(false);
  const [basketX, setBasketX] = useState(50); // percentage 0-100%
  const [fallingItems, setFallingItems] = useState([]);
  const arcadeAreaRef = useRef(null);

  const startArcade = () => {
    setArcadeScore(0);
    setArcadeTime(25);
    setFallingItems([]);
    setArcadeRunning(true);
  };

  // Arcade timer
  useEffect(() => {
    if (!arcadeRunning) return;
    const timer = setInterval(() => {
      setArcadeTime((prev) => {
        if (prev <= 1) {
          setArcadeRunning(false);
          confetti({ particleCount: 60, spread: 70 });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [arcadeRunning]);

  // Falling items spawner & animation loop
  useEffect(() => {
    if (!arcadeRunning) return;

    const spawnInterval = setInterval(() => {
      const types = [
        { char: '💙', points: 10 },
        { char: '💋', points: 15 },
        { char: '🫦', points: 25 },
        { char: '👅', points: 20 },
      ];
      const randomItem = types[Math.floor(Math.random() * types.length)];
      setFallingItems((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: Math.random() * 85 + 5,
          y: 0,
          ...randomItem,
        },
      ]);
    }, 550);

    const fallInterval = setInterval(() => {
      setFallingItems((prev) =>
        prev
          .map((item) => ({ ...item, y: item.y + 4 }))
          .filter((item) => {
            // Collision detection with basket (basket is at y ~ 85%)
            if (item.y >= 80 && item.y <= 92 && Math.abs(item.x - basketX) < 14) {
              setArcadeScore((s) => s + item.points);
              return false;
            }
            return item.y < 100;
          })
      );
    }, 40);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(fallInterval);
    };
  }, [arcadeRunning, basketX]);

  const handleMouseMoveArcade = (e) => {
    if (!arcadeAreaRef.current) return;
    const rect = arcadeAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(8, Math.min(92, x)));
  };

  const handleTouchMoveArcade = (e) => {
    if (!arcadeAreaRef.current || !e.touches[0]) return;
    const rect = arcadeAreaRef.current.getBoundingClientRect();
    const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setBasketX(Math.max(8, Math.min(92, x)));
  };

  /* ----------------------------------------------------
   * 3. DATE NIGHT WHEEL
   * ---------------------------------------------------- */
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState(null);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedPrize(null);

    const prizesCount = games.wheelCoupons.length;
    const randomPrizeIndex = Math.floor(Math.random() * prizesCount);
    const extraSpins = 5 * 360;
    const segmentAngle = 360 / prizesCount;
    // Angle to land on prize
    const targetAngle = extraSpins + (prizesCount - randomPrizeIndex) * segmentAngle - segmentAngle / 2;

    setWheelRotation((prev) => prev + targetAngle);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(games.wheelCoupons[randomPrizeIndex]);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
      });
    }, 3500);
  };

  /* ----------------------------------------------------
   * 4. SECRET ANNIVERSARY VAULT
   * ---------------------------------------------------- */
  const [enteredPin, setEnteredPin] = useState('');
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [vaultError, setVaultError] = useState(false);

  const handleKeyPress = (num) => {
    if (enteredPin.length < 4) {
      const nextPin = enteredPin + num;
      setEnteredPin(nextPin);
      if (nextPin.length === 4) {
        verifyPin(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    setEnteredPin((prev) => prev.slice(0, -1));
    setVaultError(false);
  };

  const verifyPin = (pin) => {
    if (pin === games.secretVault.passcode || pin === '1205' || pin === '0512') {
      setVaultUnlocked(true);
      setVaultError(false);
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#38BDF8', '#F59E0B', '#FFFFFF', '#60A5FA'],
      });
    } else {
      setVaultError(true);
      setTimeout(() => {
        setEnteredPin('');
        setVaultError(false);
      }, 900);
    }
  };

  return (
    <section id="games" className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-sky-300 text-xs font-semibold uppercase tracking-wider">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Couple Arcades & Secrets</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
          Funny Games & Secret Vault
        </h2>
        <p className="text-sky-200/80 text-sm sm:text-base font-light">
          Test your memory, catch falling hearts, spin for romantic coupons, or crack the secret anniversary vault code!
        </p>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {[
          { id: 'quiz', label: '1. The Love Quiz', icon: '❓' },
          { id: 'arcade', label: '2. Catch My Heart', icon: '🎮' },
          { id: 'wheel', label: '3. Date Night Wheel', icon: '🎡' },
          { id: 'vault', label: '4. Secret Vault', icon: '🔐' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/25 border border-sky-300/40'
                : 'glass-card text-slate-300 hover:text-white border-slate-700/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* GAME 1: THE LOVE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-sky-400/30 shadow-2xl">
          {!quizCompleted ? (
            <div>
              {/* Question Progress Header */}
              <div className="flex items-center justify-between mb-6 text-xs text-sky-300">
                <span className="font-mono">
                  Question {quizIndex + 1} of {games.quiz.length}
                </span>
                <span className="font-semibold bg-sky-500/20 px-3 py-1 rounded-full border border-sky-400/30">
                  Score: {quizScore}
                </span>
              </div>

              {/* Question Text */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6">
                {games.quiz[quizIndex].question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {games.quiz[quizIndex].options.map((option, idx) => {
                  const isChosen = selectedAnswer === idx;
                  const isCorrect = idx === games.quiz[quizIndex].correctIndex;

                  let btnStyle = 'bg-slate-900/80 border-slate-700/70 text-slate-200 hover:border-sky-400/50';
                  if (selectedAnswer !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200';
                    } else if (isChosen && !isCorrect) {
                      btnStyle = 'bg-rose-950/80 border-rose-400 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base font-medium transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {selectedAnswer !== null && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {selectedAnswer !== null && isChosen && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {selectedAnswer !== null && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-400/30 text-xs sm:text-sm text-sky-200">
                    💡 <strong>Cute Fact:</strong> {games.quiz[quizIndex].explanation}
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="w-full glass-button py-3 rounded-xl text-white font-semibold text-sm transition"
                  >
                    {quizIndex + 1 < games.quiz.length ? 'Next Question →' : 'See Final Score 🏆'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-sky-400 text-white flex items-center justify-center mx-auto shadow-lg shadow-sky-500/30">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Quiz Complete! 👄
              </h3>
              <p className="text-lg text-sky-200">
                You scored <strong className="text-white">{quizScore}</strong> out of{' '}
                <strong className="text-white">{games.quiz.length}</strong>!
              </p>
              <p className="text-sm text-slate-300 max-w-md mx-auto italic">
                Verdict: Certified 100% Soulmate Compatibility! Deepan loves you more than words can say.
              </p>
              <button
                onClick={handleRestartQuiz}
                className="glass-button px-6 py-2.5 rounded-full text-white text-sm font-semibold inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: CATCH MY HEART ARCADE */}
      {activeTab === 'arcade' && (
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-sky-400/30 shadow-2xl text-center">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-sky-300">
              Score: <strong className="text-white text-base font-mono">{arcadeScore}</strong>
            </span>
            <span className="text-xs font-semibold text-sky-300">
              Time Left: <strong className="text-white text-base font-mono">{arcadeTime}s</strong>
            </span>
          </div>

          {/* Arcade Playfield */}
          <div
            ref={arcadeAreaRef}
            onMouseMove={handleMouseMoveArcade}
            onTouchMove={handleTouchMoveArcade}
            className="relative w-full h-80 sm:h-96 bg-slate-950/90 rounded-2xl overflow-hidden border border-sky-400/20 cursor-crosshair select-none touch-none mb-4"
          >
            {/* Background subtle stars */}
            <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

            {!arcadeRunning ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950/80 z-20 space-y-4">
                <span className="text-4xl">💙 🧺 💖</span>
                <h4 className="text-xl font-bold text-white">Catch My Heart!</h4>
                <p className="text-xs sm:text-sm text-sky-200/80 max-w-sm">
                  Drag the basket across the screen to catch falling hearts and roses before time runs out!
                </p>
                <button
                  onClick={startArcade}
                  className="glass-button px-6 py-2.5 rounded-full text-white text-sm font-semibold"
                >
                  {arcadeTime === 0 ? 'Play Again 🚀' : 'Start Arcade Game 🎮'}
                </button>
              </div>
            ) : null}

            {/* Falling items */}
            {fallingItems.map((item) => (
              <div
                key={item.id}
                className="absolute text-2xl transform -translate-x-1/2 pointer-events-none transition-transform"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                {item.char}
              </div>
            ))}

            {/* The Player's Basket */}
            <div
              className="absolute bottom-4 transform -translate-x-1/2 pointer-events-none transition-all duration-75 flex flex-col items-center"
              style={{ left: `${basketX}%` }}
            >
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 text-white text-xs font-bold shadow-lg border border-white/40">
                🧺 Love Basket
              </div>
            </div>
          </div>

          <p className="text-[11px] text-sky-300/60">
            Move mouse or drag your finger horizontally to glide the love basket!
          </p>
        </div>
      )}

      {/* GAME 3: DATE NIGHT WHEEL */}
      {activeTab === 'wheel' && (
        <div className="max-w-xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-sky-400/30 shadow-2xl text-center">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
            Spin the Wheel of Romance 🎡
          </h3>
          <p className="text-xs sm:text-sm text-sky-200/80 mb-6">
            Whichever coupon it lands on is officially legally binding for Deepan to fulfill! 😉
          </p>

          {/* Wheel Graphic Container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-6 flex items-center justify-center">
            {/* Top Pointer Arrow */}
            <div className="absolute -top-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-md" />

            {/* Rotating Wheel Disk */}
            <div
              className="w-full h-full rounded-full border-4 border-sky-300/60 shadow-2xl relative overflow-hidden transition-all ease-out"
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                transitionDuration: isSpinning ? '3.5s' : '0s',
                background: 'conic-gradient(#1E3E62 0deg 45deg, #2563EB 45deg 90deg, #1E3E62 90deg 135deg, #3B82F6 135deg 180deg, #1E3E62 180deg 225deg, #2563EB 225deg 270deg, #1E3E62 270deg 315deg, #38BDF8 315deg 360deg)',
              }}
            >
              {/* Center decorative ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-950 border-2 border-sky-300 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-sky-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Spin Trigger Button */}
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className={`glass-button px-8 py-3 rounded-full text-white font-semibold text-sm transition ${
              isSpinning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSpinning ? 'Spinning the Wheel...' : 'Spin The Wheel! ✨'}
          </button>

          {/* Prize Reveal Modal / Box */}
          {selectedPrize && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-900/60 to-sky-900/60 border border-sky-400/40 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-1">
                🎉 Won Romance Coupon:
              </span>
              <p className="text-lg font-serif font-bold text-white mb-2">
                {selectedPrize}
              </p>
              <span className="text-xs text-sky-200">
                Screenshot this to redeem with Deepan anytime! 💙
              </span>
            </div>
          )}
        </div>
      )}

      {/* GAME 4: SECRET ANNIVERSARY VAULT */}
      {activeTab === 'vault' && (
        <div className="max-w-md mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-sky-400/30 shadow-2xl text-center">
          <div className="w-14 h-14 rounded-full bg-slate-900 border border-sky-400/40 text-sky-300 flex items-center justify-center mx-auto mb-4">
            {vaultUnlocked ? <Unlock className="w-6 h-6 text-emerald-400" /> : <Lock className="w-6 h-6" />}
          </div>

          <h3 className="text-2xl font-serif font-bold text-white mb-2">
            Anniversary Secret Vault
          </h3>
          <p className="text-xs text-sky-200/80 mb-6">{games.secretVault.hint}</p>

          {!vaultUnlocked ? (
            <div>
              {/* PIN display dots */}
              <div className="flex justify-center gap-3 mb-6">
                {[0, 1, 2, 3].map((idx) => {
                  const isFilled = enteredPin.length > idx;
                  return (
                    <div
                      key={idx}
                      className={`w-10 h-12 rounded-xl flex items-center justify-center text-lg font-mono font-bold border transition ${
                        vaultError
                          ? 'border-rose-500 bg-rose-950/40 text-rose-300 animate-shake'
                          : isFilled
                          ? 'border-sky-400 bg-sky-950/60 text-white shadow-md shadow-sky-500/20'
                          : 'border-slate-700 bg-slate-900/60 text-slate-500'
                      }`}
                    >
                      {isFilled ? '●' : ''}
                    </div>
                  );
                })}
              </div>

              {/* Number Keypad */}
              <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeyPress(num.toString())}
                    className="h-12 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-mono font-bold text-lg border border-slate-700/60 transition active:scale-95"
                  >
                    {num}
                  </button>
                ))}
                <div />
                <button
                  onClick={() => handleKeyPress('0')}
                  className="h-12 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white font-mono font-bold text-lg border border-slate-700/60 transition active:scale-95"
                >
                  0
                </button>
                <button
                  onClick={handleBackspace}
                  className="h-12 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-sky-300 font-mono text-xs font-bold border border-slate-700/60 transition active:scale-95"
                >
                  DEL
                </button>
              </div>

              {vaultError && (
                <p className="text-xs text-rose-400 animate-pulse">
                  Incorrect PIN! Check the hint above.
                </p>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-400/40 text-left space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <PartyPopper className="w-5 h-5" />
                <span>{games.secretVault.secretRewardTitle}</span>
              </div>
              <p className="text-sm text-slate-100 leading-relaxed font-serif italic">
                "{games.secretVault.secretMessage}"
              </p>
              <div className="text-center pt-2">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold">
                  👑 VIP Lifetime Coupon Activated
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
