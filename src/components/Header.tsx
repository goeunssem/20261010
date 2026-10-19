import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  currentTab: 'stages' | 'dictionary' | 'lab' | 'journal' | 'badges';
  onSelectTab: (tab: 'stages' | 'dictionary' | 'lab' | 'journal' | 'badges') => void;
  collectedCount: number;
  totalCount: number;
  isDoctorUnlocked: boolean;
  onOpenDoctorModal?: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  studentName: string;
  onEditStudentName: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  collectedCount,
  totalCount,
  isDoctorUnlocked,
  onOpenDoctorModal,
  isMuted,
  onToggleMute,
  studentName,
  onEditStudentName,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single element wordmark */}
        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('stages');
          }}
          className="text-left flex items-center gap-2 group cursor-pointer focus-visible:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            🌡️
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors whitespace-nowrap shrink-0">
              감정 단어 탐험대
            </span>
            <span className="text-[11px] text-slate-600 font-medium whitespace-nowrap">
              초등 3~4학년 감정 어휘 교실
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 single-line clean navigation tabs */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-sm font-medium">
          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('stages');
            }}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'stages'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            이야기 탐험
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('dictionary');
            }}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'dictionary'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>감정 도감</span>
            <span className="text-xs font-mono tabular-nums px-1.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
              {collectedCount}/{totalCount}
            </span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('lab');
            }}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'lab'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            온도계 실험실
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('journal');
            }}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'journal'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            마음 일기
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onSelectTab('badges');
            }}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'badges'
                ? 'bg-amber-100 text-amber-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>배지 & 수료증</span>
            {isDoctorUnlocked && <span className="text-xs">👑</span>}
          </button>
        </nav>

        {/* Zone 3: 1 primary action & settings */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? '소리 켜기' : '소리 끄기'}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label={isMuted ? '소리 켜기' : '소리 끄기'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
          </button>

          {/* Student Profile / Name */}
          <button
            onClick={onEditStudentName}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 text-xs text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap"
            title="탐험대원 이름 바꾸기"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold">{studentName} 대원</span>
          </button>

          {/* Doctor Badge CTA if unlocked */}
          {isDoctorUnlocked && onOpenDoctorModal && (
            <button
              onClick={() => {
                sound.playDoctorFanfare();
                onOpenDoctorModal();
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-950 bg-gradient-to-r from-amber-300 to-yellow-400 rounded-lg shadow-sm hover:brightness-105 transition-all whitespace-nowrap shrink-0 animate-pulse"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>감정 박사 배지</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-200/80 bg-slate-50/90 text-xs overflow-x-auto">
        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('stages');
          }}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'stages' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-slate-600'
          }`}
        >
          📖 이야기
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('dictionary');
          }}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'dictionary' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-slate-600'
          }`}
        >
          📚 도감 ({collectedCount}/{totalCount})
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('lab');
          }}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'lab' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-slate-600'
          }`}
        >
          🌡️ 실험실
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('journal');
          }}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'journal' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-slate-600'
          }`}
        >
          ✏️ 일기
        </button>
        <button
          onClick={() => {
            sound.playClick();
            onSelectTab('badges');
          }}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            currentTab === 'badges' ? 'bg-amber-200 text-amber-900 font-bold' : 'text-slate-600'
          }`}
        >
          🏆 배지
        </button>
      </div>
    </header>
  );
};
