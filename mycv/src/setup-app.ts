import { ValidationPipe } from "@nestjs/common"
const cookieSession = require('cookie-session');
// import cookieSession from "cookie-session"

export const setupApp = (app: any) => {
    app.use(cookieSession({
        keys: ['sdgfdghsdgs']
      }))
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true
        })
      )
}