import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { StoryStage, EmotionWord, EmotionFamilyId } from '../types/emotion';
import { STORY_STAGES, EMOTION_FAMILIES } from '../data/emotions';
import { EmotionThermometer } from './EmotionThermometer';
import { sound } from '../utils/sound';
import { speech } from '../utils/speech';
import {
  Volume2,
  VolumeX,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookMarked,
  Award,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface StoryStageViewProps {
  currentStageId: number;
  onSelectStageId: (stageId: number) => void;
  completedStages: number[];
  onCompleteStage: (stageId: number, words: EmotionWord[]) => void;
  onGoToDictionary: () => void;
}

export const StoryStageView: React.FC<StoryStageViewProps> = ({
  currentStageId,
  onSelectStageId,
  completedStages,
  onCompleteStage,
  onGoToDictionary,
}) => {
  const stage = STORY_STAGES.find((s) => s.id === currentStageId) || STORY_STAGES[0];
  const isStageCompleted = completedStages.includes(stage.id);

  // Phase 1 State (Choose primary emotion)
  const [selectedFamilyId, setSelectedFamilyId] = useState<EmotionFamilyId | null>(
    isStageCompleted ? stage.phase1CorrectId : null
  );
  const [phase1Feedback, setPhase1Feedback] = useState<{ isCorrect: boolean; message: string } | null>(
    isStageCompleted ? { isCorrect: true, message: '정답입니다! 주인공의 마음을 정확히 찾아냈어요.' } : null
  );
  const [isReadingStory, setIsReadingStory] = useState<boolean>(false);

  // Phase 2 State (Arrange in thermometer)
  // Initially if already completed, prefill correctly ordered words
  const sortedWords = [...stage.wordsToArrange].sort((a, b) => a.intensityLevel - b.intensityLevel);
  const [thermometerSlots, setThermometerSlots] = useState<(EmotionWord | null)[]>(
    isStageCompleted ? [sortedWords[0], sortedWords[1], sortedWords[2]] : [null, null, null]
  );
  const [isPhase2Passed, setIsPhase2Passed] = useState<boolean>(isStageCompleted);
  const [phase2Feedback, setPhase2Feedback] = useState<string | null>(
    isStageCompleted ? '모든 단어의 세기를 완벽하게 맞혔습니다!' : null
  );

  // Reset or initialize when switching stages
  useEffect(() => {
    const isCompleted = completedStages.includes(stage.id);
    if (isCompleted) {
      setSelectedFamilyId(stage.phase1CorrectId);
      setPhase1Feedback({ isCorrect: true, message: '정답입니다! 주인공의 마음을 정확히 찾아냈어요.' });
      const sorted = [...stage.wordsToArrange].sort((a, b) => a.intensityLevel - b.intensityLevel);
      setThermometerSlots([sorted[0], sorted[1], sorted[2]]);
      setIsPhase2Passed(true);
      setPhase2Feedback('모든 단어의 세기를 완벽하게 맞혔습니다!');
    } else {
      setSelectedFamilyId(null);
      setPhase1Feedback(null);
      setThermometerSlots([null, null, null]);
      setIsPhase2Passed(false);
      setPhase2Feedback(null);
    }
    speech.stop();
    setIsReadingStory(false);
  }, [currentStageId, stage, completedStages]);

  const handleReadStory = () => {
    if (isReadingStory) {
      speech.stop();
      setIsReadingStory(false);
    } else {
      sound.playClick();
      setIsReadingStory(true);
      const textToRead = `${stage.title}. ${stage.protagonist.name}의 이야기입니다. ${stage.storyContent} ${stage.highlightPhrase}`;
      speech.speak(textToRead, () => {
        setIsReadingStory(false);
      });
    }
  };

  // Phase 1 Option Select
  const handleSelectPhase1Option = (optionId: EmotionFamilyId) => {
    if (phase1Feedback?.isCorrect) return; // already locked

    sound.playCardSelect();
    setSelectedFamilyId(optionId);

    const chosenOption = stage.phase1Options.find((o) => o.id === optionId);
    if (optionId === stage.phase1CorrectId) {
      sound.playCorrect();
      setPhase1Feedback({
        isCorrect: true,
        message: `정답이에요! ${chosenOption?.explanation || ''}`,
      });
    } else {
      sound.playWrong();
      setPhase1Feedback({
        isCorrect: false,
        message: `아쉬워요! ${chosenOption?.explanation || '다시 한번 상황을 읽고 마음을 헤아려 보세요.'}`,
      });
    }
  };

  // Phase 2 Verify Thermometer
  const handleVerifyThermometer = () => {
    const isSlot1Correct = thermometerSlots[0]?.intensityLevel === 1;
    const isSlot2Correct = thermometerSlots[1]?.intensityLevel === 2;
    const isSlot3Correct = thermometerSlots[2]?.intensityLevel === 3;

    if (isSlot1Correct && isSlot2Correct && isSlot3Correct) {
      sound.playCorrect();
      setIsPhase2Passed(true);
      setPhase2Feedback('대단해요! 약한 감정부터 펄펄 끓는 감정까지 알맞게 온도계에 올려놓았어요.');

      // Trigger Confetti effect
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6'],
        });
      } catch {
        // Confetti fallback
      }

      // Mark stage complete and collect words
      onCompleteStage(stage.id, stage.wordsToArrange);
    } else {
      sound.playWrong();
      let hintMsg = '온도계 순서가 조금 달라요! ';
      if (!isSlot1Correct && !isSlot3Correct) {
        hintMsg += '가장 약한 1단계와 가장 격렬한 3단계 단어가 바뀌지 않았는지 살펴보세요.';
      } else if (!isSlot2Correct) {
        hintMsg += '중간 세기(2단계) 단어가 알맞은 위치인지 확인해 보세요.';
      } else {
        hintMsg += '단어 옆 힌트를 참고하여 다시 배치해 보세요!';
      }
      setPhase2Feedback(hintMsg);
    }
  };

  const handleNextStage = () => {
    sound.playClick();
    if (currentStageId < STORY_STAGES.length) {
      onSelectStageId(currentStageId + 1);
    }
  };

  const familyData = EMOTION_FAMILIES[stage.familyId];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Stage Carousel / Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
          {STORY_STAGES.map((s, idx) => {
            const isCompleted = completedStages.includes(s.id);
            const isCurrent = s.id === stage.id;

            return (
              <button
                key={s.id}
                onClick={() => {
                  sound.playClick();
                  onSelectStageId(s.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{s.protagonist.avatarEmoji}</span>
                <span>{idx + 1}화</span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Story Vignette Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        {/* Story Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner">
              {stage.protagonist.avatarEmoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{stage.title}</h2>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                주인공: {stage.protagonist.name} ({stage.protagonist.grade})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleReadStory}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                isReadingStory
                  ? 'bg-amber-100 border-amber-300 text-amber-900 animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {isReadingStory ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-500" />
                  <span>읽기 멈추기</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-600" />
                  <span>이야기 소리로 듣기</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Story Text Content */}
        <div className="mt-6 space-y-4">
          <p className="text-base sm:text-lg text-slate-800 leading-relaxed whitespace-pre-line font-medium">
            {stage.storyContent}
          </p>

          <div className="p-4 bg-amber-50/70 border-l-4 border-amber-400 rounded-r-xl">
            <p className="text-amber-950 font-bold italic text-base sm:text-lg">{stage.highlightPhrase}</p>
          </div>
        </div>

        {/* Phase 1: Emotion Identification Activity */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <div className="mb-4">
            <span className="text-xs font-bold text-amber-700 tracking-wider">1단계 탐험 퀘스트</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">{stage.phase1Question}</h3>
            <p className="text-xs text-slate-600 mt-0.5">주인공의 마음에 가장 가까운 감정 카드를 골라보세요.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {stage.phase1Options.map((option) => {
              const isSelected = selectedFamilyId === option.id;
              const isPassed = phase1Feedback?.isCorrect && isSelected;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectPhase1Option(option.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                    isPassed
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-sm'
                      : isSelected && !phase1Feedback?.isCorrect
                      ? 'bg-rose-50 border-rose-300'
                      : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {option.id === 'anger'
                        ? '🔥'
                        : option.id === 'joy'
                        ? '🎉'
                        : option.id === 'sadness'
                        ? '💧'
                        : option.id === 'fear'
                        ? '⚡'
                        : option.id === 'embarrassment'
                        ? '😳'
                        : '🌟'}
                    </span>
                    <div>
                      <span className="text-base font-bold text-slate-900 block">{option.label}</span>
                      <span className="text-xs text-slate-600 line-clamp-1">{option.explanation}</span>
                    </div>
                  </div>

                  {isPassed && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Phase 1 Feedback Notification */}
          {phase1Feedback && (
            <div
              className={`mt-4 p-3.5 rounded-xl border flex items-start gap-3 animate-fadeIn ${
                phase1Feedback.isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}
            >
              {phase1Feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              )}
              <div className="text-sm">
                <span className="font-bold">{phase1Feedback.isCorrect ? '정답 확인!' : '다시 생각해 볼까요?'}</span>
                <p className="mt-0.5 text-slate-700">{phase1Feedback.message}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phase 2: Thermometer Arrangement Activity */}
      {phase1Feedback?.isCorrect && (
        <div className="animate-fadeIn space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-amber-950">
                2단계 퀘스트 해금! 같은 '{familyData?.name}' 감정이라도 세기에 따라 부르는 단어가 달라요.
              </span>
            </div>
          </div>

          <EmotionThermometer
            words={stage.wordsToArrange}
            slots={thermometerSlots}
            onSlotsChange={setThermometerSlots}
            onVerify={handleVerifyThermometer}
            isCompleted={isPhase2Passed}
            themeColorClass={familyData?.themeColor?.thermometerColor || ''}
          />

          {/* Phase 2 Feedback Box */}
          {phase2Feedback && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 animate-fadeIn ${
                isPhase2Passed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              {isPhase2Passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="text-sm flex-1">
                <span className="font-bold">{isPhase2Passed ? '🎉 탐험 성공!' : '온도계를 다시 조절해보세요'}</span>
                <p className="mt-0.5 text-slate-700">{phase2Feedback}</p>

                {/* Educational SEL Tip on completion */}
                {isPhase2Passed && familyData && (
                  <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-start gap-2 text-xs text-emerald-800">
                    <HeartHandshake className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">선생님의 마음 다스리기 꿀팁: </span>
                      <span>{familyData.adviceForKids}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Stage Cleared Next Step Navigation Strip */}
          {isPhase2Passed && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">새로운 감정 단어 3개가 도감에 수집되었습니다!</h4>
                  <p className="text-xs text-slate-600">
                    수집된 단어: {stage.wordsToArrange.map((w) => w.word).join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <button
                  onClick={onGoToDictionary}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
                >
                  <BookMarked className="w-4 h-4 text-amber-600" />
                  <span>감정 도감 확인</span>
                </button>

                {currentStageId < STORY_STAGES.length ? (
                  <button
                    onClick={handleNextStage}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>다음 이야기로 가기</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onGoToDictionary}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <span>모든 탐험 완료! 감정 박사 보러 가기</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prev / Next Bottom Quick Buttons */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
        <button
          onClick={() => {
            if (currentStageId > 1) {
              sound.playClick();
              onSelectStageId(currentStageId - 1);
            }
          }}
          disabled={currentStageId <= 1}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 ${
            currentStageId <= 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>이전 이야기</span>
        </button>

        <span className="font-mono tabular-nums">
          {stage.id} / {STORY_STAGES.length} 화
        </span>

        <button
          onClick={() => {
            if (currentStageId < STORY_STAGES.length) {
              sound.playClick();
              onSelectStageId(currentStageId + 1);
            }
          }}
          disabled={currentStageId >= STORY_STAGES.length}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 ${
            currentStageId >= STORY_STAGES.length ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'
          }`}
        >
          <span>다음 이야기</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
