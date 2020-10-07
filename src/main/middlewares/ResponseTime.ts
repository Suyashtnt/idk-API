import { Middleware, MiddlewareTarget, ResponseParam } from "mandarinets";
import { Response } from "mandarine/deps.ts";

@Middleware()
export class ResponseTime implements MiddlewareTarget {
  date = Date.now();
  public onPreRequest(): boolean {
    this.date = Date.now();
    return true;
  }

  public onPostRequest(@ResponseParam() response: Response): void {
    this.date = Date.now() - this.date;
    response.headers.set("X-Response-Time", this.date.toString());
    console.log(`done. It took ${this.date}ms`);
  }
}
