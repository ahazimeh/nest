import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    id: number;

    @Expose({ groups: ['owner'] })
    email: string;
}