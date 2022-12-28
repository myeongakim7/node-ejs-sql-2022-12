const express = require("express");
const app = express();
const ejs = require("ejs");
const { sequelize, Posts } = require("./database");

// DB 연결
sequelize.sync().then(function () {
  console.log("데이터 연결 완료");
});
//씨퀄라이즈를 연결한다는 뜻

// ejs를 view 엔진으로 설정
app.set("view engine", "ejs");

// 정적파일 경로 지정
app.use(express.static("public"));

// home
app.get("/", async function (req, res) {
  // db 불러오기
  // 변수 소문자,대문자 주의 / 여기서 Posts는 표
  // 탐색1 ) SELECT * FROM Posts WHERE post="first post"
  // 탐색2 ) const posts = await Posts.findAll({ where : { post : '새글 2'});
  const posts = await Posts.findAll();
  console.log(JSON.stringify(posts, null, 2));
  res.render("pages/index.ejs", { posts });
  // 비동기 함수라는걸 알려주기 위해서 콜백함수 이전에 async 입력 , sync는 순서대로 입력되는데 async(비동기)는 로딩이 될 때 휙 넘어갈 수 있음 => await를 걸어야함 = posts 값이 보임
});

// post 전송을 위해 필요한 모듈(미들웨어)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// about
app.get("/about", function (req, res) {
  res.render("pages/about.ejs");
});

// 글쓰기 요청
app.post("/create", async function (req, res) {
  // res.send("응답받음" + req.body.post);
  let post = req.body.post;
  // posts = 테이블명
  // 테이블명.create({칼럼이름:값})
  //  ({ post : 변수})
  // await Posts.create({ post: post });
  // 비동기적(async)으로 async + await를 걸어놔야 안넘어감 / 되긴 되지만 빠르게 넘어가서 안보일 수 있음
  // await만 쓰면 안되고 async도 같이 써야 작동
  const newPost = await Posts.create({ post: post });
  console.log("auto-generated ID:", newPost.id);
  // 위에 2줄은 확인용으로 썼음, 안써도 됨
  res.redirect("/");
  // redirect = 새로고침
  // res.redirect("/")= 홈으로 새로고침
});

app.post("/delete/:id", async function (req, res) {
  console.log(req.params.id);
  await Posts.destroy({
    where: {
      id: req.params.id, // req.params = 글번호  // 삭제 할 글번호
    },
  });
  // res.send(req.params);
  res.redirect("/");
});

const port = 3001;
app.listen(port, () => {
  console.log(`server running at ${port}`);
});
