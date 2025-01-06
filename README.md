## ☑️ Level 1

### 요구사항
React Native 기반 앱을 제작 하시오. 앱 하단에 Bottom Tabs Navigator를 추가하고  4개(홈 / 캘린더 / 라이브러리 / 마이페이지)의 탭을 추가하시오.  추가로 4개의 스크린을 생성하여 각 탭과 연결 하시오.

### 구현방법
- bottom navigator 생성 `@react-navigation/bottom-tabs`
- 각각의 스크린 생성 `HOME` `CALENDAR` `LIBRARY` `MYPAGE`

![1](https://github.com/user-attachments/assets/b872a753-78f8-4372-a02e-23a4be2c3029)


## ☑️ Level 2

### 요구사항
- 캘린더 탭에 외부 캘린더 라이브러리를 이용하지 않고 캘린더 컴포넌트를 제작하시오. 캘린더는 아래 이미지와 같은 형태로 월 캘린더로 구현하시오
    - 기능 1 : 캘린더에 현재 월을 출력하고 오늘 날짜를 아래 이미지와 같이 구현 하시오.
    - 기능 2 : 상단 좌우 화살표 버튼 클릭 시 전월, 익월을 캘린더에 출력 하시오.
    - 기능 3 : 캘린더 상에 특정 날짜를 선택하면 해당 날짜에 원을 표시 하시오. 마지막으로 선택된 날짜만 표시해야 함.

### 구현방법

라이브러리없이 캘린더구현하는게 핵심인듯

- 날짜구현
`getCalendarDates` 함수생성 : 객체 `Date` 객체를 포함하는 날짜 배열을 반환하는 함수
1) `dates` 날짜리스트생성 : 지난달+이번달+다음달을 배열리스트로 생성, 7일씩 묶어서 반환 (타입:`Date`)
2) `isCurrentMonth` 상태값 : 이번달이 아니면 회색으로표시/클릭불가처리 (타입:`boolean`)

- 날짜선택
`onSelectDate` 함수가 호출되어 `selectDate`를 선택한날짜로변경

- 달력이동
`onClickPrev` 이전달이동
`onClickNext` 다음달이동

![2](https://github.com/user-attachments/assets/ede27932-2112-4a1e-8017-c63bc369ba2c)

## ☑️ Level 3

### 요구사항
react-native-reanimated, react-native-gesture-handler 라이브러리를 이용해서 제스처 이벤트가 발생하면 아래와 같이 캘린더의 형태가 월 캘린더에서 주 캘린더로, 주 캘린더에서 다시 월 캘린더로 변환 가능하도록 구현 하시오

### 구현방법

- 월간/주간 캘린더 변경

1) `viewMode`로 월간`monthly`과 주간`weekly` 캘린더 전환
  
2) `PanResponder`로 터치 제스처를 감지하고 처리
  - `PanResponder.create`를 사용하여 제스처를 인식하고, `onStartShouldSetPanResponder`와 `onMoveShouldSetPanResponder`에서 제스처를 시작하고 움직일 때 터치 이벤트를 활성화하도록 설정
  - `onPanResponderMove`에서는 손가락이 이동한 거리(`gestureState.dx`와 `gestureState.dy`)를 사용해 방향을 판단
    
3) 위/아래 스와이프 방향에 따른 뷰 전환
   - `dy`(y축 이동거리)가 50보다 클 경우 위로 스와이프한 것으로 간주하고, 월간 뷰를 설정 `onSwipeUp`
   - `dy`(y축 이동거리)가 50보다 작을 경우 위로 스와이프한 것으로 간주하고, 주간 뷰를 설정 `onSwipeDown`
   - `dx`(x축 이동거리)가 50보다 클 경우 위로 스와이프한 것으로 간주하고, -7일 주간변경 설정 `onSwipeLeft`
   - `dx`(x축 이동거리)가 50보다 작을 경우 위로 스와이프한 것으로 간주하고, +7일 주간변경 설정 `onSwipeRight`
     
4) `panResponder.panHandlers`를 `<View>`에 적용하여 이 컴포넌트가 터치 제스처를 감지


![3](https://github.com/user-attachments/assets/0d6e6fd9-389a-4708-a6e4-5b41f40d353a)




