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
    @Fields.string({
        caption: terms.organizationDescription
    })
    organizationDescription = '';
    @Fields.string({
        caption: terms.contactName
    })
    contactName = ''
    @Fields.string({
        validate: (contact) => {
            return contact.phonenumber.exec(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
        },
        caption: terms.contactPhoneNumber
    })
    contactPhoneNumber = '';
    @Fields.string({
        validate: (contact) => {
            return contact.contactEmail.exec(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/im)
        },
        caption: terms.contactEmail
    })
    contactEmail = '';
}