import {
    createParamDecorator,
    ExecutionContext
} from "@nestjs/common"

export const CurrentUser = createParamDecorator(
    // context can be used to abstract a web socket, incomming message, a grpc message, http request...
    // this is why it is called ExecutionContext and not request
    (data: any, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        console.log(request.session.userId)
        return request.currentUser
    }
)