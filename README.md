# Stress-Survey

## 프로젝트 소개

스트레스 자가진단 설문지

### 요구사항

- Node.js 18.17
- NPM 9.6.7

## 기능 소개

## 할 일

### 기본 요구사항

- [ ]문제 만들기
  - [X]주제 정하기
  - [ ]5지선다 문제 (1~5점으로 환산할 수 있어야 함)
  - [ ]주관식 문제 (1~10 점수 입력)
  - [ ]5지선다 다중 선택 (문제의 답은 선택한 값의 합)
- [ ]멀티 폼 구현
  - [ ]다음, 이전 버튼을 구현한다.
  - [ ]Application storage에 사용자와 점수를 저장한다.
- [ ]사용자 정보 입력 컴포넌트 구현
  - [ ]팀과 이름을 입력받는다.
- [ ]5지선다 문제 컴포넌트 구현
  - [ ]보기 중 하나만 선택할 수 있다.
  - [ ]보기 중복을 고려해 해시값을 붙인다.
- [ ]주관식 문제 컴포넌트 구현
  - [ ]1~10 사이의 숫자만 입력할 수 있다.
  - [ ]복사 & 붙여넣기를 고려한다.
- [ ]5지선다 다중 선택 컴포넌트 구현
  - [ ]보기 중 여러개 선택할 수 있다.
  - [ ]선택한 값의 합이 문제의 답이 된다.
  - [ ]보기 중복을 고려해 해시값을 붙인다.
- [ ]대시보드 페이지
  - [ ]사용자가 입력한 데이터를 가져온다.
  - [ ]팀별 총합, 평균, 표준편차 등 차트 구현

### 추가 요구사항

- [ ]반응형 디자인 적용
- [ ]사용자 편의성을 고려한 디자인 개선 혹은 기능 추가
- [ ]대시보드 페이지 진입 인증 처리
- [ ]성능 최적화 고민하기

## 커밋 컨벤션

| Type     | 설명                                                                                                  |
| -------- | ----------------------------------------------------------------------------------------------------- |
| Feat     | 새로운 기능 추가                                                                                      |
| Fix      | 버그 수정                                                                                             |
| Refactor | 코드 리팩토링, 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우, 파일을 삭제하는 작업만 수행한 경우 |
| Style    | CSS 및 레이아웃 작업수정                                                                              |
| Docs     | 문서 수정                                                                                             |
| Chore    | 설정 관련                                                                                             |
