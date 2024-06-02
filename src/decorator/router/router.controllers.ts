// ** Controller Imports

// ** Decorators Imports
import { MetadataKeys } from "./router.metadata.keys";
import { container } from "../di/di.decorator";
import UserController from "@/src/user.controller";

export const controllers = [
  container.resolve<UserController>(UserController.name),
];

export const registerRouters = (app: Express.Application) => {
  controllers.forEach((controllerClass) => {
    const prototype = Object.getPrototypeOf(controllerClass);
    const propertyNames = Object.getOwnPropertyNames(prototype);

    const basePath: string = Reflect.getMetadata(
      MetadataKeys.BASE_PATH,
      controllerClass.constructor
    );

    for (const propertyName of propertyNames) {
      if (propertyName !== "constructor") {
        const route = Reflect.getMetadata(
          MetadataKeys.ROUTERS,
          controllerClass.constructor
        );

        if (route.length > 0) {
          for (const item of route) {
            app[item.method](
              "/api" + basePath + item.path,
              prototype[propertyName].bind(controllerClass)
            );
          }
        }
      }
    }
  });
};
