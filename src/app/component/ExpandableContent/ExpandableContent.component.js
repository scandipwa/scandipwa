/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import './ExpandableContent.style';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import TextPlaceholder from 'Component/TextPlaceholder';
import { ChildrenType, MixType } from 'Type/Common';

export class ExpandableContent extends PureComponent {
    static propTypes = {
        isContentExpanded: PropTypes.bool,
        heading: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        subHeading: PropTypes.string,
        children: ChildrenType.isRequired,
        mix: MixType.isRequired,
        onClick: (props, propName, componentName) => {
            const propValue = props[propName];
            if (propValue === null) {
                return;
            }
            if (typeof propValue === 'function') {
                return;
            }
            throw new Error(`${componentName} only accepts null or string`);
        }
    };

    static defaultProps = {
        subHeading: '',
        heading: '',
        isContentExpanded: false,
        onClick: null
    };

    constructor(props) {
        super(props);

        const { isContentExpanded } = this.props;
        this.state = {
            isContentExpanded,
            // eslint-disable-next-line react/no-unused-state
            prevIsContentExpanded: isContentExpanded
        };
    }

    static getDerivedStateFromProps({ isContentExpanded }, { prevIsContentExpanded }) {
        if (isContentExpanded !== prevIsContentExpanded) {
            return {
                prevIsContentExpanded: isContentExpanded,
                isContentExpanded
            };
        }

        return null;
    }

    toggleExpand = () => {
        const { onClick } = this.props;
        if (onClick) {
            onClick(); return;
        }
        this.setState(({ isContentExpanded }) => (
            { isContentExpanded: !isContentExpanded }
        ));
    };

    renderButton() {
        const { isContentExpanded } = this.state;
        const {
            heading,
            subHeading,
            mix
        } = this.props;

        return (
            <button
              block="ExpandableContent"
              elem="Button"
              mods={ { isContentExpanded } }
              mix={ { ...mix, elem: 'ExpandableContentButton' } }
              onClick={ this.toggleExpand }
            >
                <span
                  block="ExpandableContent"
                  elem="Heading"
                  mix={ { ...mix, elem: 'ExpandableContentHeading' } }
                >
                    { typeof heading === 'string' ? (
                        <TextPlaceholder content={ heading } length="medium" />
                    ) : (
                        heading
                    ) }
                </span>
                <span
                  block="ExpandableContent"
                  elem="SubHeading"
                  mix={ { ...mix, elem: 'ExpandableContentSubHeading' } }
                >
                    { subHeading }
                </span>
            </button>

        );
    }

    renderContent() {
        const { children, mix } = this.props;
        const { isContentExpanded } = this.state;
        const mods = { isContentExpanded };

        return (
            <div
              block="ExpandableContent"
              elem="Content"
              mods={ mods }
              mix={ { ...mix, elem: 'ExpandableContentContent', mods } }
            >
                { children }
            </div>
        );
    }

    render() {
        const { mix } = this.props;

        return (
            <article
              block="ExpandableContent"
              mix={ mix }
            >
                { this.renderButton() }
                { this.renderContent() }
            </article>
        );
    }
}

export default ExpandableContent;
