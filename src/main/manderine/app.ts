import {
	MandarineCore,
	Controller,
	GET,
	POST,
	RequestBody,
	UseMiddleware,
	ResponseParam,
} from 'mandarinets';
import { Response } from 'https://deno.land/x/mandarinets@v2.1.1/deps.ts';
import { CustomHeaders } from '../middlewares/headers.ts';
import { ResponseTime } from '../middlewares/ResponseTime.ts';
import type { input, output } from '../typings/body.ts';

@Controller()
@UseMiddleware([ResponseTime, CustomHeaders])
export class MyController {
	@GET('/')
	public getHandler() {
		return 'POST here with  the body of {\n"value":"some string"\n}';
	}

	@POST('/')
	public postHandler(
		@RequestBody() reqBody: input,
		@ResponseParam() res: Response
	): output {
		if (reqBody.value === undefined) {
			res.status = 400;
			return {
				value: 'please enter a valid input',
			};
		} else {
			const words = reqBody.value.split(' ');
			const newWords = words.map((val) => {
				return val
					.split(' ')
					.map((val) =>
						'idk'.repeat(Math.ceil(val.length / 3)).slice(0, val.length)
					)
					.join(' ');
			});
			console.log('here');

			return {
				value: newWords.join(' '),
			};
		}
	}
}

const MVC = new MandarineCore().MVC();
MVC.run();
