# Short Contents를 이용한 Crowd Funding Web 
Tiktok, Youtube Shorts, Instagram reels와 같은 ShortForm Contents을 이용한 Crowd Funding Web을 제작 한다.

## 개발 목적
이미 존재하고 있는 기술인 크라우드 펀딩이라는 것을 가져와서 조금 더 대중들에게 접근성을 올려줄 수 있는 방안이 없는가에서 부터 아이디어를 출발해서 최근 사회 현상이라고 불릴 수 있을 정도인 Tiktok, reels 등에서 착안을 하여 Short Contents Crowd Funding Web을 개발 하기 시작했다. 이 내용에서는 Short Contents를 구현하고 로그인 별 자료 관리 정도 까지 다루고 있다.

## 사용 된 기술 
React ver.18.2.0
Firebase ver.9.21.0

## 들어가기 전에
.env 파일에 firebase api 값들을 저장 해준다.

REACT_APP_API_KEY=

REACT_APP_AUTH_DOMAIN=

REACT_APP_PROJECT_ID=

REACT_APP_STORAGE_BUCKET=

REACT_APP_MESSAGIN_ID=

REACT_APP_APP_ID=


### `npm install`
인스톨 명령어로 src에서 사용 된 module들을 다운로드 받는다.

## 사용 된 라이브러리

@mui-material
mui 라이브러리에서 아이콘등을 불러와서 사용 한다.

Pico-css
CSS 디자인에 대해 시간 소모를 줄이기 위해 CSS 라이브러리를 가져온다.

## 소개

메인 화면을 포함해 총 4개의 탭을 기준으로 메인(Short Form이 보여지는 화면), 상품 리스트, 프로젝트 작성, 사용자 설정 탭으로 나뉘게 되어 진다. Short Form 의 강점을 살리기 위해 들어와서 처음 보여지는 화면이 바로 Short Form 탭이 되도록 하였다. 각각의 화면에 대해서 설명을 한다.

1번 화면

<img src = "https://user-images.githubusercontent.com/67058333/236690394-02cf9dad-42ee-4ce5-90de-d012802e3979.png" width="400" height="600">

처음 들어 갔을 때 보이는 화면으로 가장 먼저 확인 할 수 있다. 여기에 가장 메인이 되는 기능인 Short Contents 가 나오는 부분이다. Tiktok 같은 앱들이 가장 먼저 영상부터 보여주는 것에서 사람들의 흥미를 끌 수 있는 기능이기에 추가 하게 되었다.
각각의 버튼에는 상품의 상세 정보를 볼 수 있는 버튼과 공유를 할 수 있는 버튼이 있다.


2번 화면

<img src = "https://user-images.githubusercontent.com/67058333/236690414-39db50fa-100a-42b8-88f5-8c7d0bc00fb0.png" width="400" height="600">

두 번째 화면은 상품들의 리스트를 보여주는 화면이다. 이때 상단에는 기본적으로 광고를 띄우고 있는 구조이고 그 바로 아래부터 상품의 아이템들을 보여주고 그 창을 눌렀을 시에 상품의 상세 페이지로 넘어가게 해준다. 

3번 화면

<img src = "https://user-images.githubusercontent.com/67058333/236690425-da4a25d8-5de9-4893-a75c-5f5d5e00cec3.png" width="400" height="600">
<img src = "https://user-images.githubusercontent.com/67058333/236690424-289f14b9-f77d-423c-8b08-bf53b675b1bc.png" width="400" height="600">

프로젝트를 작성 할 수 있는 화면이다. 위에 제목을 작성 하고 프로젝트 생성을 누르면 프로젝트 수정 창으로 넘어가진다. 그리고 그 아래에서는 자신이 진행 중인 프로젝트의 목록을 볼 수 있다.

4번 화면

<img src = "https://user-images.githubusercontent.com/67058333/236690426-268bcc5b-f484-49ab-b1d0-0b294cdd7db3.png" width="400" height="600">

로그인 화면 이다. firebase 내의 구글 소셜 로그인 기술을 사용했다.



