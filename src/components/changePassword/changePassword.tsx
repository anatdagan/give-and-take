import { useState } from "react";
import { ErrorInfo } from "remult";
import { remult } from "../../common";
import { terms } from "../../shared/terms";
import { ChangePasswordController } from "./changePasswordController";

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [error, setError] = useState<ErrorInfo<ChangePasswordController>>();
    const changePassword = async () => {
        try {
            await new ChangePasswordController(remult).assign({ password, confirmPassword }).changePassword();
            setShowChangePassword(false);
        }
        catch (err: any) {
            alert(err.message);
            setError(err);
        }
    }
    if (!showChangePassword)
        return <button onClick={() => setShowChangePassword(true)}>{terms.changePassword}</button>;
    else return <div style={{
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        padding: 8,
        margin: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        maxWidth: 300
    }}>
        <strong>{terms.changePassword}</strong>
        <input placeholder={terms.password}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        {error?.modelState?.password}
        <input placeholder={terms.confirmPassword}
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
        />
        {error?.modelState?.confirmPassword}
        <div style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'flex-end'
        }}>
            <button onClick={() => setShowChangePassword(false)}>{terms.cancel}</button>
            <button onClick={changePassword}>{terms.changePassword}</button>
        </div>
    </div>

}
export default ChangePassword;