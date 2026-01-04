# 지도 기반 가게/위치 뷰어 (Static SPA)

Leaflet + React + TypeScript로 만든 정적 SPA입니다. JSON으로 제공되는 위치 데이터를 지도와 리스트에서 검색·필터링하고, 상세 패널에서 외부 링크(예약/플레이스/길찾기/전화 등)로 이동할 수 있습니다. 서비스 성격을 특정하지 않는 중립 템플릿입니다.

## 주요 기능
- 좌측(모바일: 상단) 검색/필터 + 우측 지도 동시 연동
- 통합 검색: 이름/카테고리/주소/태그 대상 대소문자 무시 검색
- 필터: 시즌 값, 팀 값, “예약 가능만” 체크
- 리스트/마커 클릭 시 상세 패널 열림 + URL 해시 `#/id` 공유
- 공유 링크 진입 시 해당 위치 상세 자동 열림
- 상세 패널: 주소/카테고리/태그, 예약·플레이스 링크, Google 길찾기, 전화 걸기 버튼
- Leaflet 기본 마커 아이콘 경로 설정(Vite에서도 정상 표시)

## 빠른 시작
```bash
npm install
npm run dev
```

- 개발 서버: <http://localhost:5173>
- 데이터는 `public/data/restaurants.json`에서 fetch로 로드됩니다.

## 빌드
```bash
npm run build
```
`dist/`가 생성되며, GitHub Pages에 그대로 배포 가능한 정적 산출물입니다.

## 데이터 업데이트
- `public/data/restaurants.json` 파일을 동일한 스키마로 교체하면 됩니다.
- 최소 필수 필드: `id`, `chef.name`, `restaurant.name`, `restaurant.address`, `lat`, `lng`
- `naverBookingUrl`, `naverPlaceUrl`, `phone`, `instagram`, `tags`, `updatedAt` 등은 선택 필드이며, 빈 문자열/누락 모두 안전하게 처리됩니다.

## GitHub Pages 배포
- 리포지토리 **Settings → Pages**에서 Source를 **GitHub Actions**로 설정합니다.
- 기본 브랜치(`main`) push 시 자동으로 워크플로우가 실행되어 `dist/`를 Pages로 배포합니다.
- Vite `base: './'` 설정으로 GitHub Pages 서브경로에서도 동작합니다.

## 기술 스택
- Vite, React, TypeScript
- Leaflet & React-Leaflet
- 해시 기반 라우팅(서버 라우팅 불필요)

## 라이선스 및 면책
- 비공식 팬메이드 프로젝트이며, 방송·제작사·출연자와 무관합니다.
- 정보는 수시로 변동될 수 있으며, 모든 외부 링크는 각 서비스로 연결됩니다.
