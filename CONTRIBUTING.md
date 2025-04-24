# 🛠️ Contributing to YT-TMI

환영합니다! 🎉  
YT-TMI는 YouTube 댓글 감정 분석을 위한 오픈소스 프로젝트입니다.  
이 프로젝트에 기여해주셔서 감사합니다. 아래 가이드라인을 따라주세요.

---

## 📌 프로젝트 목표

- 유튜브 영상의 댓글을 긍정/부정/중립으로 감정 분석
- 직관적이고 빠른 UX 제공
- 누구나 쉽게 분석 결과를 확인할 수 있는 오픈 도구

---

## 📦 개발 환경

- Next.js 14 (App Router)
- TypeScript
- React Query
- Tailwind CSS
- GCP Natural Language API

---

## 🧑‍💻 기여 방법

1. 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다.  
   예: `feature/chart-enhancement`, `fix/loading-spinner`
3. 기능을 추가하거나 버그를 수정한 후 커밋합니다.
4. `main` 브랜치로 Pull Request(PR)를 생성합니다.
5. 리뷰 후 머지됩니다.

---

## 🌳 브랜치 전략

| 브랜치 | 용도 |
|--------|------|
| `main` | 배포 및 릴리즈 대상 브랜치 |
| `feature/*` | 기능 개발용 브랜치 |
| `fix/*` | 버그 수정 브랜치 |
| `docs/*` | 문서 관련 브랜치 |

> ✅ **`main` 브랜치에는 직접 푸시할 수 없습니다. 반드시 PR을 사용해주세요.**

---

## ✅ 커밋 메시지 컨벤션

아래 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 스타일을 사용합니다:
| Type | 설명 |
|------|------|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 수정 |
| `style` | 코드 스타일 (포매팅 등) |
| `refactor` | 리팩토링 |
| `chore` | 빌드/패키지 설정 변경 등 |

**예시:**
feat: 댓글 감정 차트 시각화 추가
fix: API 응답 없는 경우 로딩 처리 수정
docs: README에 기여 가이드 추가
---

## 💄 코드 스타일

- Prettier 기반 코드 스타일을 따릅니다.
- `npm lint`, `npm format` 명령어로 확인할 수 있습니다.
- 커밋 전에는 항상 `npm lint` 통과 여부를 확인해주세요.

---

## 🧪 테스트

기능이 추가되면 간단한 테스트 환경 혹은 PR 설명에서 확인 가능한 방법을 알려주세요.  
추후 Playwright/Jest 기반 테스트가 추가될 예정입니다.

---

## 🔐 GCP 키 관련 안내

- 개인적으로 테스트할 경우 `gcp-key.json` 파일이 필요할 수 있습니다.
- 이 파일은 절대 Git에 업로드하지 말아주세요!
- Vercel 환경에서는 환경 변수 `GCP_CREDENTIALS_BASE64`를 사용합니다.

---

## 🙋‍♀️ 문의 & 제안

- Issue 또는 Discussion에 남겨주세요.
- PR을 보내기 전이라도 자유롭게 아이디어를 공유해 주세요!

---

감사합니다 🙏  
함께 좋은 프로젝트를 만들어가요!

> Made with ❤️ by tare