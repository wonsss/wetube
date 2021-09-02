import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";
import flash from "express-flash";

const app = express(); //expres 애플리케이션을 만든다. 여기서 app을 configure 하고
const logger = morgan("dev");

const corsOptions = {
  methods: ["GET", "POST", "PATCH", "DELETE"],
};
app.use(cors(corsOptions));

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//     referrerPolicy: { policy: "strict-origin-when-cross-origin" },
//     crossOriginEmbedderPolicy: true,
//     crossOriginOpenerPolicy: "same-origin",
//   })
// );

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);

app.use("/videos", videoRouter);
app.use("/api", apiRouter);
app.use((req, res, next) => {
  res.header("Cross-Origin-Embedder-Policy", "credentialless");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

export default app; //app을 export한다
