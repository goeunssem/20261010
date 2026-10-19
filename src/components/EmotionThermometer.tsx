import React, { useState } from 'react';
import { EmotionWord } from '../types/emotion';
import { sound } from '../utils/sound';
import { speech } from '../utils/speech';
import { HelpCircle, CheckCircle2, RotateCcw, Volume2, Sparkles } from 'lucide-react';

interface EmotionThermometerProps {
  words: EmotionWord[]; // The 3 words for this stage
  slots: (EmotionWord | null)[]; // 3 slots (index 0 = level 1, 1 = level 2, 2 = level 3)
  onSlotsChange: (newSlots: (EmotionWord | null)[]) => void;
  onVerify: () => void;
  isCompleted: boolean;
  themeColorClass: string;
}

export const EmotionThermometer: React.FC<EmotionThermometerProps> = ({
  words,
  slots,
  onSlotsChange,
  onVerify,
  isCompleted,
}) => {
  const [selectedWordToPlace, setSelectedWordToPlace] = useState<EmotionWord | null>(null);
  const [detailModalWord, setDetailModalWord] = useState<EmotionWord | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Available words in bank (words not yet assigned to any slot)
  const placedWordIds = slots.filter(Boolean).map((w) => w!.id);
  const availableWords = words.filter((w) => !placedWordIds.includes(w.id));

  // Determine current simulated mercury percentage
  const filledCount = slots.filter(Boolean).length;
  let mercuryHeightPercent = 20; // base bulb height
  if (filledCount === 1) mercuryHeightPercent = 42;
  else if (filledCount === 2) mercuryHeightPercent = 70;
  else if (filledCount === 3) mercuryHeightPercent = 95;

  const handleSelectBankWord = (word: EmotionWord) => {
    sound.playCardSelect();
    // If a slot is empty, place it in the first empty slot immediately!
    const firstEmptyIndex = slots.findIndex((s) => s === null);
    if (firstEmptyIndex !== -1) {
      const nextSlots = [...slots];
      nextSlots[firstEmptyIndex] = word;
      onSlotsChange(nextSlots);
      sound.playThermometerRise();
      setSelectedWordToPlace(null);
    } else {
      // All slots full: toggle selection
      setSelectedWordToPlace(selectedWordToPlace?.id === word.id ? null : word);
    }
  };

  const handleSlotClick = (index: number) => {
    sound.playClick();
    if (isCompleted) return;

    if (selectedWordToPlace) {
      // Place selected word into this slot
      const nextSlots = [...slots];
      const existingInSlot = nextSlots[index];
      nextSlots[index] = selectedWordToPlace;
      if (existingInSlot) {
        // Swap or return existing
        const oldIndex = nextSlots.findIndex((w, i) => i !== index && w?.id === selectedWordToPlace.id);
        if (oldIndex !== -1) {
          nextSlots[oldIndex] = existingInSlot;
        }
      }
      onSlotsChange(nextSlots);
      setSelectedWordToPlace(null);
      sound.playThermometerRise();
    } else if (slots[index]) {
      // Remove word from slot back to bank
      const nextSlots = [...slots];
      nextSlots[index] = null;
      onSlotsChange(nextSlots);
    }
  };

  const handleReset = () => {
    sound.playClick();
    onSlotsChange([null, null, null]);
    setSelectedWordToPlace(null);
    setShowHint(false);
  };

  const allSlotsFilled = slots.every((s) => s !== null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>🌡️ 감정 온도계 세기 맞히기</span>
            {isCompleted && (
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                배치 완료!
              </span>
            )}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            아래 단어 카드를 눌러 <span className="font-semibold text-amber-700">약한 감정(1단계)</span>부터{' '}
            <span className="font-semibold text-rose-700">펄펄 끓는 강한 감정(3단계)</span>까지 온도계에 채워보세요.
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>{showHint ? '힌트 닫기' : '힌트 보기'}</span>
          </button>
          {!isCompleted && (
            <button
              onClick={handleReset}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>비우기</span>
            </button>
          )}
        </div>
      </div>

      {/* Optional Hint Box */}
      {showHint && (
        <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs sm:text-sm text-amber-900 leading-relaxed animate-fadeIn">
          <div className="font-semibold mb-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>탐험대장의 세기 구별 힌트</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            {words.map((w) => (
              <li key={w.id}>
                <span className="font-bold text-slate-900">[{w.word}]</span>: {w.hintTip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Interactive Stage: Thermometer Display & Slots */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Thermometer Visual Column (4 cols) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50/80 rounded-xl border border-slate-100">
          <div className="relative w-24 h-72 flex items-center justify-center">
            {/* Thermometer Glass Body */}
            <div className="absolute top-2 bottom-12 w-9 rounded-t-full bg-white border-2 border-slate-300 shadow-inner overflow-hidden flex flex-col justify-end p-1">
              {/* Scale Ticks */}
              <div className="absolute inset-0 flex flex-col justify-between py-4 px-1 pointer-events-none opacity-40">
                <div className="w-full border-t border-slate-400 flex justify-end">
                  <span className="text-[8px] font-mono pr-0.5">100°</span>
                </div>
                <div className="w-3/4 border-t border-slate-400" />
                <div className="w-full border-t border-slate-400 flex justify-end">
                  <span className="text-[8px] font-mono pr-0.5">65°</span>
                </div>
                <div className="w-3/4 border-t border-slate-400" />
                <div className="w-full border-t border-slate-400 flex justify-end">
                  <span className="text-[8px] font-mono pr-0.5">36°</span>
                </div>
              </div>

              {/* Liquid Column */}
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-amber-400 via-rose-500 to-red-600 transition-all duration-700 ease-out relative"
                style={{ height: `${mercuryHeightPercent}%` }}
              >
                {/* Bubble steam animation if max */}
                {filledCount === 3 && (
                  <div className="absolute top-0 inset-x-0 h-2 bg-white/40 rounded-full animate-pulse" />
                )}
              </div>
            </div>

            {/* Bottom Bulb */}
            <div className="absolute bottom-2 w-16 h-16 rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-amber-400 border-2 border-slate-300 shadow-md flex items-center justify-center">
              <span className="text-white text-xs font-bold font-mono tracking-tighter">
                {filledCount === 0 ? '0°C' : filledCount === 1 ? '36°C' : filledCount === 2 ? '65°C' : '100°C'}
              </span>
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="text-xs font-medium text-slate-500">
              {filledCount === 0 && '단어를 넣어 온도를 올려보세요!'}
              {filledCount === 1 && '🌡️ 1단계: 은은한 미온 (36°C)'}
              {filledCount === 2 && '🔥 2단계: 뜨거운 온기 (65°C)'}
              {filledCount === 3 && '💥 3단계: 펄펄 끓는 열기 (100°C)'}
            </span>
          </div>
        </div>

        {/* Thermometer 3-Tier Slots Column (8 cols) */}
        <div className="md:col-span-8 flex flex-col gap-3">
          {/* Level 3: 100°C (Strongest) */}
          <div
            onClick={() => handleSlotClick(2)}
            className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              slots[2]
                ? 'bg-rose-50/90 border-rose-300 shadow-sm'
                : 'bg-white border-dashed border-rose-200 hover:border-rose-400 hover:bg-rose-50/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-500 text-white flex flex-col items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                <span>3단계</span>
                <span className="text-[9px] opacity-80">100°C</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-rose-700">펄펄 끓는 강한 감정</span>
                  <span className="text-[11px] text-slate-600">· 스스로 주체하기 힘들 정도로 큰 상태</span>
                </div>
                {slots[2] ? (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-rose-200 shadow-xs">
                      {slots[2]?.word}
                    </span>
                    <span className="text-xs text-slate-600 truncate max-w-xs">{slots[2]?.definition}</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 mt-1 italic">여기를 눌러 가장 강한 단어를 놓아주세요</p>
                )}
              </div>
            </div>

            {slots[2] && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetailModalWord(slots[2]);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-white"
                  title="뜻 보기"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Level 2: 65°C (Medium) */}
          <div
            onClick={() => handleSlotClick(1)}
            className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              slots[1]
                ? 'bg-amber-50/90 border-amber-300 shadow-sm'
                : 'bg-white border-dashed border-amber-200 hover:border-amber-400 hover:bg-amber-50/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex flex-col items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                <span>2단계</span>
                <span className="text-[9px] opacity-80">65°C</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-700">온도 상승! 중간 감정</span>
                  <span className="text-[11px] text-slate-600">· 겉으로 뚜렷하게 드러나는 분명한 상태</span>
                </div>
                {slots[1] ? (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-amber-200 shadow-xs">
                      {slots[1]?.word}
                    </span>
                    <span className="text-xs text-slate-600 truncate max-w-xs">{slots[1]?.definition}</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 mt-1 italic">여기를 눌러 중간 세기의 단어를 놓아주세요</p>
                )}
              </div>
            </div>

            {slots[1] && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetailModalWord(slots[1]);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-white"
                  title="뜻 보기"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Level 1: 36°C (Weak / Mild) */}
          <div
            onClick={() => handleSlotClick(0)}
            className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
              slots[0]
                ? 'bg-yellow-50/90 border-yellow-300 shadow-sm'
                : 'bg-white border-dashed border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50/30'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-400 text-amber-950 flex flex-col items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                <span>1단계</span>
                <span className="text-[9px] opacity-80">36°C</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-yellow-800">은은한 미온 약한 감정</span>
                  <span className="text-[11px] text-slate-600">· 마음속에서 은근히 피어오르는 가벼운 상태</span>
                </div>
                {slots[0] ? (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-md border border-yellow-200 shadow-xs">
                      {slots[0]?.word}
                    </span>
                    <span className="text-xs text-slate-600 truncate max-w-xs">{slots[0]?.definition}</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-600 mt-1 italic">여기를 눌러 가장 약한 단어를 놓아주세요</p>
                )}
              </div>
            </div>

            {slots[0] && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetailModalWord(slots[0]);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-white"
                  title="뜻 보기"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Word Bank: Available Cards to Pick */}
      {!isCompleted && (
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span>단어 보관함</span>
              <span className="text-slate-600 font-normal">({availableWords.length}개 남음)</span>
            </span>
            <span className="text-[11px] text-slate-600">단어 카드를 누르면 빈 온도계 칸으로 쏙 들어갑니다!</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {words.map((word) => {
              const isPlaced = placedWordIds.includes(word.id);
              const isSelected = selectedWordToPlace?.id === word.id;

              return (
                <div
                  key={word.id}
                  onClick={() => !isPlaced && handleSelectBankWord(word)}
                  className={`p-3.5 rounded-xl border transition-all text-left relative flex flex-col justify-between ${
                    isPlaced
                      ? 'bg-slate-100/70 border-slate-200 opacity-40 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-md cursor-pointer -translate-y-0.5'
                      : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-sm cursor-pointer'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">{word.word}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speech.speak(word.word);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-amber-600 hover:bg-slate-100"
                        title="단어 읽기"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{word.definition}</p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span>예: "{word.exampleSentence.slice(0, 16)}..."</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailModalWord(word);
                      }}
                      className="text-amber-600 hover:underline font-medium shrink-0 ml-1"
                    >
                      자세히
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      {!isCompleted && (
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onVerify}
            disabled={!allSlotsFilled}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
              allSlotsFilled
                ? 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white cursor-pointer active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>온도계 정답 확인하기</span>
          </button>
        </div>
      )}

      {/* Word Detail Quick View Modal */}
      {detailModalWord && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-slate-900">{detailModalWord.word}</span>
                <button
                  onClick={() => speech.speak(`${detailModalWord.word}. ${detailModalWord.definition}`)}
                  className="p-1.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                  title="음성으로 듣기"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setDetailModalWord(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div>
                <span className="text-xs font-semibold text-slate-600 block mb-0.5">사전 뜻풀이 (초등 국어)</span>
                <p className="text-slate-800 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {detailModalWord.definition}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-600 block mb-0.5">교과서 실생활 예문</span>
                <p className="text-slate-700 italic bg-amber-50/60 p-2.5 rounded-lg border border-amber-100/60">
                  "{detailModalWord.exampleSentence}"
                </p>
              </div>

              {detailModalWord.synonyms && detailModalWord.synonyms.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-slate-600 block mb-0.5">비슷한 감정 표현</span>
                  <div className="flex flex-wrap gap-1.5">
                    {detailModalWord.synonyms.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setDetailModalWord(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                확인 완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
