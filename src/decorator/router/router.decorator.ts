import { Constructor, container } from "../di/di.decorator";
import { MetadataKeys } from "./router.metadata.keys";

export enum Methods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

export interface IRouter {
  method: Methods;
  path: string;
  handlerName: string | symbol;
  validation?: Function;
}

const methodDecoratorFactory = (method: Methods) => {
  return (path: string, validation?: Function): MethodDecorator => {
    return (target, propertyKey) => {
      const controllerClass = target.constructor;
      const routers: IRouter[] = Reflect.hasMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      )
        ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
        : [];
      routers.push({
        method,
        path,
        validation,
        handlerName: propertyKey,
      });

      Reflect.defineMetadata(MetadataKeys.ROUTERS, routers, controllerClass);
    };
  };
};

export const Get = methodDecoratorFactory(Methods.GET);
export const Post = methodDecoratorFactory(Methods.POST);
export const Put = methodDecoratorFactory(Methods.PUT);
export const Delete = methodDecoratorFactory(Methods.DELETE);
export const Patch = methodDecoratorFactory(Methods.PATCH);

export const RequestMapping = (basePath: string) => {
  return (target) => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
  };
};

export const Controller = (basePath: string) => {
  return (target: Constructor<any>) => {
    container.register(target.name, target);
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target);
  };
};
