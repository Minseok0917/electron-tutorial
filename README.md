# Electron Tutorial

## Electron 프로젝트 초기 환경 설정

### main.js

Electron 의 main 은 뼈대의 역할을 잡는다고 한다.  
React, Vue 로 예시로 들면 번들러같은 느낌이랄까

```javascript
const { app, BroswerWindow } = require("electron");
```

-   BroswerWindow
    index.html 로 웹 페이지에서 볼 수 있는 파일을 생성  
     응용 프로그램 창을 띄우기 위해선 BroswerWindow 를 사용해야 된다.

    ```javascript
    const createWindow = () => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
        });
        win.loadFile("index.html");
    };
    ```

-   app
    app 으로 일렉트론 관련 이벤트를 제어할 수 있다.
    ```javascript
    app.whenReady().then(() => {
        createWindow();
    });
    ```

### preload.js

Node.js 전역객체인 process 를 index.html 에서 호출 불가능하니  
proload 라는곳에서 일일이 넣어주는 역할을 하는거 같다.

하지만 Vue 에 적용할 예정이라 사용할 일이 있을까 싶다.  
preload를 설정하고 main.js 에서 링크를 걸어준다.

### web Connection

index.html 마지막에 script 를 링크를 걸어서  
번들링된 파일을 넣는 형식인거 같음

## Vite 연동해보기

### CJS, MJS

Vite 를 사용할려면 es module 을 사용해야는데 electron 과 충돌이 났다.  
에러로그를 읽고 파일별로 분리하는 법을 찾았고, main.js => main.cjs 로 변경했다.

-   CJS : Common JS
-   MJS : ECM JS

### Client 개발서버 구성

2022년 11월 20일에 개발서버 기본 구성만 설정해놨다.  
아직 프로젝트를 원할하게 사용하기에는 무리가 있고 추후 NPM 에 배포할 예정이다.

1. Javascrpit 파일 생성
2. Vite Build 함수와 Vite Run 함수 생성
3. electron 실행시키는 runElectron 이라는 함수 생성
4. 공통함수를 하나 생성하고 buildVite, runVite, runElectonr 순서대로 호출
5. chokidar 를 사용하여 소스 변경 감지 후 buildVite 재실행
6. electron main.js 에 소스 변경시 새로고침되는 electron-reload 적용
