// require("dotenv").config();
import "dotenv/config";
import "./db"; //db.js 파일 자체를 import하는 것이고, 이로 인해 내 server가 mongo에 연결된다.
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening); //서버는 사람들이 요청할 때까지 기다린다.
//callback은 서버가 시작될 때 작동하는 함수이다.
//서버에게 어떤 port를 listening할지 얘기해 줘야 한다. port는 컴퓨터의 창이나 문 같은 것이다.
