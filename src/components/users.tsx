import { useEffect, useState } from "react";
import { remult } from "../common";
import { Roles } from "../shared/Roles";
import { terms } from "../shared/terms";
import { User } from "../shared/users/user";
import { UsersControllers } from "../shared/users/UsersController";

const userRepo = remult.repo(User);
const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const addUser = () => setUsers([...users, new User()]);
    useEffect(() => {
        userRepo.find().then(setUsers);
    }, [remult.user]);
    return <div>
        Users
        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>admin</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => {
                    const handleChange = (values: Partial<User>) => {
                        setUsers(users.map(u => u === user ? { ...user, ...values } : u));
                    };
                    const save = async () => {
                        try {
                            const savedUser = await userRepo.save(user);
                            setUsers(users.map(u => u === user ? savedUser : u));
                        } catch (error: any) {
                            alert(error.message);
                        }
                    }
                    const deleteUser = async () => {
                        if (confirm(terms.areYouSureYouWouldLikeToDelete)) {
                            try {
                                await userRepo.delete(user);
                                setUsers(users.filter(u => u !== user));
                            } catch (error: any) {
                                alert(error.message);
                            }
                        }
                    }
                    const resetPassword = async () => {
                        if (confirm(terms.shouldResetPassword)) {
                            await UsersControllers.resetPassword(user.id);
                            alert(terms.passwordDeleted)
                        }
                    }
                    return <tr key={user.id}>
                        <td>
                            <input value={user.username}
                                onChange={e => handleChange({ username: e.target.value })} />
                        </td>
                        <td>
                            <input checked={user.admin}
                                disabled={!remult.isAllowed(Roles.admin)}
                                type="checkbox"
                                onChange={e => handleChange({ admin: e.target.checked })} />
                        </td>
                        <td style={{ display: 'flex', gap: 8 }}>
                            <button onClick={save}>{terms.save}</button>
                            {userRepo.metadata.apiDeleteAllowed && <button onClick={deleteUser}>{terms.delete}</button>}
                            {remult.isAllowed(Roles.admin) && <button onClick={resetPassword}>{terms.resetPassword}</button>}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        {userRepo.metadata.apiInsertAllowed && <button onClick={addUser}>Add User</button>}
    </div>
}
export default Users;