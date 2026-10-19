import React, { useState } from 'react';
import { DailyLog, EmotionFamilyId, EmotionWord } from '../types/emotion';
import { ALL_EMOTION_WORDS, EMOTION_FAMILIES } from '../data/emotions';
import { sound } from '../utils/sound';
import { Calendar, PenLine, Sparkles, Trash2, Heart } from 'lucide-react';

interface DailyEmotionViewProps {
  logs: DailyLog[];
  onSaveLog: (log: DailyLog) => void;
  onDeleteLog: (id: string) => void;
  collectedWordIds: string[];
}

export const DailyEmotionView: React.FC<DailyEmotionViewProps> = ({
  logs,
  onSaveLog,
  onDeleteLog,
  collectedWordIds,
}) => {
  const [selectedWordId, setSelectedWordId] = useState<string>(
    collectedWordIds[0] || ALL_EMOTION_WORDS[0].id
  );
  const [intensity, setIntensity] = useState<number>(2);
  const [note, setNote] = useState<string>('');

  const selectedWord = ALL_EMOTION_WORDS.find((w) => w.id === selectedWordId) || ALL_EMOTION_WORDS[0];
  const familyData = EMOTION_FAMILIES[selectedWord.familyId];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    sound.playCorrect();
    const newLog: DailyLog = {
      id: `log-${Date.now()}`,
      date: new Date().toLocaleDateString('ko-KR', {
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      }),
      familyId: selectedWord.familyId,
      word: selectedWord.word,
      intensityLevel: intensity,
      note: note.trim(),
    };

    onSaveLog(newLog);
    setNote('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">오늘 나의 감정 온도계</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              오늘 하루 학교와 일상에서 느꼈던 감정을 감정 단어로 콕 집어보고 온도를 기록해 보세요.
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <form onSubmit={handleSave} className="space-y-5">
          {/* Step 1: Choose Emotion Word */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              1. 오늘 내 마음에 가장 와닿은 감정 단어는?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {ALL_EMOTION_WORDS.map((w) => {
                const isSelected = w.id === selectedWordId;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedWordId(w.id);
                      setIntensity(w.intensityLevel);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-bold block">{w.word}</span>
                    <span className="text-[10px] text-slate-600">{w.temperature}°C</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Intensity Tier */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-700 block">
                2. 오늘 이 감정의 온도는 어땠나요?
              </span>
              <p className="text-xs text-slate-600 mt-0.5">
                선택한 단어: <strong className="text-slate-900">{selectedWord.word}</strong> ({familyData.name})
              </p>
            </div>

            <div className="flex items-center gap-2">
              {[1, 2, 3].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setIntensity(lvl);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    intensity === lvl
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {lvl === 1 ? '1단: 미온 (36°)' : lvl === 2 ? '2단: 온기 (65°)' : '3단: 폭발 (100°)'}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Thought / Situation Note */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              3. 어떤 일 때문에 이런 마음이 들었나요? (한 줄 일기)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="예: 오늘 체육 시간에 피구를 하다가 마지막까지 살아남아서 너무 뿌듯하고 기뻤다."
              rows={3}
              className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white resize-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <PenLine className="w-4 h-4 text-amber-400" />
              <span>오늘의 감정 일기 저장하기</span>
            </button>
          </div>
        </form>
      </div>

      {/* History Log List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>나의 감정 일기 기록 ({logs.length}개)</span>
          </h3>
        </div>

        {logs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
            아직 작성된 감정 일기가 없습니다. 오늘 나의 감정 온도를 기록해 보세요!
          </div>
        ) : (
          <div className="space-y-2.5">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start justify-between gap-4 animate-fadeIn"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-600">{log.date}</span>
                    <span className="text-xs font-bold text-slate-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {log.word}
                    </span>
                    <span className="text-[11px] text-rose-600 font-semibold">
                      {log.intensityLevel}단계 ({log.intensityLevel === 1 ? '36°C' : log.intensityLevel === 2 ? '65°C' : '100°C'})
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{log.note}</p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    onDeleteLog(log.id);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
