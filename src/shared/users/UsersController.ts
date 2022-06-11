import { BackendMethod, Remult } from 'remult';
import { Roles } from '../Roles';
import { User } from './user';

export class UsersControllers {

    @BackendMethod({ allowed: Roles.admin })
    static async resetPassword(userId: string, remult?: Remult) {
        const userRepo = remult!.repo(User);
        const user = await userRepo.findId(userId);
        user.password = '';
        await userRepo.save(user);
    }
}