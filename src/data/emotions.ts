import { EmotionFamily, EmotionWord, StoryStage } from '../types/emotion';

export const EMOTION_FAMILIES: Record<string, EmotionFamily> = {
  anger: {
    id: 'anger',
    name: '화남 / 분노',
    englishName: 'Anger',
    iconName: 'Flame',
    themeColor: {
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-700',
      accent: 'bg-rose-500 hover:bg-rose-600 text-white',
      thermometerColor: 'from-amber-400 via-rose-500 to-red-600',
    },
    description: '일이 뜻대로 되지 않거나 억울하고 부당하다고 느낄 때 생기는 불꽃 같은 감정이에요.',
    adviceForKids: '화가 불쑥 치밀 땐 "멈춤! 하나, 둘, 셋" 속으로 세며 코로 깊게 숨을 들이마시고 입으로 내쉬어 보세요.',
  },
  joy: {
    id: 'joy',
    name: '기쁨 / 환호',
    englishName: 'Joy',
    iconName: 'Sun',
    themeColor: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-800',
      accent: 'bg-amber-500 hover:bg-amber-600 text-white',
      thermometerColor: 'from-yellow-300 via-amber-400 to-orange-500',
    },
    description: '바라던 좋은 일이 생기거나 따뜻한 사랑을 느낄 때 가슴이 콩닥콩닥 뛰고 활짝 웃게 되는 감정이에요.',
    adviceForKids: '기쁜 감정은 친구나 가족과 함께 나누면 빛이 되어 행복이 두 배로 커져요!',
  },
  sadness: {
    id: 'sadness',
    name: '슬픔 / 속상함',
    englishName: 'Sadness',
    iconName: 'CloudRain',
    themeColor: {
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      text: 'text-sky-800',
      accent: 'bg-sky-500 hover:bg-sky-600 text-white',
      thermometerColor: 'from-sky-300 via-blue-500 to-indigo-600',
    },
    description: '소중한 것을 잃거나 아쉬운 일이 있어 마음이 찌릿찌릿 아프고 눈물이 맺히는 감정이에요.',
    adviceForKids: '슬플 때는 참지 않고 울어도 괜찮아요. 믿을 수 있는 어른이나 친구에게 솔직한 마음을 털어놓아 보세요.',
  },
  fear: {
    id: 'fear',
    name: '두려움 / 공포',
    englishName: 'Fear',
    iconName: 'ShieldAlert',
    themeColor: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-800',
      accent: 'bg-purple-500 hover:bg-purple-600 text-white',
      thermometerColor: 'from-indigo-300 via-purple-500 to-violet-700',
    },
    description: '위험하거나 모르는 상황에 처했을 때 몸이 굳고 심장이 쿵쾅거리며 피하고 싶어지는 감정이에요.',
    adviceForKids: '두려움은 "위험하니 조심해!"라고 알려주는 우리 몸의 고마운 안전 경보기예요.',
  },
  embarrassment: {
    id: 'embarrassment',
    name: '부끄러움 / 당황',
    englishName: 'Embarrassment',
    iconName: 'Sparkles',
    themeColor: {
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      text: 'text-pink-800',
      accent: 'bg-pink-500 hover:bg-pink-600 text-white',
      thermometerColor: 'from-pink-300 via-rose-400 to-red-500',
    },
    description: '실수를 하거나 남들의 시선이 쏟아져 얼굴이 화끈거리고 쥐구멍에라도 숨고 싶어지는 감정이에요.',
    adviceForKids: '누구나 실수할 수 있어요! 머리를 긁적이며 "다음엔 더 잘해야지!" 하고 웃어넘겨 볼까요?',
  },
  pride: {
    id: 'pride',
    name: '뿌듯함 / 자부심',
    englishName: 'Pride',
    iconName: 'Award',
    themeColor: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-800',
      accent: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      thermometerColor: 'from-teal-300 via-emerald-500 to-green-600',
    },
    description: '열심히 노력하여 결과를 이루었을 때 가슴이 당당히 펴지고 스스로가 자랑스러워지는 감정이에요.',
    adviceForKids: '결과뿐 아니라 땀 흘려 노력한 나의 과정 자체를 아낌없이 칭찬해 주세요.',
  },
};

export const ALL_EMOTION_WORDS: EmotionWord[] = [
  // Anger Family
  {
    id: 'word-annoyance',
    word: '짜증',
    familyId: 'anger',
    intensityLevel: 1,
    intensityName: '1단계: 약한 불씨 (36°C)',
    temperature: 36,
    definition: '마음에 차지 않거나 귀찮아서 은근히 신경이 곤두서고 투덜거리고 싶은 가벼운 화.',
    exampleSentence: '수학 숙제를 하려는데 샤프심이 계속 뚝뚝 부러져서 짜증이 났다.',
    synonyms: ['성가심', '투덜거림'],
    hintTip: '몸에 열이 조금 나고 살짝 입이 삐죽 나오는 약한 불씨 상태예요.',
  },
  {
    id: 'word-anger',
    word: '화남',
    familyId: 'anger',
    intensityLevel: 2,
    intensityName: '2단계: 뜨거운 불길 (65°C)',
    temperature: 65,
    definition: '일이 몹시 마음에 들지 않거나 부당한 일을 겪어 속이 부글부글 끓고 얼굴이 붉어지는 마음.',
    exampleSentence: '동생이 내 허락도 없이 아끼는 장난감을 망가뜨려 몹시 화가 났다.',
    synonyms: ['성남', '노여움', '언짢음'],
    hintTip: '얼굴이 달아오르고 주먹이 쥐어지는 확실한 열기 상태예요.',
  },
  {
    id: 'word-fury',
    word: '분노',
    familyId: 'anger',
    intensityLevel: 3,
    intensityName: '3단계: 폭발하는 화산 (100°C)',
    temperature: 100,
    definition: '불길처럼 거세게 치밀어 올라 스스로 주체하기 어려울 정도로 몹시 크게 성난 감정.',
    exampleSentence: '친구가 내가 하지도 않은 나쁜 말을 지어내어 소문을 냈다는 사실에 분노를 느꼈다.',
    synonyms: ['격노', '극대노'],
    hintTip: '화산처럼 펄펄 끓어 넘치는 가장 강하고 폭발적인 단계예요.',
  },

  // Joy Family
  {
    id: 'word-pleased',
    word: '흐뭇함',
    familyId: 'joy',
    intensityLevel: 1,
    intensityName: '1단계: 따스한 봄햇살 (36°C)',
    temperature: 36,
    definition: '마음에 흡족하여 입가에 조용하고 따뜻한 미소가 살포시 번지는 기분.',
    exampleSentence: '길 잃은 할머니의 짐을 대신 들어드리고 나니 마음이 절로 흐뭇해졌다.',
    synonyms: ['훈훈함', '미소'],
    hintTip: '소리 지르지 않아도 가슴속이 잔잔하게 따뜻해지는 부드러운 기쁨이에요.',
  },
  {
    id: 'word-joy',
    word: '기쁨',
    familyId: 'joy',
    intensityLevel: 2,
    intensityName: '2단계: 반짝이는 무지개 (65°C)',
    temperature: 65,
    definition: '바라던 일이 이루어지거나 좋은 소식을 들어 마음에 밝고 환한 웃음꽃이 피어나는 마음.',
    exampleSentence: '오랫동안 보고 싶었던 단짝 친구가 깜짝 전학을 와서 기쁨을 감출 수 없었다.',
    synonyms: ['즐거움', '신남', '유쾌함'],
    hintTip: '얼굴 가득 웃음이 터지고 신나서 발걸음이 가벼워지는 기쁨이에요.',
  },
  {
    id: 'word-cheer',
    word: '환호',
    familyId: 'joy',
    intensityLevel: 3,
    intensityName: '3단계: 솟구치는 축제 (100°C)',
    temperature: 100,
    definition: '너무나도 기쁘고 벅차올라 온몸으로 펄쩍펄쩍 뛰며 큰 소리로 외치고 싶은 감정.',
    exampleSentence: '우리 반이 가을 운동회 계주 마지막 주자에서 기적처럼 역전승을 거두자 모두가 환호를 질렀다.',
    synonyms: ['열광', '벅참', '황홀'],
    hintTip: '두 팔을 번쩍 들고 목청껏 소리치고 싶을 만큼 가장 뜨거운 기쁨이에요.',
  },

  // Sadness Family
  {
    id: 'word-disappointment',
    word: '서운함',
    familyId: 'sadness',
    intensityLevel: 1,
    intensityName: '1단계: 잔잔한 안개 (36°C)',
    temperature: 36,
    definition: '바라던 기대에 어긋나거나 상대방의 무심함 때문에 가슴 한구석이 섭섭하고 허전한 마음.',
    exampleSentence: '내 생일인데 가장 친한 친구가 축하한다는 말을 깜빡해서 은근히 서운했다.',
    synonyms: ['섭섭함', '아쉬움', '시무룩'],
    hintTip: '눈물까지 펑펑 쏟아지진 않지만 가슴이 살짝 휑한 약한 슬픔이에요.',
  },
  {
    id: 'word-sadness',
    word: '슬픔',
    familyId: 'sadness',
    intensityLevel: 2,
    intensityName: '2단계: 주룩주룩 빗방울 (65°C)',
    temperature: 65,
    definition: '마음이 아프고 괴로워 가슴이 저리고 참았던 눈물이 볼을 타고 흘러내리는 감정.',
    exampleSentence: '아끼던 금붕어가 하늘나라로 떠났을 때 주체할 수 없는 슬픔이 밀려왔다.',
    synonyms: ['속상함', '애통함', '눈물'],
    hintTip: '목이 메이고 눈물이 뚝뚝 떨어지는 확실한 슬픔이에요.',
  },
  {
    id: 'word-grief',
    word: '비통',
    familyId: 'sadness',
    intensityLevel: 3,
    intensityName: '3단계: 쏟아지는 폭풍우 (100°C)',
    temperature: 100,
    definition: '가슴이 찢어지고 무너져 내릴 듯이 몹시 비참하고 깊어 말문조차 막히는 극한의 슬픔.',
    exampleSentence: '화재로 마을의 오랜 느티나무와 도서관이 잿더미가 된 현장을 보며 비통한 마음을 금할 수 없었다.',
    synonyms: ['참담함', '비탄', '절망'],
    hintTip: '마음이 꺾여 온 세상을 다 잃은 듯 깊게 무너져 내리는 가장 깊은 슬픔이에요.',
  },

  // Fear Family
  {
    id: 'word-tension',
    word: '긴장',
    familyId: 'fear',
    intensityLevel: 1,
    intensityName: '1단계: 두근두근 조마조마 (36°C)',
    temperature: 36,
    definition: '어떤 일을 앞두고 마음이 놓이지 않아 근육이 굳고 심장이 콩닥거리는 가벼운 불안.',
    exampleSentence: '학급 반장 선거 연설 순서가 다가오자 손바닥에 땀이 나고 긴장이 되었다.',
    synonyms: ['초조함', '떨림', '조마조마'],
    hintTip: '도망치고 싶을 정도는 아니지만 손에 땀이 나고 침을 꼴깍 삼키게 되는 단계예요.',
  },
  {
    id: 'word-scared',
    word: '무서움',
    familyId: 'fear',
    intensityLevel: 2,
    intensityName: '2단계: 덜덜 떨리는 그림자 (65°C)',
    temperature: 65,
    definition: '해를 입거나 위험할까 봐 두려워 몸이 오그라들고 저절로 뒷걸음질 치게 되는 마음.',
    exampleSentence: '어두컴컴한 골목길에서 목줄 없는 큰 개가 으르렁거리며 다가오자 무서움에 발이 굳었다.',
    synonyms: ['겁남', '두려움'],
    hintTip: '온몸에 소름이 돋고 뒷걸음질 치고 싶어지는 분명한 두려움이에요.',
  },
  {
    id: 'word-terror',
    word: '공포',
    familyId: 'fear',
    intensityLevel: 3,
    intensityName: '3단계: 얼어붙은 암흑 (100°C)',
    temperature: 100,
    definition: '극도로 위험하거나 끔찍한 위협 앞에 서서 온몸의 피가 마르는 듯 얼어붙는 극심한 두려움.',
    exampleSentence: '강한 지진으로 바닥이 심하게 흔들리고 교실 천장이 갈라지는 순간 공포에 휩싸였다.',
    synonyms: ['패닉', '경악', '극도의 공포'],
    hintTip: '도망칠 힘조차 빠지고 온몸이 꽁꽁 얼어붙는 가장 강렬한 공포예요.',
  },

  // Embarrassment Family
  {
    id: 'word-awkward',
    word: '머쓱함',
    familyId: 'embarrassment',
    intensityLevel: 1,
    intensityName: '1단계: 긁적긁적 어색함 (36°C)',
    temperature: 36,
    definition: '행동이 어색하거나 상황이 맞지 않아 멋쩍고 코끝이 간지러운 약한 부끄러움.',
    exampleSentence: '인사를 건넸는데 알고 보니 다른 사람을 부른 것이어서 머쓱하게 뒷머리를 긁었다.',
    synonyms: ['어색함', '멋쩍음', '쑥스러움'],
    hintTip: '머리를 긁적거리며 씩 웃고 넘어갈 수 있는 가벼운 쑥스러움이에요.',
  },
  {
    id: 'word-embarrassed',
    word: '부끄러움',
    familyId: 'embarrassment',
    intensityLevel: 2,
    intensityName: '2단계: 달아오르는 두 뺨 (65°C)',
    temperature: 65,
    definition: '자신의 실수나 창피한 상황 때문에 다른 사람의 시선이 신경 쓰여 얼굴이 빨개지는 마음.',
    exampleSentence: '국어 시간에 큰 소리로 책을 읽다가 엉뚱한 단어로 잘못 읽어서 부끄러움에 얼굴이 붉어졌다.',
    synonyms: ['창피함', '민망함', '수줍음'],
    hintTip: '귀 끝과 양 뺨이 달아오르고 책상 밑으로 숨고 싶어지는 단계예요.',
  },
  {
    id: 'word-shame',
    word: '수치심',
    familyId: 'embarrassment',
    intensityLevel: 3,
    intensityName: '3단계: 무너지는 자존심 (100°C)',
    temperature: 100,
    definition: '자신의 부끄러운 점이나 큰 허물이 드러나 견디기 힘들 정도로 뼈저리게 느끼는 깊은 수치.',
    exampleSentence: '거짓말을 하다가 모든 친구들 앞에서 들통났을 때 쥐구멍에라도 숨고 싶은 수치심을 느꼈다.',
    synonyms: ['치욕', '굴욕감'],
    hintTip: '자신의 도덕이나 양심이 무너져 온몸이 오그라들 만큼 가장 무거운 부끄러움이에요.',
  },

  // Pride Family
  {
    id: 'word-satisfaction',
    word: '만족',
    familyId: 'pride',
    intensityLevel: 1,
    intensityName: '1단계: 은은한 미소 (36°C)',
    temperature: 36,
    definition: '기대했던 바가 알맞게 채워져서 마음에 더 바랄 것이 없이 모자람이 없는 편안한 마음.',
    exampleSentence: '스스로 계획했던 방학 일과표대로 책 읽기를 마치고 나니 마음에 흡족한 만족이 찾아왔다.',
    synonyms: ['흡족함', '뿌듯한 안도'],
    hintTip: '조용히 고개를 끄덕이며 "이 정도면 충분히 좋아!"라고 느끼는 안정된 성취예요.',
  },
  {
    id: 'word-pride',
    word: '뿌듯함',
    familyId: 'pride',
    intensityLevel: 2,
    intensityName: '2단계: 활짝 펴진 어깨 (65°C)',
    temperature: 65,
    definition: '자신의 땀과 노력으로 어려운 일을 끝까지 해내어 가슴속에 차오르는 벅찬 보람.',
    exampleSentence: '도움이 필요한 1학년 동생에게 우산을 씌워 무사히 건널목을 건너게 해 준 뒤 뿌듯함을 느꼈다.',
    synonyms: ['보람', '대견함', '자랑스러움'],
    hintTip: '가슴이 활짝 펴지고 "내가 스스로 해냈어!"라는 기운이 차오르는 단계예요.',
  },
  {
    id: 'word-confidence',
    word: '자부심',
    familyId: 'pride',
    intensityLevel: 3,
    intensityName: '3단계: 눈부신 금메달 (100°C)',
    temperature: 100,
    definition: '자신의 능력이나 품격에 대하여 스스로 당당하고 귀하게 여기는 굳센 긍지와 명예로운 마음.',
    exampleSentence: '우리 학교를 대표하여 참가한 과학 탐구 대회에서 대상을 수상하고 가슴 벅찬 자부심을 가졌다.',
    synonyms: ['긍지', '자긍심', '위풍당당'],
    hintTip: '누구 앞에서도 당당히 나를 자랑스럽게 여길 수 있는 가장 굳세고 높은 성취의 감정이에요.',
  },
];

export const STORY_STAGES: StoryStage[] = [
  {
    id: 1,
    familyId: 'anger',
    title: '제1화: 박살 난 찰흙 공룡',
    protagonist: {
      name: '민우',
      grade: '3학년 2반',
      avatarEmoji: '🦖',
    },
    storyContent:
      '미술 시간에 민우는 이쑤시개와 찰흙으로 티라노사우루스 공룡을 정성껏 만들었습니다. 말리기 위해 책상 구석에 조심스레 올려두었지요.\n\n그런데 쉬는 시간에 옆 반 친구가 복도를 전속력으로 뛰어가다가 민우의 책상을 쾅 치고 지나갔습니다! 공룡은 바닥에 곤두박질쳤고, 다리와 꼬리가 완전히 찌그러져 뭉개져 버렸습니다.',
    highlightPhrase: '"내 공룡이 완전히 찌그러졌잖아! 친구는 사과도 안 하고 가버렸어!"',
    phase1Question: '정성껏 만든 공룡이 부서진 것을 본 민우의 마음속 대표 감정은 무엇일까요?',
    phase1Options: [
      { id: 'anger', label: '화남 / 분노', explanation: '소중한 작품이 부서지고 친구가 사과도 없이 가서 속에서 불길이 일어났어요!' },
      { id: 'joy', label: '기쁨 / 환호', explanation: '공룡이 부서진 상황은 전혀 기쁜 일이 아니에요.' },
      { id: 'fear', label: '두려움 / 공포', explanation: '무서워서 도망치고 싶은 위험 상황과는 달라요.' },
      { id: 'pride', label: '뿌듯함 / 자부심', explanation: '노력이 망가져서 보람을 느끼기는 어려워요.' },
    ],
    phase1CorrectId: 'anger',
    phase2Instruction: '화난 감정도 상황에 따라 온도가 달라요! "짜증, 화남, 분노"를 약한 불씨(1단계)부터 펄펄 끓는 불(3단계)까지 온도계에 알맞게 배치해보세요.',
    wordsToArrange: [
      ALL_EMOTION_WORDS[0], // 짜증 (Level 1)
      ALL_EMOTION_WORDS[1], // 화남 (Level 2)
      ALL_EMOTION_WORDS[2], // 분노 (Level 3)
    ],
  },
  {
    id: 2,
    familyId: 'joy',
    title: '제2화: 시험지에 찍힌 100점',
    protagonist: {
      name: '하은',
      grade: '4학년 1반',
      avatarEmoji: '⭐',
    },
    storyContent:
      '하은이는 지난번 수학 단원 평가에서 분수 계산 실수를 많이 해서 무척 속상했습니다. 이번에는 방과 후마다 오답 공책을 꼼꼼히 풀며 열심히 공부했지요.\n\n오늘 선생님께서 채점된 시험지를 건네주셨습니다. 시험지 맨 위에 빨간 색연필로 커다랗게 "100점" 동그라미와 함께 "노력의 결실! 최고예요" 칭찬 도장이 찍혀 있었습니다!',
    highlightPhrase: '"와! 내가 열심히 노력하니까 정말 100점을 받았어! 너무 신나!"',
    phase1Question: '노력 끝에 100점 시험지와 칭찬을 받은 하은이의 마음속 감정은 무엇일까요?',
    phase1Options: [
      { id: 'sadness', label: '슬픔 / 속상함', explanation: '슬픈 눈물이 아니라 행복한 웃음이 터지는 순간이에요.' },
      { id: 'joy', label: '기쁨 / 환호', explanation: '열심히 노력한 보람이 빛나며 가슴 가득 환한 웃음꽃이 피었어요!' },
      { id: 'embarrassment', label: '부끄러움 / 당황', explanation: '부끄러운 상황이 아니라 칭찬받아 행복한 상황이에요.' },
      { id: 'anger', label: '화남 / 분노', explanation: '화가 날 이유가 전혀 없지요!' },
    ],
    phase1CorrectId: 'joy',
    phase2Instruction: '기쁜 마음도 잔잔한 미소부터 방방 뛰는 외침까지 세기가 달라요! "흐뭇함, 기쁨, 환호"를 온도계에 순서대로 올려놓아 볼까요?',
    wordsToArrange: [
      ALL_EMOTION_WORDS[3], // 흐뭇함 (Level 1)
      ALL_EMOTION_WORDS[4], // 기쁨 (Level 2)
      ALL_EMOTION_WORDS[5], // 환호 (Level 3)
    ],
  },
  {
    id: 3,
    familyId: 'sadness',
    title: '제3화: 텅 빈 강아지 밥그릇',
    protagonist: {
      name: '서연',
      grade: '3학년 4반',
      avatarEmoji: '🐶',
    },
    storyContent:
      '서연이가 집에 돌아오면 언제나 현관문 앞까지 꼬리를 흔들며 마중 나오던 강아지 초코. 그런데 오늘 초코가 갑자기 심하게 앓아서 동물병원 응급실에 입원하게 되었습니다.\n\n거실 한구석에 덩그러니 놓인 초코의 밥그릇과 인형을 바라보는데, 현관문 너머로 초코의 발소리가 들릴 것만 같아 서연이의 눈에서 눈물이 주르륵 흘러내렸습니다.',
    highlightPhrase: '"초코야, 많이 아프지 마... 네가 없는 거실이 너무 휑하고 눈물이 멈추지 않아."',
    phase1Question: '아픈 강아지의 빈자리를 보며 눈물 흘리는 서연이의 마음속 감정은 무엇일까요?',
    phase1Options: [
      { id: 'pride', label: '뿌듯함 / 자부심', explanation: '자부심을 느낄 수 있는 상황이 아니에요.' },
      { id: 'fear', label: '두려움 / 공포', explanation: '걱정되는 마음도 있지만 가슴이 시리고 눈물 나는 슬픔이 중심이에요.' },
      { id: 'sadness', label: '슬픔 / 속상함', explanation: '소중한 반려견이 아파서 가슴이 미어지고 눈물이 펑펑 나는 슬픔이에요.' },
      { id: 'embarrassment', label: '부끄러움 / 당황', explanation: '누군가에게 창피함을 느끼는 상황이 아니에요.' },
    ],
    phase1CorrectId: 'sadness',
    phase2Instruction: '슬픈 마음도 섭섭한 서운함부터 가슴이 무너지는 큰 슬픔까지 깊이가 달라요! "서운함, 슬픔, 비통"을 약한 단계부터 배치해보세요.',
    wordsToArrange: [
      ALL_EMOTION_WORDS[6], // 서운함 (Level 1)
      ALL_EMOTION_WORDS[7], // 슬픔 (Level 2)
      ALL_EMOTION_WORDS[8], // 비통 (Level 3)
    ],
  },
  {
    id: 4,
    familyId: 'fear',
    title: '제4화: 깜깜한 방과 후 과학실',
    protagonist: {
      name: '준호',
      grade: '4학년 3반',
      avatarEmoji: '🔦',
    },
    storyContent:
      '해가 뉘엿뉘엿 지고 학교에 아무도 남지 않은 늦은 오후, 준호는 과학실에 두고 온 관찰 일기장을 가지러 혼자 4층 복도로 올라갔습니다.\n\n복도의 불은 모두 꺼져 있어 어스름한 그림자만 드리워져 있었지요. 과학실 문을 열려는 순간, 저 안쪽 어두운 구석의 인체 골격 모형 뒤에서 "끼이익..." 낡은 창문 떨리는 소리가 났습니다. 준호는 털끝이 쭈뼛 서고 심장이 쿵쾅거렸습니다.',
    highlightPhrase: '"저기서 이상한 소리가 났어... 혹시 귀신이면 어떡하지? 다리가 덜덜 떨려."',
    phase1Question: '어둡고 조용한 과학실에서 괴이한 소리를 들은 준호의 감정은 무엇일까요?',
    phase1Options: [
      { id: 'joy', label: '기쁨 / 환호', explanation: '어둡고 무서운 상황에서 기쁨이 생길 수는 없지요.' },
      { id: 'fear', label: '두려움 / 공포', explanation: '위험을 느껴 몸이 움츠러들고 도망치고 싶은 두려움과 공포예요!' },
      { id: 'anger', label: '화남 / 분노', explanation: '창문 소리에 화를 내는 것이 아니라 겁을 먹은 상황이에요.' },
      { id: 'pride', label: '뿌듯함 / 자부심', explanation: '겁이 나는 순간이어서 자랑스러움과는 거리가 멀어요.' },
    ],
    phase1CorrectId: 'fear',
    phase2Instruction: '조마조마한 긴장감부터 온몸이 얼어붙는 공포까지! "긴장, 무서움, 공포"를 온도계에 세기별로 차례대로 놓아볼까요?',
    wordsToArrange: [
      ALL_EMOTION_WORDS[9],  // 긴장 (Level 1)
      ALL_EMOTION_WORDS[10], // 무서움 (Level 2)
      ALL_EMOTION_WORDS[11], // 공포 (Level 3)
    ],
  },
  {
    id: 5,
    familyId: 'embarrassment',
    title: '제5화: 전교생 앞의 꽈당',
    protagonist: {
      name: '지우',
      grade: '3학년 1반',
      avatarEmoji: '🍎',
    },
    storyContent:
      '월요일 아침, 전교생이 강당에 모인 아침 독서 릴레이 발표회. 지우는 반 대표로 소감문을 발표하기 위해 단상 위로 씩씩하게 걸어나갔습니다.\n\n그런데 마이크 전선에 발이 툭 걸리면서 "우당탕!" 큰 소리를 내며 그만 무대 한가운데에 엎어지고 말았습니다! 강당 안이 순간 조용해지고 수백 명의 친구들 눈동자가 지우를 향하자, 귀 끝까지 새빨개졌습니다.',
    highlightPhrase: '"으악! 전교생이 다 보는 앞에서 넘어지다니... 어디 쥐구멍이라도 있으면 숨고 싶어!"',
    phase1Question: '전교생 앞에서 실수로 넘어져 시선이 쏟아진 지우의 마음은 어떤 감정일까요?',
    phase1Options: [
      { id: 'embarrassment', label: '부끄러움 / 당황', explanation: '얼굴이 화끈거리고 창피해서 숨고 싶은 부끄러움과 당황스러운 마음이에요!' },
      { id: 'sadness', label: '슬픔 / 속상함', explanation: '다쳐서 슬픈 것보다 창피함과 붉어진 뺨이 핵심이에요.' },
      { id: 'joy', label: '기쁨 / 환호', explanation: '남들 앞에서 넘어진 것이 기쁠 리가 없지요.' },
      { id: 'fear', label: '두려움 / 공포', explanation: '생명의 위협을 느끼는 공포와는 다른 쑥스러움이에요.' },
    ],
    phase1CorrectId: 'embarrassment',
    phase2Instruction: '어색한 머쓱함부터 쥐구멍을 찾는 깊은 부끄러움까지! "머쓱함, 부끄러움, 수치심"의 세기를 구별하여 온도계에 올려보세요.',
    wordsToArrange: [
      ALL_EMOTION_WORDS[12], // 머쓱함 (Level 1)
      ALL_EMOTION_WORDS[13], // 부끄러움 (Level 2)
      ALL_EMOTION_WORDS[14], // 수치심 (Level 3)
    ],
  },
  {
    id: 6,
    familyId: 'pride',
    title: '제6화: 30일 줄넘기 마스터',
    protagonist: {
      name: '도윤',
      grade: '4학년 2반',
      avatarEmoji: '🏆',
    },
    storyContent:
      '도윤이는 2단 뛰기 줄넘기를 단 한 번도 연속으로 성공하지 못해서 체육 시간마다 자신이 없었습니다. 하지만 포기하지 않고 매일 방과 후 운동장에 남아 30분씩 줄을 돌렸습니다.\n\n한 달이 지난 오늘, 학교 줄넘기 급수 인증제에서 도윤이는 날렵하게 날아올라 무려 40회를 연속으로 성공시켰습니다! 선생님과 친구들이 박수를 쳤고, 도윤이의 가슴은 자랑스러움으로 벅차올랐습니다.',
    highlightPhrase: '"한 달 동안 포기하지 않고 땀 흘린 보람이 있어! 난 무엇이든 해낼 수 있어!"',
    phase1Question: '오랜 끈기와 노력으로 멋진 결과를 이루어낸 도윤이의 마음은 어떤 감정일까요?',
    phase1Options: [
      { id: 'pride', label: '뿌듯함 / 자부심', explanation: '스스로의 땀과 노력으로 결실을 맺어 가슴을 당당히 펴게 되는 뿌듯함과 자부심이에요!' },
      { id: 'anger', label: '화남 / 분노', explanation: '성공해서 기쁜 순간에 화가 날 이유는 없어요.' },
      { id: 'embarrassment', label: '부끄러움 / 당황', explanation: '칭찬받아 당당한 순간이므로 부끄럽지 않아요.' },
      { id: 'fear', label: '두려움 / 공포', explanation: '자신감이 넘치는 상태이므로 두려움이 아니에요.' },
    ],
    phase1CorrectId: 'pride',
    phase2Instruction: '마음의 흡족한 만족부터 눈부신 당당함까지! "만족, 뿌듯함, 자부심"을 은은한 미소(1단계)부터 금빛 자부심(3단계)까지 배치해보세요.',
    wordsToArrange: [
      ALL_EMOTION_WORDS[15], // 만족 (Level 1)
      ALL_EMOTION_WORDS[16], // 뿌듯함 (Level 2)
      ALL_EMOTION_WORDS[17], // 자부심 (Level 3)
    ],
  },
];
