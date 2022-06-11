import { Entity, Validators, isBackend, Allow, Fields, getEntityRef } from "remult";
import { Roles } from '../Roles';
import { terms } from "../terms";

@Entity<User>("Users", {
    allowApiRead: Allow.authenticated,
    allowApiUpdate: Allow.authenticated,
    allowApiDelete: Roles.admin,
    allowApiInsert: Roles.admin
},
    (options, remult) => {
        options.apiPrefilter = !remult.isAllowed(Roles.admin) ? { id: remult.user.id } : {};
        options.saving = async (user) => {
            if (isBackend()) {
                if (getEntityRef(user).isNew()) {
                    user.createDate = new Date();
                }
            }
        }
        options.deleting = async (user) => {
            if (isBackend())
                if (await remult.repo(User).count({ admin: true, id: { "!=": user.id } }) === 0)
                    throw terms.cantDeleteTheLastAdminUser;
        }
    }
)
export class User {
    @Fields.uuid()
    id!: string;
    @Fields.string({
        validate: [Validators.required, Validators.uniqueOnBackend],
        caption: terms.username
    })
    username = '';
    @Fields.string({ includeInApi: false })
    password = '';
    @Fields.date({
        allowApiUpdate: false
    })
    createDate = new Date();

    @Fields.boolean({
        allowApiUpdate: Roles.admin,
        caption: terms.admin
    })
    admin = false;
}