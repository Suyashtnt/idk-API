import {
  MandarineCore,
  Controller,
  GET,
  POST,
  RequestBody,
  Middleware,
  ResponseParam,
  UseMiddleware,
} from "mandarinets";
import { Response } from "https://deno.land/x/mandarinets@v2.1.1/deps.ts";
import type { input, output } from "../typings/body.ts";

@Middleware()
export class ResponseTime {
  date = Date.now();
  public onPreRequest(@ResponseParam() response: Response): boolean {
    this.date = Date.now();
    return true;
  }

  public onPostRequest(@ResponseParam() response: Response): void {
    this.date = Date.now() - this.date;
    response.headers.set("X-Response-Time", this.date.toString());
    console.log(`done. It took ${this.date}ms`);
  }
}

@Controller()
@UseMiddleware([ResponseTime])
export class MyController {
  @GET("/")
  public getHandler() {
    return 'POST here with the body of {\n"value":"some string"\n}';
  }

  @POST("/")
  public postHandler(@RequestBody() { value }: input): output {
    const words = value.split(" ");
    const newWords = words.map((val) => {
      return val
        .split(" ")
        .map((val) =>
          "idk".repeat(Math.ceil(val.length / 3)).slice(0, val.length)
        )
        .join(" ");
    });
    console.log("here");

    return {
      value: newWords.join(" "),
    };
  }
}

const MVC = new MandarineCore().MVC();
MVC.run();
