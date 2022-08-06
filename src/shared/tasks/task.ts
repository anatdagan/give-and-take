import { Entity, Validators, isBackend, Allow, Fields, getEntityRef } from "remult";
import { Roles } from '../Roles';
import { terms } from "../terms";

@Entity<Task>("Tasks", {
        allowApiRead: Allow.authenticated,
        allowApiUpdate: Roles.admin,
        allowApiDelete: Roles.admin,
        allowApiInsert: Roles.admin
    },
    (options, remult) => {
        options.saving = async (task) => {
            if (isBackend()) {
                if (getEntityRef(task).isNew()) {
                    task.createDate = new Date();
                }
            }
        }
    })

export class Task {
    @Fields.uuid()
    id!: string;
    @Fields.string({
        validate: [Validators.required, Validators.uniqueOnBackend],
        caption: terms.taskTitle,
    })
    taskTitle = '';
    @Fields.date({
        allowApiUpdate: false
    })
    createDate = new Date();
    @Fields.string({
        caption: terms.taskDescription
    })
    taskDescription = '';
    @Fields.integer({
        caption: terms.taskAddedBy
    })
    taskAddedBy = 0;
    @Fields.string({
        caption: terms.sourceAddress
    })
    sourceAddress = ''
    @Fields.string({
        caption: terms.destinationAddress
    })
    destinationAddress = ''
    @Fields.boolean({
        caption: terms.isFitInElevator
    })
    isFitInElevator = true;
    @Fields.integer({
        caption: terms.destinationFloor
    })
    destinationFloor = null;
    @Fields.integer({
        caption: terms.sourceFloor
    })
    sourceFloor = null;
    @Fields.string({
        caption: terms.taskExternalRemarks
    })
    taskExternalRemarks = '';
    @Fields.string({
        caption: terms.taskInternalRemarks
    })
    taskInternalRemarks= '';
    @Fields.integer({
        caption: terms.taskRewardPoints
    })
    taskRewardPoints = 0
    @Fields.object({
        caption: terms.pickUpPossibleTimes
    })
    pickUpPossibleTimes = [];
    @Fields.object({
        caption: terms.dropOffPossibleTimes
    })
    dropOffPossibleTimes = [];
    @Fields.object({
        caption: terms.vehicleType
    })
    vehicleType = VehicleType.PrivateCar
    @Fields.string({
        caption: terms.pickUpContactName
    })
    pickUpContactName = ''
    @Fields.string({
        validate: (contact) => {
            return contact.pickUpContactPhone.exec(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
        },
        caption: terms.pickUpContactPhone
    })
    pickUpContactPhone = '';
    @Fields.string({
        caption: terms.dropOffContactName
    })
    dropOffContactName = ''
    @Fields.string({
        validate: (contact) => {
            return contact.dropOffContactPhone.exec(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
        },
        caption: terms.dropOffContactPhone
    })
    dropOffContactPhone = '';
    @Fields.string({
        caption: terms.assignedTo
    })
    volunteerID = '';
}

enum VehicleType {
    Scooter,
    PrivateCar,
    Truck,
    Van
}

enum TaskStatus {
    Default,
    Draft,
    Ready,
    Assigned,
    Stuck,
    PickedUp,
    DroppedOff,
    Cancelled,

}