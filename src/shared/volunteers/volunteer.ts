import {Allow, Entity, Fields, getEntityRef, isBackend} from "remult";
import {Roles} from "../Roles";

@Entity<Volunteer>("Volunteer", {
        allowApiRead: Allow.authenticated,
        allowApiUpdate: Roles.admin,
        allowApiDelete: Roles.admin,
        allowApiInsert: Roles.admin
    },
    (options, remult) => {
        options.saving = async (volunteer) => {
            if (isBackend()) {
                if (getEntityRef(volunteer).isNew()) {
                    volunteer.createDate = new Date();
                }
            }
        }
    })

export class Volunteer {
    @Fields.uuid()
    id!: string;
    @Fields.string()
    userId = ''

}