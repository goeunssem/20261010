import React, { useState } from 'react';
import { Badge } from '../types/emotion';
import { BADGES } from '../data/badges';
import { sound } from '../utils/sound';
import {
  Award,
  Crown,
  Compass,
  ThermometerSun,
  BookOpen,
  HeartHandshake,
  Flag,
  Printer,
  Sparkles,
  CheckCircle2,
  Lock,
  Edit2
} from 'lucide-react';

interface BadgesAndCertificateViewProps {
  unlockedBadgeIds: string[];
  isDoctorUnlocked: boolean;
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  collectedCount: number;
  totalCount: number;
}

export const BadgesAndCertificateView: React.FC<BadgesAndCertificateViewProps> = ({
  unlockedBadgeIds,
  isDoctorUnlocked,
  studentName,
  onUpdateStudentName,
  collectedCount,
  totalCount,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);

  const getBadgeIcon = (iconName: string, isUnlocked: boolean) => {
    const className = `w-7 h-7 ${isUnlocked ? 'text-amber-500' : 'text-slate-400'}`;
    switch (iconName) {
      case 'Crown':
        return <Crown className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'ThermometerSun':
        return <ThermometerSun className={className} />;
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      case 'Flag':
        return <Flag className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  const handlePrintCertificate = () => {
    sound.playClick();
    window.print();
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateStudentName(tempName.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Doctor Badge Grand Hero Showcase */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border transition-all ${
          isDoctorUnlocked
            ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-300 shadow-md'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* Grand Badge Emblem */}
            <div className="relative">
              <div
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center text-4xl shadow-lg border-4 transition-transform ${
                  isDoctorUnlocked
                    ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-amber-200 animate-bounce'
                    : 'bg-slate-100 border-slate-200 text-slate-300'
                }`}
              >
                {isDoctorUnlocked ? '👑' : <Lock className="w-10 h-10 text-slate-400" />}
              </div>
              {isDoctorUnlocked && (
                <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                  <span className="bg-amber-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                    최고 영예
                  </span>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {isDoctorUnlocked ? '👑 감정 박사 배지 획득!' : '감정 박사 배지'}
                </h2>
                {isDoctorUnlocked && <Sparkles className="w-6 h-6 text-amber-500 shrink-0" />}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg leading-relaxed">
                {isDoctorUnlocked
                  ? '축하합니다! 모든 감정 어휘의 온도를 맞히고 도감을 완성하여 정식 "감정 박사"가 되었습니다!'
                  : `도감의 18개 감정 단어를 모두 모으면 최고 영예인 '감정 박사' 배지와 공식 수료증이 수여됩니다. (현재 ${collectedCount}/${totalCount}개)`}
              </p>
            </div>
          </div>

          {isDoctorUnlocked && (
            <button
              onClick={handlePrintCertificate}
              className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm shrink-0 transition-transform active:scale-95"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>감정 박사 임명장 인쇄하기</span>
            </button>
          )}
        </div>
      </div>

      {/* Official Printable Certificate (Visible when Doctor is Unlocked or Previewable) */}
      {isDoctorUnlocked && (
        <div className="print:block bg-white rounded-3xl border-4 border-amber-300 p-8 sm:p-12 shadow-lg relative overflow-hidden">
          {/* Certificate Decorative Border */}
          <div className="border-2 border-dashed border-amber-200 rounded-2xl p-6 sm:p-10 text-center relative">
            {/* Top Seal */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 mx-auto flex items-center justify-center text-2xl shadow-md border-2 border-white mb-4">
              🎓
            </div>

            <span className="text-xs tracking-widest text-amber-800 font-bold block mb-1">
              제 2026-EMO-호
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              감 정 박 사 임 명 장
            </h1>
            <p className="text-xs text-amber-700 font-semibold mb-6">
              Certificate of Emotion Master
            </p>

            {/* Recipient Student Name with inline edit */}
            <div className="my-6 py-2 px-4 inline-flex items-center gap-2 border-b-2 border-slate-900 text-xl sm:text-2xl font-bold text-slate-900">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="border border-amber-400 rounded px-2 py-0.5 text-base text-center font-bold"
                    autoFocus
                  />
                  <button type="submit" className="text-xs bg-amber-500 text-white px-2 py-1 rounded">
                    저장
                  </button>
                </form>
              ) : (
                <>
                  <span>초등학교 3~4학년 <strong>{studentName}</strong> 어린이</span>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 text-slate-400 hover:text-amber-600 print:hidden"
                    title="이름 수정하기"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Commendation Body */}
            <div className="max-w-xl mx-auto my-6 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              <p>
                위 어린이는 『감정 단어 탐험대』의 모든 이야기 퀘스트를 훌륭하게 수행하고,
                은은한 미온(36°C)부터 펄펄 끓는 격렬함(100°C)까지
                <strong> 18가지 감정 단어의 세기와 마음의 변화</strong>를 깊이 있게 탐구하였습니다.
              </p>
              <p className="mt-3">
                타인의 마음에 따뜻하게 공감하고 자신의 감정을 풍부한 어휘로 표현할 수 있는
                우수한 능력을 갖추었으므로, 이에 <strong>최고의 '감정 박사'</strong>로 임명합니다.
              </p>
            </div>

            {/* Issue Date & Authority Stamp */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
              <div className="text-left">
                <span>수여일: </span>
                <span className="font-semibold text-slate-900">
                  {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 text-base">감정단어탐험대 연구원장</span>
                <div className="w-12 h-12 rounded-full border-2 border-rose-500 bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs rotate-[-12deg] shadow-xs">
                  직인생략
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Badges Grid (All Badges in Game) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">탐험대 업적 배지 목록</h3>
            <p className="text-xs text-slate-500">이야기를 해결하고 온도계를 맞히며 배지를 모아보세요.</p>
          </div>
          <span className="text-xs font-mono tabular-nums text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
            달성: {unlockedBadgeIds.length} / {BADGES.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES.map((badge) => {
            const isUnlocked = unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                  isUnlocked
                    ? badge.isDoctorBadge
                      ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-300 shadow-sm'
                      : 'bg-white border-slate-200 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                    isUnlocked ? 'bg-amber-100' : 'bg-slate-200'
                  }`}
                >
                  {getBadgeIcon(badge.icon, isUnlocked)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{badge.title}</h4>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
