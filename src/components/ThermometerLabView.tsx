import React, { useState } from 'react';
import { EmotionFamilyId, EmotionWord } from '../types/emotion';
import { ALL_EMOTION_WORDS, EMOTION_FAMILIES } from '../data/emotions';
import { sound } from '../utils/sound';
import { speech } from '../utils/speech';
import confetti from 'canvas-confetti';
import {
  FlaskConical,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Volume2,
  Shuffle
} from 'lucide-react';

export const ThermometerLabView: React.FC = () => {
  const [selectedFamilyId, setSelectedFamilyId] = useState<EmotionFamilyId>('anger');
  const familyWords = ALL_EMOTION_WORDS.filter((w) => w.familyId === selectedFamilyId);

  // Slots for the 3 levels: index 0 = 36°C, index 1 = 65°C, index 2 = 100°C
  const [slots, setSlots] = useState<(EmotionWord | null)[]>([null, null, null]);
  const [testResult, setTestResult] = useState<{ isSuccess: boolean; message: string } | null>(null);

  // Temperature Simulation Slider state
  const [interactiveTemp, setInteractiveTemp] = useState<number>(50);

  const placedWordIds = slots.filter(Boolean).map((w) => w!.id);
  const availableWords = familyWords.filter((w) => !placedWordIds.includes(w.id));

  const handleSelectFamily = (id: EmotionFamilyId) => {
    sound.playClick();
    setSelectedFamilyId(id);
    setSlots([null, null, null]);
    setTestResult(null);
  };

  const handlePlaceWord = (word: EmotionWord) => {
    sound.playCardSelect();
    const firstEmptyIndex = slots.findIndex((s) => s === null);
    if (firstEmptyIndex !== -1) {
      const nextSlots = [...slots];
      nextSlots[firstEmptyIndex] = word;
      setSlots(nextSlots);
      sound.playThermometerRise();
      setTestResult(null);
    }
  };

  const handleRemoveFromSlot = (index: number) => {
    sound.playClick();
    const nextSlots = [...slots];
    nextSlots[index] = null;
    setSlots(nextSlots);
    setTestResult(null);
  };

  const handleReset = () => {
    sound.playClick();
    setSlots([null, null, null]);
    setTestResult(null);
  };

  const handleCheckAnswer = () => {
    const isLevel1 = slots[0]?.intensityLevel === 1;
    const isLevel2 = slots[1]?.intensityLevel === 2;
    const isLevel3 = slots[2]?.intensityLevel === 3;

    if (isLevel1 && isLevel2 && isLevel3) {
      sound.playCorrect();
      setTestResult({
        isSuccess: true,
        message: '정답입니다! 약한 불씨(1단계)부터 펄펄 끓는 격렬함(3단계)까지 정확하게 측정했어요.',
      });
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {
        // fallback
      }
    } else {
      sound.playWrong();
      setTestResult({
        isSuccess: false,
        message: '순서가 조금 어긋났어요. 약한 감정(1단계)부터 강한 감정(3단계)인지 단어의 의미를 다시 확인해 보세요.',
      });
    }
  };

  const familyData = EMOTION_FAMILIES[selectedFamilyId];

  // Determine which word matches the interactive temperature slider
  const getSimulatedWordForTemp = (temp: number) => {
    if (temp < 45) return familyWords.find((w) => w.intensityLevel === 1);
    if (temp < 80) return familyWords.find((w) => w.intensityLevel === 2);
    return familyWords.find((w) => w.intensityLevel === 3);
  };

  const matchedWord = getSimulatedWordForTemp(interactiveTemp);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">자유 감정 온도계 실험실</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              원하는 감정 계열을 선택해 보고, 단어들의 온도와 세기를 자유롭게 탐구하고 측정해 보세요.
            </p>
          </div>
        </div>

        {/* Emotion Family Selector Tabs */}
        <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {Object.values(EMOTION_FAMILIES).map((fam) => {
            const isSelected = fam.id === selectedFamilyId;
            return (
              <button
                key={fam.id}
                onClick={() => handleSelectFamily(fam.id as EmotionFamilyId)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-semibold flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>
                  {fam.id === 'anger'
                    ? '🔥'
                    : fam.id === 'joy'
                    ? '🎉'
                    : fam.id === 'sadness'
                    ? '💧'
                    : fam.id === 'fear'
                    ? '⚡'
                    : fam.id === 'embarrassment'
                    ? '😳'
                    : '🌟'}
                </span>
                <span>{fam.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Experiment Sandbox: Temperature Simulator & Arrange Practice */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Temperature Mercury Simulator (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <span>🌡️ 감정 온도 다이얼</span>
              </h3>
              <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                {interactiveTemp}°C
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              슬라이더를 좌우로 움직여 감정의 온도가 올라갈 때 단어가 어떻게 변화하는지 관찰해 보세요!
            </p>

            {/* Slider */}
            <div className="mt-6">
              <input
                type="range"
                min="20"
                max="100"
                value={interactiveTemp}
                onChange={(e) => setInteractiveTemp(Number(e.target.value))}
                className="w-full accent-amber-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-600 mt-1.5 font-mono">
                <span>20°C (미온)</span>
                <span>65°C (온도 상승)</span>
                <span>100°C (폭발)</span>
              </div>
            </div>

            {/* Simulated Word Box */}
            {matchedWord && (
              <div className="mt-6 p-4 rounded-xl bg-amber-50/70 border border-amber-200 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-800">{matchedWord.intensityName}</span>
                    <h4 className="text-2xl font-black text-slate-900 mt-0.5">{matchedWord.word}</h4>
                  </div>
                  <button
                    onClick={() => speech.speak(`${matchedWord.word}. ${matchedWord.definition}`)}
                    className="p-2 rounded-lg bg-white border border-amber-200 text-amber-700 hover:bg-amber-100 shadow-xs"
                    title="단어 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">{matchedWord.definition}</p>
                <p className="text-[11px] text-slate-600 mt-2 italic bg-white/70 p-2 rounded-lg border border-amber-100">
                  예: "{matchedWord.exampleSentence}"
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
            💡 감정의 온도가 100°C에 가까워질수록 행동을 조심하고 마음을 차분히 가라앉히는 기술이 필요해요.
          </div>
        </div>

        {/* Right: Sandbox Thermometer Slots Activity (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  [{familyData.name}] 온도계 조립 도전
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  아래 카드를 눌러 1단계(약함)부터 3단계(강함)까지 맞춰보세요.
                </p>
              </div>

              <button
                onClick={handleReset}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>비우기</span>
              </button>
            </div>

            {/* Slots */}
            <div className="mt-4 space-y-2.5">
              {/* Level 3 */}
              <div
                onClick={() => handleRemoveFromSlot(2)}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  slots[2]
                    ? 'bg-rose-50 border-rose-300'
                    : 'bg-slate-50 border-dashed border-rose-200 hover:bg-rose-50/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    3단
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-rose-700">3단계: 100°C 펄펄 끓는 격렬한 감정</span>
                    {slots[2] ? (
                      <p className="text-base font-bold text-slate-900 mt-0.5">{slots[2]?.word}</p>
                    ) : (
                      <p className="text-xs text-slate-600 italic">가장 강한 단어를 놓아주세요</p>
                    )}
                  </div>
                </div>
                {slots[2] && <span className="text-xs text-rose-600 hover:underline">취소</span>}
              </div>

              {/* Level 2 */}
              <div
                onClick={() => handleRemoveFromSlot(1)}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  slots[1]
                    ? 'bg-amber-50 border-amber-300'
                    : 'bg-slate-50 border-dashed border-amber-200 hover:bg-amber-50/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    2단
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-amber-700">2단계: 65°C 분명한 중간 감정</span>
                    {slots[1] ? (
                      <p className="text-base font-bold text-slate-900 mt-0.5">{slots[1]?.word}</p>
                    ) : (
                      <p className="text-xs text-slate-600 italic">중간 세기의 단어를 놓아주세요</p>
                    )}
                  </div>
                </div>
                {slots[1] && <span className="text-xs text-amber-600 hover:underline">취소</span>}
              </div>

              {/* Level 1 */}
              <div
                onClick={() => handleRemoveFromSlot(0)}
                className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  slots[0]
                    ? 'bg-yellow-50 border-yellow-300'
                    : 'bg-slate-50 border-dashed border-yellow-200 hover:bg-yellow-50/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-yellow-400 text-amber-950 font-bold text-xs flex items-center justify-center shrink-0">
                    1단
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-yellow-800">1단계: 36°C 은은한 미온 약한 감정</span>
                    {slots[0] ? (
                      <p className="text-base font-bold text-slate-900 mt-0.5">{slots[0]?.word}</p>
                    ) : (
                      <p className="text-xs text-slate-600 italic">가장 가벼운 단어를 놓아주세요</p>
                    )}
                  </div>
                </div>
                {slots[0] && <span className="text-xs text-yellow-700 hover:underline">취소</span>}
              </div>
            </div>

            {/* Word Bank Cards */}
            <div className="mt-5 pt-3 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700 block mb-2">선택할 단어 카드:</span>
              <div className="grid grid-cols-3 gap-2">
                {familyWords.map((word) => {
                  const isPlaced = placedWordIds.includes(word.id);
                  return (
                    <button
                      key={word.id}
                      onClick={() => !isPlaced && handlePlaceWord(word)}
                      disabled={isPlaced}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isPlaced
                          ? 'bg-slate-100 border-slate-200 opacity-40 cursor-not-allowed'
                          : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 shadow-xs cursor-pointer'
                      }`}
                    >
                      <span className="text-sm font-bold text-slate-900 block">{word.word}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Feedback notification */}
            {testResult && (
              <div
                className={`mt-4 p-3 rounded-xl border flex items-start gap-2.5 text-xs animate-fadeIn ${
                  testResult.isSuccess
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                {testResult.isSuccess ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold">{testResult.isSuccess ? '측정 성공!' : '다시 확인'}</span>
                  <p className="mt-0.5">{testResult.message}</p>
                </div>
              </div>
            )}
          </div>

          {/* Check Button */}
          <div className="mt-6 pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleCheckAnswer}
              disabled={slots.some((s) => s === null)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                slots.every((s) => s !== null)
                  ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer active:scale-95'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              실험 결과 확인하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
