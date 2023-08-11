# To-Do-List 애플리케이션

이 애플리케이션은 할 일 목록을 관리하는 간단한 웹 기반 애플리케이션입니다. 해당 프로젝트는 HTML, CSS, JavaScript로 구현되었습니다.

## 기능 

 - 할 일 목록 추가, 삭제 및 체크
 - 할 일 목록 강조 기능
 - 로컬 기기에 데이터 저장


## 설치 및 실행

 - link : https://warizi.github.io/To-Do-List/
 - 크롬 및 사파리에서 접속한 후 홈화면에 추가하기 (모바일)
 - 크롬에서 접속한 후 주소표시줄 우측 설치하기 (데스크탑)


## 기획과 디자인

 - 프로젝트를 시작하기 전에 Figma를 사용하여 기획과 디자인 단계를 거쳤습니다.
 - Figma : https://www.figma.com/file/LmzIJWlebNFHfKKx1esBES/Do!?type=design&node-id=0%3A1&mode=design&t=SY94hVIT7UPacUmb-1


## 프로젝트 구조

```bash
├── images
├── module
│   ├── listManager.js
│   ├── State.js
│   └── Storage.js
├── pages
│   ├── signup.html
│   └── todo.html
├── script
│   ├── signin.js
│   ├── todo.js
│   └── signin.js
├── styles
│   ├── main.css
│   ├── signup.css
│   └── todo.css
├── template
│   └── parseTodoTemplate.js
├── index.html
├── manifest.json
└── service-worker.js
``` 


## 사용된 기술 스택

 - HTML
 - CSS
 - JavaScript
 - PWA
 - Figma


## HTML & CSS

앞서 기획된 기능을 기반으로 HTML 구조를 설정하였습니다.
재사용성을 위해 parseTodoList.js에 아래와 동일한 DOM구조와 Data를 파라미터로 받아 적절한 곳에 넣고 생성하는 함수를 작성하였습니다.
 - list Component 구조
```
<ul class="list_container">                // width: 400px;
  <li class="list_item">                      // width: 380px; height: 50px;
      <button class="check_box">
          <div class="checked unchecked" data-id=${id} ></div>    // 사용자가 checked를 클릭 시 unchecked 클래스 토글 (unchecked -> opacity: 0;)
      </button>
      <div class="list_content_container">
          <span class="list_content">                  // 사용자가 입력한 내용을 담음.
              ${content}
          </span>
          <div class="neon_strong neon_blind"></div>    // neon_blind 클래스 토글 (neon_blind -> display: none;)
      </div>
      <button class="todo_delete" data-id=${id}>삭제</button>            // position: absolute; top: 0; right: -66px; (삭제버튼 비활성화 시 부모요소의 overflow: hidden에 가려짐.)
      <div class="highlight_event_listener blind" data-id=${id}></div>    // 크기는 <li>와 동일 position: absolute; top: 0; left: 0; (형광펜 활성화 시 display: block; 형광펜 이벤트 등록용)
  </li>
</ul>
```

## JS & Module

기능을 구현하기 위해 크게 3가지를 고려하여 기능을 구현하였습니다.
1. localStorage를 불러오기, 저장, 삭제, 수정하기
2. 유저의 입력에 따라 list의 정보를 관리하고 렌더링하기
3. 3가지 tool(등록, 강조, 삭제) 선택 상태에 따라 기능 활성화 및 비활성화 하기

### 1. Storage
 - constructor(storageKey)
      - this.storageKey : : 생성할 때 storageKey를 받아 해당 key의 localStorage만 관리합니다.
      - this.data : localStorage의 데이터를 임시 저장합니다.
        
 - getData()
   - localStorage의 데이터 배열을 리턴합니다. (this.data에 할당합니다.)
     
 - addItem(itemData)
   - item data 객체를 localStorage 데이터 배열에 push합니다.
     
 - deleteItem(id)
   - localStorage 데이터 배열에 같은 id 값을 가진 객체를 삭제합니다.
     
 - createId()
   - localStorage 데이터의 마지막 index + 1을 리턴합니다.
     
 - getStorage(key = this.storageKey)
   - this.data에 할당하지 않고 localStorage 데이터를 리턴합니다.
     
 - getUpdateStorage(key = this.storageKey, value = this.Data)
   - localStorage에 데이터를 저장합니다.
     
 - updateData(id, updateProp ,updateValue)
   - id 값이 일치하는 객체의 값을 변경합니다. this.data에 반영됩니다.

### 2. ListManager
 - constructor(container, parseTemplate)
   - this.listInfoData : list의 정보를 저장합니다. [{ template: DOM, data: {listInfo} }];
   - this.template = parseTemplate : 렌더링할 list 를 저장합니다.
   - this.container : 렌더링될 부모요소를 저장합니다.
   
 - init(data)
   - data를 parseTemplate로 파싱한 DOM을 this.listInfoData에 넣습니다.
     
 - clearList()
   - 부모 요소의 자식요소를 모두 지웁니다.

 - render()
   - this.listInfoData 안에 요소를 모두 부모요소에 넣어 렌더링합니다.

 - addEvent(eventType, eventFn)
   - 부모 요소에 이벤트를 부여합니다.

### 3. State
 - constructor(initState, changeStateFn)
   - this.State : 관리할 상태값입니다.
   - this.changeStateFn : 상태에 따라 조작할 함수입니다.

 - getState()
   - this.State를 리턴합니다.

 - setState(state)
   - this.State와 state를 비교해 값이 다르면 this.State = state 할당하고 this.changeStateFn(state)을 실행합니다.
   - this.State와 state가 같으면 아무일도 일어나지 않습니다.


## PWA

 - PWA의 조건중 하나인 HTTPS 프로토콜을 사용하기 위해 Github pages에 배포하였습니다.
