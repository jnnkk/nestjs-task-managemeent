import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true }) // 유일한 값이어야 한다.
    username: string;

    @Column()
    password: string;

    static async createUser(authCredentialsDto : AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt(); // salt를 생성한다.
        const hashedPassword = await bcrypt.hash(password, salt); // password를 hash한다.


        const user = new User();
        user.username = username;
        user.password = hashedPassword;
        
        try {
            await user.save();
        } catch (error) {
            if (error.code === '23505') { // duplicate username
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}