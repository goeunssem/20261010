import React, { useState } from 'react';
import { EmotionWord, EmotionFamilyId } from '../types/emotion';
import { ALL_EMOTION_WORDS, EMOTION_FAMILIES } from '../data/emotions';
import { sound } from '../utils/sound';
import { speech } from '../utils/speech';
import {
  Search,
  Lock,
  Volume2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Filter,
  Thermometer,
  Award
} from 'lucide-react';

interface EmotionDictionaryViewProps {
  collectedWordIds: string[];
  isDoctorUnlocked: boolean;
  onOpenDoctorCeremony: () => void;
  onGoToStages: () => void;
}

export const EmotionDictionaryView: React.FC<EmotionDictionaryViewProps> = ({
  collectedWordIds,
  isDoctorUnlocked,
  onOpenDoctorCeremony,
  onGoToStages,
}) => {
  const [selectedFamilyFilter, setSelectedFamilyFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeWordDetail, setActiveWordDetail] = useState<EmotionWord | null>(null);

  const totalWords = ALL_EMOTION_WORDS.length;
  const collectedCount = collectedWordIds.length;
  const progressPercent = Math.round((collectedCount / totalWords) * 100);

  // Filter words
  const filteredWords = ALL_EMOTION_WORDS.filter((word) => {
    const matchesFamily = selectedFamilyFilter === 'all' || word.familyId === selectedFamilyFilter;
    const matchesSearch =
      word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      word.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFamily && matchesSearch;
  });

  const familiesList = [
    { id: 'all', label: '전체 보기', emoji: '🌈' },
    { id: 'anger', label: '화남 / 분노', emoji: '🔥' },
    { id: 'joy', label: '기쁨 / 환호', emoji: '🎉' },
    { id: 'sadness', label: '슬픔 / 속상함', emoji: '💧' },
    { id: 'fear', label: '두려움 / 공포', emoji: '⚡' },
    { id: 'embarrassment', label: '부끄러움 / 당황', emoji: '😳' },
    { id: 'pride', label: '뿌듯함 / 자부심', emoji: '🌟' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner: Collection Progress & Doctor Achievement */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <BookOpen className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">감정 단어 도감</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              상황 이야기 속 감정 온도계를 맞히면 도감에 새로운 단어가 수집됩니다. 18단어를 모두 모으면{' '}
              <strong className="text-amber-800 font-bold">감정 박사 배지</strong>를 받게 돼요!
            </p>
          </div>

          {/* Doctor Callout or Progress Gauge */}
          {isDoctorUnlocked ? (
            <button
              onClick={() => {
                sound.playDoctorFanfare();
                onOpenDoctorCeremony();
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm shrink-0 cursor-pointer animate-pulse"
            >
              <Award className="w-5 h-5 text-amber-900" />
              <span>👑 '감정 박사' 배지 & 상장 보기</span>
            </button>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 sm:w-64 shrink-0">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                <span>도감 수집 진행률</span>
                <span className="font-mono tabular-nums text-amber-700">
                  {collectedCount} / {totalWords} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Family Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {familiesList.map((f) => {
              const isSelected = selectedFamilyFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedFamilyFilter(f.id);
                  }}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 font-medium ${
                    isSelected
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                  }`}
                >
                  <span>{f.emoji}</span>
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="단어 또는 뜻 검색..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-400 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords.map((word) => {
          const isCollected = collectedWordIds.includes(word.id);
          const family = EMOTION_FAMILIES[word.familyId];

          if (!isCollected) {
            return (
              <div
                key={word.id}
                className="bg-slate-50/70 border border-dashed border-slate-300 rounded-2xl p-5 flex flex-col justify-between text-slate-400 relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                      <span>미수집 단어</span>
                    </div>
                    <span className="text-xs font-mono">{family.name}</span>
                  </div>

                  <div className="mt-4">
                    <span className="text-lg font-bold text-slate-400 tracking-wider">???</span>
                    <p className="text-xs text-slate-400 mt-2">
                      {family.name} 관련 이야기 퀘스트를 완료하면 도감에 등록됩니다!
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">온도: {word.temperature}°C</span>
                  <button
                    onClick={onGoToStages}
                    className="text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline"
                  >
                    이야기 탐험하기 →
                  </button>
                </div>
              </div>
            );
          }

          // Collected Card
          return (
            <div
              key={word.id}
              onClick={() => {
                sound.playClick();
                setActiveWordDetail(word);
              }}
              className="bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md rounded-2xl p-5 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header: Family badge & temperature level */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                    <span>{family.id === 'anger' ? '🔥' : family.id === 'joy' ? '🎉' : family.id === 'sadness' ? '💧' : family.id === 'fear' ? '⚡' : family.id === 'embarrassment' ? '😳' : '🌟'}</span>
                    <span>{family.name}</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        word.intensityLevel === 1
                          ? 'bg-yellow-100 text-yellow-800'
                          : word.intensityLevel === 2
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {word.intensityLevel}단계 ({word.temperature}°C)
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>

                {/* Word Display */}
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    {word.word}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speech.speak(`${word.word}. ${word.definition}`);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                    title="단어 읽기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Definition */}
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {word.definition}
                </p>
              </div>

              {/* Bottom: Example & Quick Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 truncate max-w-[170px]">
                  "{word.exampleSentence}"
                </span>
                <span className="text-amber-600 font-semibold group-hover:underline shrink-0">
                  사전 펼치기 →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Word Detail Modal */}
      {activeWordDetail && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {activeWordDetail.word}
                  </span>
                  <button
                    onClick={() =>
                      speech.speak(
                        `${activeWordDetail.word}. ${activeWordDetail.intensityName}. ${activeWordDetail.definition}. 예문, ${activeWordDetail.exampleSentence}`
                      )
                    }
                    className="p-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors"
                    title="단어와 예문 전체 듣기"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-xs text-slate-600 mt-1 block">
                  소속: {EMOTION_FAMILIES[activeWordDetail.familyId]?.name} 계열
                </span>
              </div>

              <button
                onClick={() => setActiveWordDetail(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xl p-1"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-4 text-sm">
              {/* Thermometer Temperature Gauge Bar */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center text-xs font-semibold mb-2">
                  <span className="text-slate-600 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                    <span>감정 온도계 세기</span>
                  </span>
                  <span className="font-bold text-amber-800">{activeWordDetail.intensityName}</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-300 via-amber-500 to-rose-600 transition-all duration-500 rounded-full"
                    style={{ width: `${activeWordDetail.temperature}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-mono">
                  <span>36°C (약함)</span>
                  <span>65°C (중간)</span>
                  <span>100°C (강함)</span>
                </div>
              </div>

              {/* Elementary Dictionary Definition */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">초등 국어 사전 풀이</span>
                <p className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl text-slate-800 leading-relaxed font-medium">
                  {activeWordDetail.definition}
                </p>
              </div>

              {/* Real World Example Sentence */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">생활 속 예문</span>
                <p className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-700 italic">
                  "{activeWordDetail.exampleSentence}"
                </p>
              </div>

              {/* Distinction Hint */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">세기 구별 꿀팁</span>
                <p className="text-xs text-slate-600 bg-rose-50/50 border border-rose-100 rounded-xl p-2.5">
                  💡 {activeWordDetail.hintTip}
                </p>
              </div>

              {/* Synonyms */}
              {activeWordDetail.synonyms && (
                <div>
                  <span className="text-xs font-bold text-slate-700 block mb-1">비슷한 말</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeWordDetail.synonyms.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveWordDetail(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
