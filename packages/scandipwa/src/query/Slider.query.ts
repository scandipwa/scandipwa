/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa-theme
 * @link https://github.com/scandipwa/scandipwa-theme
 */

import { Field, Query } from '@tilework/opus';

import { Slide, Slider } from './Slider.type';

/**
 * Slider Query
 * @class Slider
 * @namespace Query/Slider/Query */
export class SliderQuery {
    getQuery(options: { sliderId: string }): Query<'slider', Slider> {
        const { sliderId } = options;

        return new Query<'scandiwebSlider', Slider>('scandiwebSlider')
            .addArgument('id', 'ID!', sliderId)
            .addFieldList(this._getSliderFields())
            .setAlias('slider');
    }

    _getSliderFields(): Array<
    Field<'slides', Slide, true>
    | Field<'slide_speed', number>
    | Field<'slider_id', number>
    | Field<'title', string>
    > {
        return [
            this._getSlidesField(),
            this._getSlideSpeedField(),
            new Field<'slider_id', number>('slider_id'),
            new Field<'title', string>('title'),
        ];
    }

    _getSlideFields(): Array<
    Field<'slide_text', string>
    | Field<'slide_id', number>
    | Field<'mobile_image', string>
    | Field<'desktop_image', string>
    | Field<'title', string>
    | Field<'is_active', boolean>
    > {
        return [
            new Field<'slide_text', string>('slide_text'),
            new Field<'slide_id', number>('slide_id'),
            new Field<'mobile_image', string>('mobile_image'),
            new Field<'desktop_image', string>('desktop_image'),
            new Field<'title', string>('title'),
            new Field<'is_active', boolean>('is_active'),
        ];
    }

    _getSlidesField(): Field<'slides', Slide, true> {
        return new Field<'slides', Slide, true>('slides', true)
            .addFieldList(this._getSlideFields());
    }

    _getSlideSpeedField(): Field<'slide_speed', number> {
        return new Field<'slide_speed', number>('slide_speed');
    }
}

export default new SliderQuery();
