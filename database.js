// SQL ORM 모듈
const { Sequelize, DataTypes } = require("Sequelize");
// 데이터타입 =  table 모델

//DB 생성
const sequelize = new Sequelize({
  // <- new 객체
  dialect: "sqlite", // db 종류
  storage: "database.sqlite",
}); // 파일명  - 저장방식 memory, file

// Model(테이블) 생성
const Posts = sequelize.define("Posts", {
  // create (속성 정의)
  post: {
    type: DataTypes.STRING, // 문자형
    allowNull: false, // NOT NULL (필수값)
  },
});

module.exports = { sequelize, Posts };
