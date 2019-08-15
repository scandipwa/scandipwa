import React, { PureComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { stringify } from 'rebem-classname';

class Link extends PureComponent {
    render() {
        const {
            to,
            children,
            ...props
        } = this.props;

        if (!to) {
            return (
                <div { ...props }>
                    { children }
                </div>
            );
        }

        if (/^https?:\/\//.test(to)) {
            return (
                <a href={ to } { ...props }>
                    { children }
                </a>
            );
        }

        return (
            <RouterLink
              to={ to }
              className={ stringify(this.props) }
            >
                { children }
            </RouterLink>
        );
    }
}

export default Link;
