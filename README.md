This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# 프로젝트 개발 규칙

## 🌱 브랜치 네이밍 규칙

| 브랜치 종류 | 네이밍 규칙 예시                             |
| ----------- | -------------------------------------------- |
| 기능 개발   | `feat/{기능-설명}` → `feat/map-filter`       |
| 버그 수정   | `fix/{버그-설명}` → `fix/reservation-button` |
| 문서 작업   | `docs/{문서-내용}` → `docs/readme-update`    |
| 핫픽스      | `hotfix/{이슈-설명}` → `hotfix/deploy-error` |

## 🧾 네이밍 규칙

| 항목      | 방식             | 예시                |
| --------- | ---------------- | ------------------- |
| 폴더명    | kebab-case       | user-profile        |
| 컴포넌트  | PascalCase       | MeowCard.tsx        |
| 이미지    | kebab-case       | logo-icon.png       |
| 변수/함수 | camelCase        | fetchMeowData       |
| 환경변수  | UPPER_SNAKE_CASE | NEXT_PUBLIC_API_URL |

## 🌿 Git Branch 전략

| 브랜치명 | 목적                  |
| -------- | --------------------- |
| main     | 배포 전용 브랜치      |
| dev      | 통합 개발 브랜치      |
| feat/\*  | 기능 개발 단위 브랜치 |
| fix/\*   | 버그 수정 브랜치      |
| docs/\*  | 문서 관련 브랜치      |

## 💬 커밋 메시지 컨벤션

| 태그     | 의미           | 이모지 |
| -------- | -------------- | ------ |
| Feat     | 기능 추가      | ✨     |
| Fix      | 버그 수정      | 🐛     |
| Style    | 스타일 변경    | 💄     |
| Docs     | 문서 변경      | 📝     |
| Refactor | 리팩토링       | 🔨     |
| Test     | 테스트 코드    | ✅     |
| Chore    | 기타 설정 변경 | 🔧     |

### 커밋 메시지 예시

```bash
✨ Feat: 버튼 컴포넌트 생성
🐛 Fix: 로그인 버그 수정
💄 Style: UI 디자인 개선
📝 Docs: README 업데이트
🔨 Refactor: 컴포넌트 구조 개선
✅ Test: 유닛 테스트 추가
🔧 Chore: 의존성 업데이트
```

## 🌈 이모지 가이드

| 이모지 | 의미                |
| ------ | ------------------- |
| 🎨     | 코드 형식/구조 개선 |
| 📰     | 새 파일 추가        |
| ✨     | 새로운 기능         |
| 📝     | 사소한 변경         |
| 💄     | UI / 스타일 수정    |
| 🐎     | 성능 개선           |
| 📚     | 문서 수정           |
| 🐛     | 버그 수정           |
| 🚑     | 핫픽스              |
| 🔥     | 코드 삭제           |
| 🚜     | 구조 변경           |
| 🔨     | 리팩토링            |
| 💎     | 새 릴리즈           |
| 🔖     | 버전 태그           |
| 🚀     | 배포                |

## 📋 AI 커밋 메시지 생성 규칙

### 기본 형식

- **형식**: `이모지 태그: 제목`
- **언어**: 한국어
- **제목 길이**: 50자 이내
- **본문**: 변경 사항 상세 설명 (필요시)

### 타입별 규칙

- **Feat**: "추가", "구현", "생성" 키워드 사용
- **Fix**: "수정", "해결", "수정" 키워드 사용
- **Style**: "개선", "수정", "변경" 키워드 사용
- **Docs**: "업데이트", "추가", "수정" 키워드 사용
- **Refactor**: "개선", "정리", "리팩토링" 키워드 사용
- **Test**: "추가", "수정", "개선" 키워드 사용
- **Chore**: "업데이트", "설정", "변경" 키워드 사용

### 특별 규칙

- 이모지 사용 필수
- 영어와 한국어 혼용 가능
- 간결하고 명확한 표현 사용
- 기능 중심으로 설명
- 기술적 세부사항은 본문에 포함

## 🚀 브랜치 생성 예시

```bash
# 기능 개발
git checkout -b feat/user-authentication
git checkout -b feat/map-filter

# 버그 수정
git checkout -b fix/login-validation
git checkout -b fix/reservation-button

# 문서 작업
git checkout -b docs/api-documentation
git checkout -b docs/readme-update

# 핫픽스
git checkout -b hotfix/deploy-error
git checkout -b hotfix/security-patch
```
