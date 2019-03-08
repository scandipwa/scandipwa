import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import NoMatch from './NoMatch.component';


describe('<NoMatch />', () => {
    const mockBreadcrumbs = jest.fn();
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
        <NoMatch updateBreadcrumbs={ mockBreadcrumbs } />
        );
    });

    it('render the <NoMatch /> component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('Header', () => {
        expect(wrapper.contains(<h1>404</h1>)).toBe(true);
    });

    it('Subtitle', () => {
        expect(wrapper.contains(<p block="NoMatch" elem="Subtitle">Page not found</p>)).toBe(true);
    });

    it('Link to Homepage', () => {
        expect(wrapper.contains(
        <Link to="/">
            <button>
                    Back to homepage
            </button>
        </Link>
        )).toBe(true);
    });
});
