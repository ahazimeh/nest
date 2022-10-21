import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { UsersService } from "src/users/users.service";

@Injectable()
export class currentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) {}
    async use(req: any, res: Response, next: NextFunction) {
        const { userId } = req.session || {};
        if(userId) {
            const user = await this.usersService.findOne(userId);
            req.currentUser = user;
        }

        next();
    }

}