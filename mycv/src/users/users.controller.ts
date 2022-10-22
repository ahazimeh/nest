import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors, ClassSerializerInterceptor, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color
    }

    // @Get('whoami')
    // whoAmI(@Session() session: any) {
    //     return this.usersService.findOne(session.userId)
    // }

    @Get('whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {
        return user
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password)
        session.userId = user.id
        return user;
        // this.usersService.create(body.email, body.password)
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password)
        session.userId = user.id
        return user;
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @Serialize(UserDto)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('handler is running')
        const user = await this.usersService.findOne(+id)
        if(!user){
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(+id)
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(+id, body)
    }
}
