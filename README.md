# theCommerce


## 실행방법
1. Git을 통해 소스 코드를 클론합니다.
2. pjb_clush.sql 파일을 통해 DB를 생성합니다.
3. backend > resources > application.properties 에서 DB접속정보를 입력합니다.
4. build.gradle을 통해 의존성을 설치합니다.
5. Run Configuration에 org.example.backend.BackendApplication를 설정합니다.
6. BackendApplication를 실행합니다.
7. VSCode로 frontEnd 폴더 오픈합니다.
8. npm install 명령을 실행하여 package.json에 정의된 모든 의존성을 설치합니다.
9. 의존성 설치가 완료되면, npm start를 실행하여 프로젝트를 시작할 수 있습니다.

## 기술스택
* JDK 버전: 17
* 프레임워크: Spring Boot3.4
* 데이터베이스: MySql
* ORM: JPA
* 빌드 도구: Gradle
* React 18.3.1

## 사용한 라이브러리
# 백엔드
Spring Boot Starter Data JPA
Spring Boot Starter Web
Lombok
Springdoc OpenAPI
JUnit Platform Launcher
# 프론트엔드
styled-components
react-fullcalendar
react-modal

## 동작방식

### TodoList
1. 할 일을 입력 후 추가합니다.
2. 체크박스에 체크를 하면 완료 상태로 변경됩니다.
3. 삭제 버튼을 누르면 해당 투두리스트가 삭제됩니다.
  
### 일정(캘린더)
1. 날짜를 클릭 또는 드래그해서 날짜를 선택할 수 있습니다.
2. 날짜를 선택하면 프롬프트가 띄워지고 제목을 입력해서 일정을 추가할 수 있습니다.
3. 일정을 선택하면 수정 또는 삭제를 할 수 있습니다.

## 스웨거를 통해 API를 확인하실 수 있습니다.
http://localhost:8080/swagger-ui/index.html
