import morgan from "morgan";
import express from "express";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

const app = express(); //expres 애플리케이션을 만든다.
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
  console.log(`server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening); //서버는 사람들이 요청할 때까지 기다린다.
//callback은 서버가 시작될 때 작동하는 함수이다.
//서버에게 어떤 port를 listening할지 얘기해 줘야 한다. port는 컴퓨터의 창이나 문 같은 것이다.
