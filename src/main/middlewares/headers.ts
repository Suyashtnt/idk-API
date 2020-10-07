import { Middleware, MiddlewareTarget, ResponseParam } from "mandarinets";
import { Response } from "mandarine/deps.ts";

@Middleware()
export class CustomHeaders implements MiddlewareTarget {
  public onPostRequest(): void {}
  public onPreRequest(@ResponseParam() res: Response) {
    res.headers.set("Powered-by", "MandarineTS");
    res.headers.set("e", "e");
    res.headers.set("idk", "idk tbh");
    res.headers.set("why-does-this-exist", "because y e s");
    res.headers.set("creator", "suyashtnt");
    res.headers.set("random-dude", "nathann#1048");
    return true;
  }
}
