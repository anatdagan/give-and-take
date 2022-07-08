import { render, screen } from '@testing-library/react'

import ChangePassword from '../../components/changePassword/changePassword'

describe('ChangePasswordComponent', () => {
    test('should render change password', () => {
        render( <ChangePassword />)
        expect(screen.getByText('Change Password')).toBeInTheDocument();
    })
})