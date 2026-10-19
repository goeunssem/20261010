import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';
import { Sparkles, Award, Printer, ArrowRight } from 'lucide-react';

interface DoctorCeremonyModalProps {
  studentName: string;
  onClose: () => void;
  onGoToCertificate: () => void;
}

export const DoctorCeremonyModal: React.FC<DoctorCeremonyModalProps> = ({
  studentName,
  onClose,
  onGoToCertificate,
}) => {
  useEffect(() => {
    sound.playDoctorFanfare();

    // Multistage confetti burst
    const end = Date.now() + 2 * 1000;
    const colors = ['#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899'];

    (function frame() {
      try {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
      } catch {
        // Confetti fallback
      }

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 text-center shadow-2xl border-4 border-amber-300 relative overflow-hidden animate-fadeIn">
        {/* Floating Confetti and Star Badges */}
        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 mx-auto flex items-center justify-center text-5xl shadow-xl border-4 border-white mb-4 animate-bounce">
          👑
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>감정 단어 탐험대 최고 명예 수여</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          축하합니다! '{studentName}' 대원,
          <br />
          <span className="text-amber-600">공식 '감정 박사'</span>가 되었습니다!
        </h2>

        <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          모든 상황 이야기 속 감정을 밝히고, 18가지 단어의 온도를 완벽하게 맞혀 감정 도감을 모두 채웠습니다!
          이제 다른 사람의 마음을 깊이 이해하고 내 감정을 똑똑하게 표현할 수 있어요.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onGoToCertificate();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all"
          >
            <Award className="w-4 h-4 text-slate-950" />
            <span>감정 박사 임명장 보러 가기</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
