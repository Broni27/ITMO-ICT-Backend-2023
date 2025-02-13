import {Table, Column, Model, Unique, AllowNull, BeforeCreate, BeforeUpdate} from 'sequelize-typescript'
import bcrypt from "bcrypt";

@Table
class User extends Model {
    @Unique
    @Column
    username: string;

    @Unique
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const {password} = instance;

        if (instance.changed('password')) {
            instance.password = bcrypt.hashSync(password, bcrypt.genSaltSync(128));
        }
    }
}

export default User;
