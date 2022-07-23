import {Allow, Entity, Fields, getEntityRef, isBackend, Validators} from "remult";
import {Roles} from "../Roles";
import {terms} from "../terms";

@Entity<Organization>("Organizations", {
    allowApiRead: Allow.authenticated,
    allowApiUpdate: Roles.admin,
    allowApiDelete: Roles.admin,
    allowApiInsert: Roles.admin
},
    (options, remult) => {
        options.saving = async (organization) => {
            if (isBackend()) {
                if (getEntityRef(organization).isNew()) {
                    organization.createDate = new Date();
                }
            }
        }
    })
export class Organization {
    @Fields.uuid()
    id!: string;
    @Fields.string({
        validate: [Validators.required, Validators.uniqueOnBackend],
        caption: terms.organizationName
    })
    organizationName = '';
    @Fields.date({
        allowApiUpdate: false
    })
    createDate = new Date();
}