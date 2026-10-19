import React, { useState, useEffect } from 'react';
import { EmotionWord, DailyLog, UserProgress } from './types/emotion';
import { ALL_EMOTION_WORDS, STORY_STAGES } from './data/emotions';
import { BADGES } from './data/badges';
import { sound } from './utils/sound';
import { Header } from './components/Header';
import { StoryStageView } from './components/StoryStageView';
import { EmotionDictionaryView } from './components/EmotionDictionaryView';
import { ThermometerLabView } from './components/ThermometerLabView';
import { DailyEmotionView } from './components/DailyEmotionView';
import { BadgesAndCertificateView } from './components/BadgesAndCertificateView';
import { DoctorCeremonyModal } from './components/DoctorCeremonyModal';
import { StudentNameModal } from './components/StudentNameModal';
import { RotateCcw, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'emotion_explorer_progress_v1';

export default function App() {
  const [studentName, setStudentName] = useState<string>('탐험이');
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [collectedWordIds, setCollectedWordIds] = useState<string[]>([]);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>([]);
  const [isDoctorUnlocked, setIsDoctorUnlocked] = useState<boolean>(false);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);

  // UI Navigation & Modals
  const [currentTab, setCurrentTab] = useState<'stages' | 'dictionary' | 'lab' | 'journal' | 'badges'>('stages');
  const [currentStageId, setCurrentStageId] = useState<number>(1);
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState<boolean>(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMuted(sound.getMuted());
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data: UserProgress = JSON.parse(saved);
        if (data.studentName) setStudentName(data.studentName);
        if (Array.isArray(data.completedStages)) setCompletedStages(data.completedStages);
        if (Array.isArray(data.collectedWordIds)) setCollectedWordIds(data.collectedWordIds);
        if (Array.isArray(data.unlockedBadgeIds)) setUnlockedBadgeIds(data.unlockedBadgeIds);
        if (typeof data.isDoctorUnlocked === 'boolean') setIsDoctorUnlocked(data.isDoctorUnlocked);
        if (Array.isArray(data.dailyLogs)) setDailyLogs(data.dailyLogs);
      }
    } catch {
      // LocalStorage error fallback
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      const data: UserProgress = {
        studentName,
        completedStages,
        collectedWordIds,
        unlockedBadgeIds,
        isDoctorUnlocked,
        dailyLogs,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore
    }
  }, [studentName, completedStages, collectedWordIds, unlockedBadgeIds, isDoctorUnlocked, dailyLogs]);

  // Handle stage completion
  const handleCompleteStage = (stageId: number, words: EmotionWord[]) => {
    // 1. Update completed stages
    const nextCompletedStages = Array.from(new Set([...completedStages, stageId]));
    setCompletedStages(nextCompletedStages);

    // 2. Add words to collected list
    const newWordIds = words.map((w) => w.id);
    const nextCollected = Array.from(new Set([...collectedWordIds, ...newWordIds]));
    setCollectedWordIds(nextCollected);

    // 3. Evaluate Badges
    const nextBadges = new Set(unlockedBadgeIds);

    // Badge 1: First Step
    if (!nextBadges.has('badge-first-step')) {
      nextBadges.add('badge-first-step');
    }

    // Badge 2: Thermometer Master
    if (!nextBadges.has('badge-thermometer-master')) {
      nextBadges.add('badge-thermometer-master');
    }

    // Badge 3: Collector (9+ words)
    if (nextCollected.length >= 9 && !nextBadges.has('badge-collector')) {
      nextBadges.add('badge-collector');
    }

    // Badge 4: Empathy Master (4+ stages)
    if (nextCompletedStages.length >= 4 && !nextBadges.has('badge-empathy-master')) {
      nextBadges.add('badge-empathy-master');
    }

    // Badge 5: Perfect Explorer (All 6 stages)
    if (nextCompletedStages.length >= STORY_STAGES.length && !nextBadges.has('badge-perfect-explorer')) {
      nextBadges.add('badge-perfect-explorer');
    }

    // Grand Doctor Badge: All 18 words collected!
    let justBecameDoctor = false;
    if (nextCollected.length >= ALL_EMOTION_WORDS.length) {
      if (!isDoctorUnlocked || !nextBadges.has('badge-doctor')) {
        nextBadges.add('badge-doctor');
        setIsDoctorUnlocked(true);
        justBecameDoctor = true;
      }
    }

    setUnlockedBadgeIds(Array.from(nextBadges));

    if (justBecameDoctor) {
      setTimeout(() => {
        setIsDoctorModalOpen(true);
      }, 700);
    }
  };

  const handleToggleMute = () => {
    const newState = sound.toggleMute();
    setIsMuted(newState);
  };

  const handleResetProgress = () => {
    if (window.confirm('정말로 처음부터 다시 시작하시겠습니까? 수집된 단어와 배지가 초기화됩니다.')) {
      setCompletedStages([]);
      setCollectedWordIds([]);
      setUnlockedBadgeIds([]);
      setIsDoctorUnlocked(false);
      setDailyLogs([]);
      setCurrentStageId(1);
      localStorage.removeItem(STORAGE_KEY);
      sound.playClick();
    }
  };

  const handleSaveDailyLog = (log: DailyLog) => {
    setDailyLogs([log, ...dailyLogs]);
  };

  const handleDeleteDailyLog = (id: string) => {
    setDailyLogs(dailyLogs.filter((l) => l.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        collectedCount={collectedWordIds.length}
        totalCount={ALL_EMOTION_WORDS.length}
        isDoctorUnlocked={isDoctorUnlocked}
        onOpenDoctorModal={() => setIsDoctorModalOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        studentName={studentName}
        onEditStudentName={() => setIsNameModalOpen(true)}
      />

      {/* Main View Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentTab === 'stages' && (
          <StoryStageView
            currentStageId={currentStageId}
            onSelectStageId={setCurrentStageId}
            completedStages={completedStages}
            onCompleteStage={handleCompleteStage}
            onGoToDictionary={() => setCurrentTab('dictionary')}
          />
        )}

        {currentTab === 'dictionary' && (
          <EmotionDictionaryView
            collectedWordIds={collectedWordIds}
            isDoctorUnlocked={isDoctorUnlocked}
            onOpenDoctorCeremony={() => setIsDoctorModalOpen(true)}
            onGoToStages={() => setCurrentTab('stages')}
          />
        )}

        {currentTab === 'lab' && <ThermometerLabView />}

        {currentTab === 'journal' && (
          <DailyEmotionView
            logs={dailyLogs}
            onSaveLog={handleSaveDailyLog}
            onDeleteLog={handleDeleteDailyLog}
            collectedWordIds={collectedWordIds}
          />
        )}

        {currentTab === 'badges' && (
          <BadgesAndCertificateView
            unlockedBadgeIds={unlockedBadgeIds}
            isDoctorUnlocked={isDoctorUnlocked}
            studentName={studentName}
            onUpdateStudentName={setStudentName}
            collectedCount={collectedWordIds.length}
            totalCount={ALL_EMOTION_WORDS.length}
          />
        )}
      </main>

      {/* Modals */}
      {isDoctorModalOpen && (
        <DoctorCeremonyModal
          studentName={studentName}
          onClose={() => setIsDoctorModalOpen(false)}
          onGoToCertificate={() => {
            setIsDoctorModalOpen(false);
            setCurrentTab('badges');
          }}
        />
      )}

      {isNameModalOpen && (
        <StudentNameModal
          currentName={studentName}
          onSave={setStudentName}
          onClose={() => setIsNameModalOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">감정 단어 탐험대</span>
            <span>· 초등학교 3~4학년 국어 및 사회정서(SEL) 어휘 학습</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono tabular-nums text-slate-600">
              수집 진행도: {collectedWordIds.length} / {ALL_EMOTION_WORDS.length} 단어
            </span>
            <button
              onClick={handleResetProgress}
              className="hover:text-rose-600 transition-colors flex items-center gap-1 text-[11px]"
              title="처음부터 다시 시작"
            >
              <RotateCcw className="w-3 h-3" />
              <span>진행도 초기화</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
