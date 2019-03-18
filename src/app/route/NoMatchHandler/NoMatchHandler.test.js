/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENCE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Route, Switch } from 'react-router-dom';
import NoMatch from 'Route/NoMatch';
import NoMatchHandler from './NoMatchHandler.component';

describe('<NoMatchHandler />', () => {
    const location = {
        hash: '',
        key: '',
        pathname: '',
        search: ''
    };

    const children = (
    <Switch>
        <Route path="/" exact component={ NoMatch } />
    </Switch>
    );

    let wrapper;
    let updateNoMatch;

    beforeEach(() => {
        updateNoMatch = jest.fn();
        wrapper = shallow(
        <NoMatchHandler updateNoMatch={ updateNoMatch } noMatch={ false } location={ location }>
            { children }
        </NoMatchHandler>
        );
    });

    it('render the <NoMatchHandler /> component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('renders children when passed in', () => {
        expect(wrapper.contains(children)).toBe(true);
    });

    it('returns NoMatch Component when NoMatch action is dispatched', () => {
        expect(wrapper.contains(children)).toBe(true);
        expect(wrapper.contains(<NoMatch />)).toBe(false);

        wrapper.setProps({ noMatch: true });

        expect(wrapper.contains(children)).toBe(false);
        expect(wrapper.contains(<NoMatch />)).toBe(true);
    });

    it('when new location is passed should call updateNoMatch', () => {
        wrapper.setProps({ noMatch: true });

        expect(updateNoMatch.mock.calls).toHaveLength(0);
        expect(wrapper.contains(children)).toBe(false);
        expect(wrapper.contains(<NoMatch />)).toBe(true);

        wrapper.setProps({ location: { ...location, pathname: 'new' } });

        expect(updateNoMatch.mock.calls).toHaveLength(1);

        wrapper.setProps({ noMatch: false });

        expect(wrapper.contains(children)).toBe(true);
        expect(wrapper.contains(<NoMatch />)).toBe(false);
    });

    it('when new location is the same should not call updateNoMatch', () => {
        expect(updateNoMatch.mock.calls).toHaveLength(0);

        wrapper.setProps({ location });

        expect(updateNoMatch.mock.calls).toHaveLength(0);
    });
});
