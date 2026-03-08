# Short Contents를 이용한 Crowd Funding Web 
Tiktok, Youtube Shorts, Instagram reels와 같은 ShortForm Contents을 이용한 Crowd Funding Web을 제작 한다.

## 1.1. 프로젝트 명
### Short Contents Crowd Funding Web
> 숏폼(ShortForm) 영상 기반의 크라우드 펀딩 플랫폼

## 1.2. 프로젝트 기간
* **프로젝트 기간** : 2023.04.11 ~ 2023.05.10

## 1.3. 프로젝트 컨셉
Tiktok, Youtube Shorts, Instagram Reels와 같은 **ShortForm Contents**를 이용한 크라우드 펀딩 웹 서비스입니다. 숏폼의 직관적이고 흥미로운 강점을 크라우드 펀딩에 접목하여 대중들의 접근성을 높이는 것을 목표로 제작되었습니다.

## 2.1. 기획의도 및 요구사항 분석
* **기획 의도**: 이미 존재하는 기술인 크라우드 펀딩에 대중성을 더할 방안을 고민하던 중, 최근 사회 현상으로 자리 잡은 숏폼(Tiktok, Reels 등)에서 착안하여 기획하게 되었습니다.
* **요구사항 분석**:
    * 숏폼 콘텐츠가 즉각적으로 재생되는 메인 피드 구현.
    * 로그인 사용자별 프로젝트 및 자료 관리.
    * 펀딩 프로젝트 생성 및 내용 업로드 시스템.
    * *참고: 본 프로젝트에서는 펀딩 내용까지만 구현하였으며, 실제 결제 내용은 구현하지 않았습니다.*

## 2.2. 시나리오 설정
1. **탐색 (응답자)**: 웹사이트 접속 시 즉시 숏폼 피드(메인 화면)가 재생되며, 스와이프하여 다양한 펀딩 프로젝트를 탐색합니다. 관심 있는 상품은 상세 정보 버튼을 눌러 확인하거나 공유할 수 있습니다.
2. **리스트 확인**: 상품 리스트 탭에서 전체 펀딩 목록을 확인하고 원하는 프로젝트의 상세 페이지로 진입합니다.
3. **프로젝트 등록 (생성자)**: 구글 소셜 로그인 후 프로젝트 작성 탭에서 타이틀, 요약문, 내용, 요금 설정, 미리보기 이미지, 숏폼 영상을 업로드하여 펀딩을 오픈합니다. (임시 저장 시 업로드 대기 상태로 전환)

## 2.3. 주요 기능
* **숏폼 메인 피드**: 진입 시 가장 먼저 영상을 보여주어 사용자의 흥미를 유발.
* **프로젝트 에디터**: 텍스트(폰트 크기/색상) 편집 및 숏폼 영상, 썸네일 업로드 기능.
* **임시 저장 및 상태 관리**: 작성 중인 프로젝트 임시 저장 시 '업로드 대기 상태'로 전환되어 상품 리스트에서 숨김 처리.
* **반응형 웹**: 모든 디바이스 환경에서 동일하고 최적화된 화면이 나오도록 반응형 웹 채택.

## 3.1. 개발환경
* **Front-end** : React ver.18.2.0
* **Back-end / DB** : Firebase ver.9.21.0
* **UI / Design** : 적응형 및 반응형 웹 채택
* **환경 변수 설정 (`.env`)**:
  (Firebase 프로젝트 생성 시 발급되는 API 값을 저장합니다.)
  ```env
  REACT_APP_API_KEY=
  REACT_APP_AUTH_DOMAIN=
  REACT_APP_PROJECT_ID=
  REACT_APP_STORAGE_BUCKET=
  REACT_APP_MESSAGIN_ID=
  REACT_APP_APP_ID=
  ```
* **실행 방법**: `npm install` 명령어로 src에서 사용된 module들을 다운로드 후 실행합니다.

## 3.2. 사용한 API
* **Firebase Authentication**: 구글 소셜 로그인 기능 구현.
* **Firebase Storage/Firestore**: 프로젝트 숏폼 영상, 이미지 업로드 및 데이터베이스 관리.

## 3.3. 필요한 라이브러리
* **@mui-material**: Material UI 라이브러리를 통해 아이콘 등 UI 요소 활용.
* **Pico-css**: CSS 디자인에 소모되는 시간을 줄이고 깔끔한 기본 스타일링을 위해 도입.
* **react-router-dom**: 페이지 이동 시 라우팅 이벤트 처리.
* **react-quill**: 폰트 크기, 색상 등을 설정할 수 있는 WYSIWYG 에디터(입력 창) 구현.

## 4. 화면설계 및 기능 구현
메인 화면을 포함해 총 4개의 탭(메인, 상품 리스트, 프로젝트 작성, 사용자 설정)으로 구성되어 있습니다.

**1. 메인 화면 (Short Form 탭)**
<br>
<img src="https://user-images.githubusercontent.com/67058333/236690394-02cf9dad-42ee-4ce5-90de-d012802e3979.png" width="400" height="500">
* 앱 진입 시 가장 먼저 보이는 핵심 화면.
* 영상이 바로 재생되며, 우측 버튼을 통해 상품 상세 정보 확인 및 공유가 가능합니다.

**2. 상품 리스트 화면**
<br>
<img src="https://user-images.githubusercontent.com/67058333/236690414-39db50fa-100a-42b8-88f5-8c7d0bc00fb0.png" width="400" height="500">
* 상단에 광고 영역이 위치하며, 하단에 펀딩 상품 리스트가 노출됩니다.
* 아이템 클릭 시 상품 상세 페이지로 이동합니다.

**3. 프로젝트 작성 및 리스트 화면**
<br>
<img src="https://user-images.githubusercontent.com/67058333/236690425-da4a25d8-5de9-4893-a75c-5f5d5e00cec3.png" width="400" height="500">
<img src="https://user-images.githubusercontent.com/67058333/236690424-289f14b9-f77d-423c-8b08-bf53b675b1bc.png" width="400" height="500">
* (좌) 프로젝트 생성 및 자신이 진행 중인 프로젝트 목록 조회 창.
* (우) 세부 수정 창 (타이틀, 요약문, 내용, 펀딩 내용/요금, 미리보기 이미지, 숏폼 영상 업로드).

**4. 로그인 화면 (사용자 설정)**
<br>
<img src="https://user-images.githubusercontent.com/67058333/236690426-268bcc5b-f484-49ab-b1d0-0b294cdd7db3.png" width="400" height="500">
* Firebase 내의 구글 소셜 로그인 기술을 사용한 화면입니다.

## 5.1. 최종 결과
* 기존의 정적인 크라우드 펀딩 플랫폼과 차별화되는, 숏폼 콘텐츠 중심의 동적이고 트렌디한 웹 서비스를 구현했습니다.
* React와 Pico-css를 활용하여 단기간에 모바일과 데스크톱 모두에 대응하는 반응형 화면을 완성했습니다.
