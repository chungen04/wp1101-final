# [110-1 Web Programming Final] README

## Group 17 // 考古題管理系統

### Demo影片連結: 
https://www.youtube.com/watch?v=6jAitn2ti98

### 1. 這個服務在做什麼:
- 現今電機系的考古題管理是使用雲端硬碟，且需要系上管理員從google表單人工擷取來自學生的submission，再重新手動命名、上傳到雲端。學生在雲端硬碟找檔案的過程也很麻煩。我們希望可以寫一個web app，串接學生submit取得的考古題、學生找考古題、後台管理，讓學生考古題的取得更為便利。


### 2. Deploy連結:

https://web-ntu-old-exams.herokuapp.com/

### 3. Deploy連結操作方式: 

- 如同demo影片以及這裡寫的功能。

### 4. 程式碼架構
```
backend
├── package.json
└── src
    ├── google
    │   └── index.js
    ├── index.js
    ├── models
    │   ├── Course.js
    │   ├── Exam.js
    │   ├── File.js
    │   ├── index.js
    │   └── User.js
    ├── mongo.js
    ├── resolvers
    │   ├── Course.js
    │   ├── Exam.js
    │   ├── index.js
    │   ├── Mutation.js
    │   ├── pubsub.js
    │   ├── Query.js
    │   └── Subscription.js
    ├── routes
    │   ├── api
    │   │   ├── getToken.js
    │   │   └── uploadFile.js
    │   └── index.js
    ├── schema.graphql
    └── utility.js
```
```
frontend
├── package.json
└── src
    ├── App.js
    ├── Components
    │   ├── CardForCourse.js
    │   ├── CardForCourses.js
    │   ├── CourseForm.js
    │   ├── CourseSelection.js
    │   ├── ExamCard.js
    │   ├── ExamForm.js
    │   ├── ExamSelection.js
    │   ├── FileForm.js
    │   ├── FileSelection.js
    │   ├── Form.js
    │   ├── Header.js
    │   └── Review.js
    ├── Containers
    │   ├── AdminChangeCourseVisibility.js
    │   ├── AdminChangeExamVisibility.js
    │   ├── AdminChangeFileVisibility.js
    │   ├── AdminHomePage.js
    │   ├── AdminReviewQueries.js
    │   ├── ContributePage.js
    │   ├── SearchPage.js
    │   ├── SignIn.js
    │   └── StartingPage.js
    ├── graphql
    │   ├── index.js
    │   ├── mutation.js
    │   ├── query.js
    │   └── subscription.js
    ├── Hooks
    │   ├── useAdminChangeVisibility.js
    │   ├── useAdminReviewQueries.js
    │   ├── useContribute.js
    │   └── useSearchPage.js
    └── index.js

```

### 5. 使用與參考之框架/模組/原始碼

- 前端使用框架與模組: Apollo client, Material-UI, Axios, GraphQL, React, React-Router
- 後端使用框架、模組與第三方套件: bcrypt, Apollo-server-express, subscription-transport-ws, mongoose, jsonwebtoken, GraphQL, express-fileupload, dotenv, express, googleapi

### 6. 使用之第三方套件、框架、原始碼
- google drive api
- 一些css參考homework

### 7. 專題製作心得
- 賴群貿: 寫網頁難，但怎麼感覺最難的是寫心得…感覺這次最大的收穫是培養心態吧，每天一個bug，真的會崩潰，但在想到問題解決方法時，真的蠻開心的。
- 賀崇恩: 我在這次project主要寫前端，其實這次project難在schema不好定義，還有graphql很難debug，常常加到前端之後跟playground看到不一樣的東西…不過還是很高興可以寫出這個考古題管理系統的前後台，也成功串接google drive來管理，希望大家都喜歡我們的project :)

### 8. 如何在localhost安裝與測試知詳細步驟

1. clone and install dependencies
```bash=
git clone https://github.com/chungen04/wp1101-final.git
cd wp1101-final
yarn install
cd frontend 
yarn install
cd ../backend
yarn install
cd ..
```

2. filled in ./env
- SECRET_KEY, ADMIN_USERID, ADMIN_PASSWORD can be set randomly, and the userID and password will be for admin login
- MONGO_URL need to use your own
- CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN: see https://www.youtube.com/watch?v=1y0-IfRW114 to generate your google account's api key
```javascript=
MONGO_URL = `${your_mongo_url}`
SECRET_KEY = `${random_string}`
ADMIN_USERID = `${account_for_admin}`
ADMIN_PASSWORD = `${password_for_admin}`
CLIENT_ID = `${google_client_id}`
CLIENT_SECRET = `${google_client_secret}`
REDIRECT_URI = "https://developers.google.com/oauthplayground"
REFRESH_TOKEN = `${google_refresh_token}`
```

3. run backend & frontend
```
yarn server  
yarn start
```
- backend is on localhost:4000
- frontend is on localhost:3000

### 10. 詳細功能介紹
在系統的Home Page, 可以選擇contribute (上傳您取得的考古題), search(搜尋已經上傳的文件)或admin login(後台管理).

- contribute page
我們定義file是在course/exam底下，所以要先選擇要新增考古題的course。
填入course基本資訊(全必填)後按search for course，若跳出通知沒有course則按右上的add new course填完剩餘資訊，否則從下面的選單選擇已經存在的course來增加。
按next會跳到exam的頁面，使用方式類似前頁。
按next會到上傳file的頁面，其中Question PDF必須上傳，remarks和Answer PDF則為optional.
再按next即可review自己上傳的東西，並且submit.

- search page
在user搜尋文件的頁面中，可以根據course的資訊/是否有answer來filter。按下Query後，下面的方塊會顯示搜尋到的文件，按方塊裡的Learn more可以看到該文件的所有course/exam/file資訊。

- admin login
以admin帳號來login，如果在localhost測，帳號密碼就會是.env裡的ADMIN_USERID和ADMIN_PASSWORD.

- admin home page:
這裡可以選擇後台功能。user submit文件後，admin要先在"See Unreviewed Queries"裡面檢視這些submission，然後可以在"change visibility/delete course/exam/file"改變已經存在course/exam/file的visibility (i.e.,是否可以被一般使用者看到)或刪除這些文件。

- admin review queries:
admin可以從這裡看到被submit的文件們。這裡對文件的選項有delete(刪除)/pass and show(通過，且對使用者顯示)/ pass and not show(通過，但不對使用者顯示). 這一頁的內容是對所有登入的admin同步的(i.e., 有subscription)

- admin change visibility/delete course/exam/files:
admin可以從這裡看到目前擁有的文件，同樣都有filter可以篩選。其中目前對使用者顯示的文件用黃色標註，沒有的則為灰色。按刪除可以刪除文件，按change visibility可以改變其visibility. 這幾頁的內容是對所有登入的admin同步的(i.e., 有subscription)
注意: file是包含在exam裡面，exam是包含在course裡面。也就是說，如果包含在某course的file是visibile，但它的course是invisible，那它仍然不會在一般使用者search page被顯示