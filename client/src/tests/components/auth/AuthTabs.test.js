import React from 'react';
import { shallow } from 'enzyme';
import AuthTabs from '../../../components/auth/AuthTabs';

describe('AuthTabs component', () => {
    it('should render AuthTabs component', () => {
        const wrapper = shallow(<AuthTabs/>)
        expect(wrapper).toMatchSnapshot()
    })
})