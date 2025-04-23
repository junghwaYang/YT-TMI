# 🎯 YT-TMI - YouTube 댓글 감정 분석기

유튜브 영상의 댓글을 수집하고, AI를 활용해 댓글 분위기를 분석하여 감정 분포와 대표 코멘트를 시각화해주는 웹 애플리케이션입니다.

---

## ✨ 주요 기능

- 🎥 YouTube 영상 URL 입력
- 💬 댓글 100개 수집 (YouTube Data API 사용)
- 🤖 AI 기반 감정 분석 (긍정 / 부정 / 중립)
- 📊 감정 비율 시각화 (차트)
- 🌟 감정별 대표 댓글 출력
- 🛠 직관적인 UI, 반응형 디자인

---

## 🚀 기술 스택

| 영역          | 기술                                                                             |
| ------------- | -------------------------------------------------------------------------------- |
| 프레임워크    | [Next.js](https://nextjs.org/) (App Router)                                      |
| 스타일링      | [Tailwind CSS](https://tailwindcss.com/)                                         |
| 상태관리      | React useState / useEffect                                                       |
| 데이터 시각화 | [Chart.js](https://www.chartjs.org/)                                             |
| 댓글 수집 API | [YouTube Data API v3](https://developers.google.com/youtube/v3)                  |
| 감정 분석 API | [OpenAI GPT-3.5](https://platform.openai.com/docs/guides/gpt) (또는 HuggingFace) |

---

## 📦 설치 및 실행 방법

```bash
# 1. 프로젝트 클론
git clone https://github.com/your-username/yt-tmi.git
cd yt-tmi

# 2. 패키지 설치
npm install

# 3. 환경변수 설정
touch .env.local
```

## .env.local에 다음 내용을 추가하세요

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
OPENAI_API_KEY=your_openai_key
```

```bash
# 4. 로컬 실행
npm run dev
```

## 📁 폴더 구조 예시

```
/app
  /page.tsx            // 메인 페이지
  /api/youtube.ts      // YouTube API 호출
  /api/ai.ts           // OpenAI 감정 분석 API 호출
/components
  /CommentList.tsx     // 댓글 리스트
  /SentimentChart.tsx  // 감정 비율 차트
  /Loading.tsx         // 로딩 UI
/utils
  /extractVideoId.ts   // 유튜브 링크에서 videoId 추출
```

## 🧠 향후 확장 아이디어

- [ ] 감정 트렌드 시계열 그래프
- [ ] 사용자 정의 감정 태그 (유머, 감동, 논쟁 등)
- [ ] 유저 로그인 및 분석 히스토리 저장
- [ ] 여러 영상 비교 기능
- [ ] 댓글 요약 기능 (TL;DR)

## 📜 라이선스

MIT License © 2025 Lua
