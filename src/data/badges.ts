import { Badge } from '../types/emotion';

export const BADGES: Badge[] = [
  {
    id: 'badge-first-step',
    title: '감정 탐험의 첫걸음',
    description: '첫 번째 상황 이야기 속 감정을 밝혀내고 탐험을 시작했습니다.',
    icon: 'Compass',
  },
  {
    id: 'badge-thermometer-master',
    title: '온도계의 달인',
    description: '감정의 세기(약함-중간-강함)를 온도계에 바르게 배열했습니다.',
    icon: 'ThermometerSun',
  },
  {
    id: 'badge-collector',
    title: '감정 수집가',
    description: '감정 도감에 9개 이상의 감정 어휘 카드를 모았습니다.',
    icon: 'BookOpen',
  },
  {
    id: 'badge-empathy-master',
    title: '따뜻한 공감 천사',
    description: '친구들의 다양한 상황에 깊이 공감하고 마음을 읽어주었습니다.',
    icon: 'HeartHandshake',
  },
  {
    id: 'badge-perfect-explorer',
    title: '탐험대 대장',
    description: '모든 6개 스테이지의 감정 탐험 모험을 무사히 통과했습니다.',
    icon: 'Flag',
  },
  {
    id: 'badge-doctor',
    title: '👑 최고의 감정 박사',
    description: '18가지 모든 감정 어휘를 도감에 모으고 세기를 완벽하게 정복한 최고의 감정 박사입니다!',
    icon: 'Crown',
    isDoctorBadge: true,
  },
];
