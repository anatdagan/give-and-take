import { BackendMethod, Controller, ControllerBase, Fields, UserInfo, Validators } from "remult";
import { Roles } from "../../shared/Roles";
import { terms } from "../../shared/terms";
import { User } from "../../shared/users/user";


@Controller('signIn')
export class SignInController extends ControllerBase {
    @Fields.string({
        caption: terms.username,
        validate: Validators.required
    })
    user = '';
    @Fields.string({
        caption: terms.password,
        validate: Validators.required,
        inputType: 'password'
    })
    password = '';

    @Fields.boolean({
        caption: terms.rememberOnThisDevice,
    })
    rememberOnThisDevice = false;

    @BackendMethod({ allowed: true })
    async signIn() {
        let result: UserInfo;
        const userRepo = this.remult.repo(User);
        let u = await userRepo.findFirst({ username: this.user });
        if (!u) {
            if (await userRepo.count() === 0) { //first ever user is the admin
                u = await userRepo.insert({
                    username: this.user,
                    admin: true
                })
            }
        }
        if (u) {
            if (!u.password) { // if the user has no password defined, the first password they use is their password
                u.password = (await import('password-hash')).generate(this.password);
                await userRepo.save(u);
            }

            if ((await import('password-hash')).verify(this.password, u.password)) {
                result = {
                    id: u.id,
                    roles: [],
                    name: u.username
                };
                if (u.admin) {
                    result.roles.push(Roles.admin);
                }
            }
        }

        if (result!) {
            return (await import('jsonwebtoken')).sign(result, getJwtSecret());
        }
        throw new Error(terms.invalidSignIn);
    }
}
export function getJwtSecret() {
    if (process.env['NODE_ENV'] === "production")
        return process.env['JWT_SECRET']!;
    return "my secret key";
}