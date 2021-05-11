import React from 'react';
import { shallow } from 'enzyme';
import ConfirmEmailPage from '../../../components/auth/ConfirmEmailPage';
import { Route, MemoryRouter } from 'react-router-dom';
import { render } from 'react-dom';

const renderComponent = ({ id }) =>
render(
    <MemoryRouter initialEntries={[`/confirm_email/${id}`]}>
        <Route path="/confirm_email/:id">
            <ConfirmEmailPage />
        </Route>
    </MemoryRouter>
);

describe('AuthTabs component', () => {
    it('should render AuthTabs component', async () => {
        const { getByText } = renderComponent({ id: 5 });
        getByText.toMatchSnapshot()
    })
})