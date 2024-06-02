// ** Express Imports
import { Request, Response } from "express";
import { Controller, Get } from "./decorator/router/router.decorator";

@Controller("/v1/user")
export default class UserController {
  @Get("")
  public test(req: Request, res: Response): void {
    res.status(200).json({ message: "GET /v1/user" });
  }
}
