import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello(): string {
    return '<h1>Guide</h1> Want to read more about <a href="/api">documention</a>?'
  }
}
