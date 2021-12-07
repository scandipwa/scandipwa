/* eslint-disable react/forbid-dom-props */
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
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import Breadcrumbs from 'Component/Breadcrumbs/Breadcrumbs.component';
import ContentWrapper from 'Component/ContentWrapper';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import LockIcon from 'Component/LockIcon';
import Notification from 'Component/Notification';

import {
    ADDITIONAL_ELEMENTS,
    BUTTONS, COLORS,
    INPUTS,
    NOTIFICATION_ERROR_DATA,
    NOTIFICATION_INFO_DATA,
    NOTIFICATION_SUCCESS_DATA,
    TEXT_STYLES
} from './StyleGuidePage.config';

import './StyleGuidePage.style';

/** @namespace Route/StyleGuidePage/Component */
export class StyleGuidePageComponent extends PureComponent {
    static propTypes = {
        fakeFunction: PropTypes.func.isRequired
    };

    renderMap = {
        [COLORS]: () => this.renderColors(),
        [BUTTONS]: () => this.renderButtons(),
        [TEXT_STYLES]: () => this.renderTextStyles(),
        [INPUTS]: () => this.renderInputs(),
        [ADDITIONAL_ELEMENTS]: () => this.renderAdditionalElements()
    };

    renderContentWrapper() {
        return (
            <>
            <ContentWrapper wrapperMix={ { block: 'StyleGuidePage', elem: 'DesktopContentWrapper' } }>
                <h3>{ __('Desktop Content Wrapper Max Width: 1400px') }</h3>
                <h4>{ __('Padding Right: 32px') }</h4>
                <h4>{ __('Padding Left: 32px') }</h4>
            </ContentWrapper>
            <div block="StyleGuidePage" elem="Mt70" />
            <ContentWrapper wrapperMix={ { block: 'StyleGuidePage', elem: 'MobileContentWrapper' } }>
                <h3>{ __('Mobile Content Wrapper Max Width: 810px') }</h3>
                <h4>{ __('Padding Right: 14px') }</h4>
                <h4>{ __('Padding Left: 14px') }</h4>
            </ContentWrapper>
            </>
        );
    }

    renderColors() {
        return (
            <div block="StyleGuidePage" elem="Colors">
                <h4 block="StyleGuidePage" elem="SubHeading">{ __('Color scheme') }</h4>
                <div>
                    <div block="StyleGuidePage" elem="Color" id="primaryBase" />
                    <span block="StyleGuidePage" elem="ColorLabel">{ __('PRIMARY BASE') }</span>
                </div>
                <div>
                    <div block="StyleGuidePage" elem="Color" id="primaryHover" />
                    <span block="StyleGuidePage" elem="ColorLabel">{ __('PRIMARY HOVER') }</span>
                </div>
                <div>
                    <div block="StyleGuidePage" elem="Color" id="primaryHighlight" />
                    <span block="StyleGuidePage" elem="ColorLabel">{ __('PRIMARY HIGHTLIGHT') }</span>
                </div>
                <div>
                    <div block="StyleGuidePage" elem="Color" id="secondaryBase" />
                    <span block="StyleGuidePage" elem="ColorLabel">{ __('SECONDARY BASE') }</span>
                </div>
                <div>
                    <div block="StyleGuidePage" elem="Color" id="secondaryHover" />
                    <span block="StyleGuidePage" elem="ColorLabel">{ __('SECONDARY HOVER') }</span>
                </div>
                <div>
                    <div block="StyleGuidePage" elem="Color" id="secondaryHightlight" />
                    <span block="StyleGuidePage" elem="ColorLabel">{ __('SECONDARY HIGHLIGHT') }</span>
                </div>
                <div>
                    <div block="StyleGuidePage" elem="Color" id="text" />
                    <span block="StyleGuidePage" elem="ColorLabel">{ __('TEXT') }</span>
                </div>
                <div>
                    <div block="StyleGuidePage" elem="Color" id="error" />
                    <span block="StyleGuidePage" elem="ColorLabel">{ __('ERROR') }</span>
                </div>
                <div>
                    <div block="StyleGuidePage" elem="Color" id="success" />
                    <span block="StyleGuidePage" elem="ColorLabel">{ __('SUCCESS') }</span>
                </div>
                <div>
                    <div block="StyleGuidePage" elem="Color" id="info" />
                    <span block="StyleGuidePage" elem="ColorLabel">{ __('INFO') }</span>
                </div>
            </div>
        );
    }

    renderButtons() {
        return (
            <div block="StyleGuidePage" elem="Buttons">
                <h4 block="StyleGuidePage" elem="SubHeading">{ __('Transactional [default state + hover]') }</h4>
                <div>
                    <button block="Button" id="buttons">
                        { __('Button text') }
                    </button>
                    <button block="Button" id="hoverButtons" mods={ { isHovered: true } }>
                        { __('Button text') }
                    </button>
                    <button block="Button" id="disabledButtons" disabled>
                        { __('Button text') }
                    </button>
                </div>
                <div>
                    <button block="Button">
                        <LockIcon />
                        { __('Button text') }
                    </button>
                    <button block="Button" mods={ { isHovered: true } }>
                        <LockIcon />
                        { __('Button text') }
                    </button>
                    <button block="Button" disabled>
                        <LockIcon />
                        { __('Button text') }
                    </button>
                </div>
                <h4 block="StyleGuidePage" elem="SubHeading">{ __('Supportive [default state + hover]') }</h4>
                <button block="Button" id="hollowButtons" mods={ { isHollow: true } }>
                    { __('Secondary button') }
                </button>
                <button block="Button" id="hollowHoverButtons" mods={ { isHollow: true, isHovered: true } }>
                    { __('Secondary button') }
                </button>
                <button block="Button" id="hollowHoverButtons" mods={ { isHollow: true } } disabled>
                    { __('Secondary button') }
                </button>
            </div>
        );
    }

    renderTextStyles() {
        return (
            <>
                <div block="StyleGuidePage" elem="DesktopTextStyles">
                    <h4 block="StyleGuidePage" elem="SubHeading">{ __('Desktop') }</h4>
                    <h1 id="h1">{ __('Heading 1') }</h1>
                    <h2 id="h2">{ __('Heading 2') }</h2>
                    <h3 id="h3">{ __('Heading 3') }</h3>
                    <p id="paragraph">
                        { __('The ') }
                        <a block="Link" href="/">{ __('website') }</a>
                        { __(' aims to achieve') }
                        <strong>{ __(' following ') }</strong>
                        { __('business goals:') }
                    </p>
                    <p id="paragraph">
                        { __('The ') }
                        <a block="StyleGuidePage" href="/" elem="ActiveLink">{ __('website') }</a>
                        { __(' aims to achieve') }
                        <strong>{ __(' following ') }</strong>
                        { __('business goals:') }
                    </p>
                    <p block="caption" id="caption">
                        { __('The ') }
                        <a block="Link" href="/">{ __('website') }</a>
                        { __(' aims to achieve') }
                        <strong>{ __(' following ') }</strong>
                        { __('business goals:') }
                    </p>
                    <p block="caption" id="caption">
                        { __('The ') }
                        <a block="StyleGuidePage" elem="ActiveLink" href="/">{ __('website') }</a>
                        { __(' aims to achieve') }
                        <strong>{ __(' following ') }</strong>
                        { __('business goals:') }
                    </p>
                </div>
                <div block="StyleGuidePage" elem="MobileTextStyles">
                    <h4 block="StyleGuidePage" elem="SubHeading">{ __('Mobile') }</h4>
                    <h1 id="h1Mobile">{ __('Heading 1') }</h1>
                    <h2 id="h2Mobile">{ __('Heading 2') }</h2>
                    <h3 id="h3Mobile">{ __('Heading 3') }</h3>
                    <p id="paragraphMobile">
                        { __('The ') }
                        <a block="Link" href="/">{ __('website') }</a>
                        { __(' aims to achieve') }
                        <strong>{ __(' following ') }</strong>
                        { __('business goals:') }
                    </p>
                    <p id="paragraphMobile">
                        { __('The ') }
                        <a block="StyleGuidePage" elem="ActiveLink" href="/">{ __('website') }</a>
                        { __(' aims to achieve') }
                        <strong>{ __(' following ') }</strong>
                        { __('business goals:') }
                    </p>
                    <p block="caption" id="captionMobile">
                        { __('The ') }
                        <a block="Link" href="/">{ __('website') }</a>
                        { __(' aims to achieve') }
                        <strong>{ __(' following ') }</strong>
                        { __('business goals:') }
                    </p>
                    <p block="caption" id="captionMobile">
                        { __('The ') }
                        <a block="StyleGuidePage" elem="ActiveLink" href="/">{ __('website') }</a>
                        { __(' aims to achieve') }
                        <strong>{ __(' following ') }</strong>
                        { __('business goals:') }
                    </p>
                </div>
            </>
        );
    }

    renderInputs() {
        return (
            <>
                <h4 block="StyleGuidePage" elem="SubHeading">{ __('Select') }</h4>
                <Field
                  type={ FIELD_TYPE.select }
                  label="Color"
                  attr={ {
                      selectPlaceholder: __('Select color')
                  } }
                  addRequiredTag
                  options={ [{ label: 'Yellow', value: 'yellow' }, { label: 'Orange', value: 'Orange' }] }
                />
                <Field
                  type={ FIELD_TYPE.select }
                  label="Color"
                  attr={ {
                      selectPlaceholder: __('Select color')
                  } }
                  isDisabled
                />
                <Field
                  type={ FIELD_TYPE.select }
                  label="Color"
                  attr={ {
                      selectPlaceholder: __('Select color')
                  } }
                  options={ [{ label: 'Yellow', value: 'yellow' }, { label: 'Orange', value: 'Orange' }] }
                />
                <div block="StyleGuidePage" elem="Mt70" />
                <Field
                  type={ FIELD_TYPE.select }
                  label="Color"
                  attr={ {
                      selectPlaceholder: __('Select color'),
                      isExpanded: true
                  } }
                  options={ [
                      { label: 'Yellow', value: 'yellow', isHovered: true },
                      { label: 'Orange', value: 'Orange' }
                  ] }
                />
                <div block="StyleGuidePage" elem="Mt150" />
                <Field
                  type={ FIELD_TYPE.select }
                  label="Color"
                  attr={ {
                      selectPlaceholder: __('Select color'),
                      block: 'StyleGuidePage',
                      elem: 'Select',
                      mods: { hasError: true }
                  } }
                  options={ [
                      { label: 'Yellow', value: 'yellow' },
                      { label: 'Orange', value: 'Orange' }
                  ] }
                  addRequiredTag
                />
                <div block="Field" elem="ErrorMessages">
                This field is required!
                </div>
                <Field
                  type={ FIELD_TYPE.select }
                  label="Color"
                  attr={ {
                      selectPlaceholder: __('Select color'),
                      value: 'orange',
                      block: 'StyleGuidePage',
                      elem: 'Select',
                      mods: { isValid: true }
                  } }
                  options={ [
                      { label: 'Yellow', value: 'yellow' },
                      { label: 'Orange', value: 'orange' }
                  ] }
                />

                <h4 block="StyleGuidePage" elem="SubHeading">{ __('Text') }</h4>
                <Field
                  type={ FIELD_TYPE.text }
                  label="Email"
                  attr={ {
                      placeholder: __('Your email address')
                  } }
                  addRequiredTag
                />
                <Field
                  type={ FIELD_TYPE.text }
                  label="Email"
                  attr={ {
                      placeholder: __('Your email address')
                  } }
                  isDisabled
                />
                <Field
                  type={ FIELD_TYPE.text }
                  label="Email"
                  attr={ {
                      placeholder: __('Your email address')
                  } }
                />
                <Field
                  type={ FIELD_TYPE.text }
                  label="Email"
                  attr={ {
                      placeholder: __('Your email address'),
                      block: 'StyleGuidePage',
                      elem: 'Text',
                      mods: { isFocused: true }
                  } }
                />
                <Field
                  type={ FIELD_TYPE.text }
                  label="Email"
                  attr={ {
                      placeholder: __('Your email address'),
                      block: 'StyleGuidePage',
                      elem: 'Text',
                      mods: { hasError: true }
                  } }
                  addRequiredTag
                />
                <div block="Field" elem="ErrorMessages">
                This field is required!
                </div>
                <Field
                  type={ FIELD_TYPE.text }
                  label="Email"
                  attr={ {
                      placeholder: __('Your email address'),
                      block: 'StyleGuidePage',
                      elem: 'Text',
                      mods: { isValid: true },
                      value: 'email@example.com'
                  } }
                />

                <h4 block="StyleGuidePage" elem="SubHeading">{ __('Checkbox') }</h4>
                <Field
                  type="checkbox"
                  label="Remember me"
                  isDisabled
                />
                <Field
                  type="checkbox"
                  label="Remember me"
                />
                <Field
                  type="checkbox"
                  label="Remember me"
                  attr={ { block: 'StyleGuidePage', elem: 'HoveredInput', id: 'hoveredCheckbox' } }
                />
                <Field
                  type="checkbox"
                  label="Remember me"
                  attr={ { block: 'StyleGuidePage', elem: 'ErrorInput', id: 'errorCheckbox' } }
                />
                <div block="Field" elem="ErrorMessages">
                    This is an error message
                </div>
                <Field
                  type="checkbox"
                  label="Remember me"
                  attr={ {
                      checked: true
                  } }
                />

                <h4 block="StyleGuidePage" elem="SubHeading">{ __('Radio') }</h4>
                <Field
                  type="radio"
                  label="Remember me"
                  isDisabled
                />
                <Field
                  type="radio"
                  label="Remember me"
                />
                <Field
                  type="radio"
                  label="Remember me"
                  attr={ { block: 'StyleGuidePage', elem: 'HoveredInput', id: 'hoveredRadio' } }
                />
                <Field
                  type="radio"
                  label="Remember me"
                  attr={ { block: 'StyleGuidePage', elem: 'ErrorInput', id: 'errorRadio' } }
                />
                <div block="Field" elem="ErrorMessages">
                    This is an error message
                </div>
                <Field
                  type="radio"
                  label="Remember me"
                  attr={ { checked: true } }
                />
            </>
        );
    }

    renderAdditionalElements() {
        const { fakeFunction } = this.props;

        return (
            <>
                <h4 block="StyleGuidePage" elem="SubHeading">
                    { __('Breadcrumbs') }
                </h4>
                <Breadcrumbs
                  breadcrumbs={ [{ url: '/styleguide', name: 'Style Guide' }] }
                  areBreadcrumbsVisible
                />
                <Breadcrumbs
                  breadcrumbs={ [{ name: 'Style Guide' }] }
                  areBreadcrumbsVisible
                />

                <h4 block="StyleGuidePage" elem="SubHeading">
                    { __('Notification messages') }
                </h4>

                <Notification
                  onHideNotification={ fakeFunction }
                  lifeTime={ 9999999 }
                  notificationId="success"
                  notification={ NOTIFICATION_SUCCESS_DATA }
                  id="notificationSuccess"
                />
                <Notification
                  onHideNotification={ fakeFunction }
                  lifeTime={ 9999999 }
                  notificationId="error"
                  notification={ NOTIFICATION_ERROR_DATA }
                  id="notificationError"
                />
                <Notification
                  onHideNotification={ fakeFunction }
                  lifeTime={ 9999999 }
                  notificationId="info"
                  notification={ NOTIFICATION_INFO_DATA }
                  id="notificationInfo"
                />
            </>
        );
    }

    renderItem(title, render) {
        return (
            <div block="StyleGuidePage" elem="Component" key={ title }>
                <h1 block="StyleGuidePage" elem="Heading">{ title }</h1>
                { render() }
            </div>
        );
    }

    render() {
        return (
            <main block="StyleGuidePage">
                { this.renderContentWrapper() }
                <ContentWrapper
                  wrapperMix={ { block: 'StyleGuidePage', elem: 'Wrapper' } }
                  label={ __('Style Guide page') }
                >
                    { Object.entries(this.renderMap).map(([key, item]) => this.renderItem(key, item)) }
                </ContentWrapper>
            </main>
        );
    }
}

export default StyleGuidePageComponent;
