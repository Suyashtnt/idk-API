import { MandarineCore, Controller, GET, POST, RequestBody } from "mandarinets";
import type { input, output } from "../typings/body.ts";

@Controller()
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

    return {
      value: newWords.join(" "),
    };
  }
}

new MandarineCore().MVC().run();
