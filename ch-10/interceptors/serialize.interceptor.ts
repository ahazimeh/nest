import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"
import { plainToClass, plainToInstance } from "class-transformer"
import { UserDto } from "src/users/dtos/user.dto"

// to at least force the controller to give us a type of class
interface ClassConstructor {
    new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {

    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // throw new Error("Method not implemented.")
        // run something before a request is handled
        // by the request handler
        console.log("I am running before the handler",context)

        return next.handle().pipe(
            map((data: any) => {
                // run something before the response is sent out
                console.log("I am running before response is sent out", data)
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }

}