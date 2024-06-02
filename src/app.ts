import "reflect-metadata";

// ** Module Imports
import express from "express";

// ** Util Imports
import cors from "cors";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
  }

  /**
   * 미들웨어를 세팅한다.
   */
  private setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  /**
   * Express를 시작한다.
   * @param port 포트
   */
  public async createExpressServer(port: number): Promise<void> {
    try {
      this.app.listen(port, "0.0.0.0", () => {
        console.log(
          `Server is running on PORT : ${port} on ENV : ${process.env.NODE_ENV}`
        );
      });
    } catch (error) {
      console.error("Server start failed");
      console.error(error);
    }
  }
}
