import { remultExpress } from 'remult/remult-express';
import { ChangePasswordController } from '../components/changePassword/changePasswordController';
import { SignInController } from '../components/signIn/SignInController';

import { User } from '../shared/users/user';
import { UsersControllers } from '../shared/users/UsersController';
import { createPostgresConnection } from "remult/postgres";


export const api = remultExpress({
    dataProvider: async () => {
        if (process.env["NODE_ENV"] === "production")
            return createPostgresConnection({ configuration: "heroku" });
        return undefined;
    },
    controllers: [SignInController, ChangePasswordController, UsersControllers],
    entities: [User]
});
