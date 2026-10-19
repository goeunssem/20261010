export type EmotionFamilyId = 
  | 'anger' 
  | 'joy' 
  | 'sadness' 
  | 'fear' 
  | 'embarrassment' 
  | 'pride';

export interface EmotionWord {
  id: string;
  word: string;
  familyId: EmotionFamilyId;
  intensityLevel: 1 | 2 | 3; // 1: 약함 (미온), 2: 중간 (온도 상승), 3: 강함 (펄펄 끓음)
  intensityName: string; // e.g., '1단계: 약함', '2단계: 중간', '3단계: 강함'
  temperature: number; // e.g., 36, 65, 100
  definition: string; // 초등 3~4학년 눈높이 사전 풀이
  exampleSentence: string; // 실생활 예문
  synonyms?: string[]; // 비슷한 말
  hintTip: string; // 세기를 구별하는 힌트
}

export interface EmotionFamily {
  id: EmotionFamilyId;
  name: string;
  englishName: string;
  iconName: string;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    thermometerColor: string;
  };
  description: string;
  adviceForKids: string; // 감정을 다루는 꿀팁
}

export interface StoryStage {
  id: number;
  familyId: EmotionFamilyId;
  title: string;
  protagonist: {
    name: string;
    grade: string;
    avatarEmoji: string;
  };
  storyContent: string;
  highlightPhrase: string;
  
  // Phase 1: 대표 감정 맞히기
  phase1Question: string;
  phase1Options: {
    id: EmotionFamilyId;
    label: string;
    explanation: string;
  }[];
  phase1CorrectId: EmotionFamilyId;
  
  // Phase 2: 온도계 배치하기
  phase2Instruction: string;
  wordsToArrange: EmotionWord[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  isDoctorBadge?: boolean;
  unlockedAt?: string | null;
}

export interface DailyLog {
  id: string;
  date: string;
  familyId: EmotionFamilyId;
  word: string;
  intensityLevel: number;
  note: string;
}

export interface UserProgress {
  studentName: string;
  completedStages: number[];
  collectedWordIds: string[];
  unlockedBadgeIds: string[];
  isDoctorUnlocked: boolean;
  doctorAwardedDate?: string;
  dailyLogs: DailyLog[];
}
