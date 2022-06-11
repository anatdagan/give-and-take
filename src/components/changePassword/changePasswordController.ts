import { Allow, BackendMethod, Controller, ControllerBase, Fields,  Validators } from "remult";
import { terms } from "../../shared/terms";
import { User } from "../../shared/users/user";

@Controller("changePassword")
export class ChangePasswordController extends ControllerBase {

    @Fields.string({
        validate: Validators.required
    })
    password = '';
    @Fields.string<ChangePasswordController>({
        validate: [Validators.required, self => {
            if (self.password != self.confirmPassword)
                throw terms.doesNotMatchPassword;
        }]
    })
    confirmPassword = '';

    @BackendMethod({ allowed: Allow.authenticated })
    async changePassword() {
        const userRepo = this.remult.repo(User);
        const user = await userRepo.findId(this.remult.user.id);
        user.password = (await import('password-hash')).generate(this.password);
        await userRepo.save(user);
    }
}