# 📺 YT-TMI | YouTube 댓글 감정 분석기

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![GitHub release](https://img.shields.io/github/v/release/junghwaYang/yt-tmi)](https://github.com/junghwaYang/yt-tmi/releases)

유튜브 영상의 댓글을 긍정/부정/중립으로 감정 분석하고, 시각적으로 분석 결과를 보여주는 웹 애플리케이션입니다.


---

## 🚀 배포 주소

🔗 [https://yt-tmi.vercel.app](https://yt-tmi.vercel.app)

---

## ⚙️ 주요 기능

- 🔍 YouTube 영상 ID 기반 댓글 수집
- 🤖 GCP Natural Language API를 활용한 감정 분석
- 📊 긍정 / 부정 / 중립 비율 시각화
- 🧭 필터링 및 페이지네이션 기능
- ☁️ Vercel을 통한 자동 배포 (main 브랜치 기준)

---

## 🛠 기술 스택

| 기술 | 설명 |
|------|------|
| **Next.js 14** | App Router 기반 React 프레임워크 |
| **TypeScript** | 정적 타입 언어 |
| **React Query** | API 상태 및 캐싱 관리 |
| **Tailwind CSS** | 유틸리티 기반 CSS |
| **GCP Natural Language API** | 댓글 감정 분석 |
| **Vercel** | 정적 배포 및 CI/CD |

---

## 🧪 감정 분석 기준

| 점수 범위 | 해석 |
|-----------|------|
| `> 0.1` | 긍정 |
| `< -0.1` | 부정 |
| 그 외 | 중립 |
| + `ㅋㅋ`, `ㅎㅎ`, `😂`, `🤣` 등 포함 | 강제 긍정 처리 |

---

## 📦 버전 관리
- 브랜치 전략: main, feature/*
- 커밋 컨벤션: feat, fix, refactor, docs, chore
- 버전 태그: v1.0.0 형식
- 릴리즈 설명은 GitHub Releases에서 관리

---

## 📌 TODO / 개선사항
- 댓글 다국어 자동 감지 후 번역
- 감정 분석 결과 다운로드 기능 (CSV)
- 감정 단어 하이라이트 표시
- 로그인 기반 저장 기능

---

## 📄 라이선스

본 프로젝트는 MIT License를 따릅니다.

---

## 👩‍💻 개발자 한마디

“댓글 분석이 필요할 때, 숫자보다 직관적인 감정을 전달하고 싶었습니다.”

- 개발자: 양정화(junghwa Yang)
- GitHub: [@junghwaYang](https://github.com/junghwaYang)

특정 섹션 커스터마이징 원하시면 말씀 주세요! 예: 다크모드, 이미지 추가, GCP Vision 연동 등.