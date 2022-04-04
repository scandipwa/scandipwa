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

import { Field, Query } from '@tilework/opus';

import { GQLSlide, GQLSlider } from 'Type/Graphql.type';

import { CommonField } from './Query.type';

/**
 * Slider Query
 * @class Slider
 * @namespace Query/Slider/Query */
export class SliderQuery {
    getQuery(options: { sliderId: string }): Query<'slider', GQLSlider> {
        const { sliderId } = options;

        return new Query<'scandiwebSlider', GQLSlider>('scandiwebSlider')
            .addArgument('id', 'ID!', sliderId)
            .addFieldList(this._getSliderFields())
            .setAlias('slider');
    }

    _getSliderFields(): CommonField[] {
        return [
            this._getSlidesField(),
            this._getSlideSpeedField(),
            'slider_id',
            'title'
        ];
    }

    _getSlideFields(): string[] {
        return [
            'slide_text',
            'slide_id',
            'mobile_image',
            'desktop_image',
            'title',
            'is_active'
        ];
    }

    _getSlidesField(): Field<'slides', GQLSlide, true> {
        return new Field('slides', true)
            .addFieldList(this._getSlideFields());
    }

    _getSlideSpeedField(): Field<'slideSpeed', number> {
        return new Field<'slide_speed', number>('slide_speed').setAlias('slideSpeed');
    }
}

export default new SliderQuery();
