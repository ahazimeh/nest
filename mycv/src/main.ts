import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from './app.module';
import { setupApp } from './setup-app';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // setupApp(app)
  // app.use(cookieSession({
  //   keys: ['sdgfdghsdgs']
  // }))
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true
  //   })
  // )
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
