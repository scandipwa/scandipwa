/** @namespace Util/ElementTransition/transitionElementFromTo */
/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/scandipwa
 * @link https://github.com/scandipwa/scandipwa
 */

export const transitionElementFromTo = async ({
    elFrom,
    elToCallback,
    isCopyCssProperties,
}) => {
    if (!elFrom || !elToCallback) {
        return;
    }

    const {
        top: st, left: sl, width: sw, height: sh,
    } = elFrom.getBoundingClientRect();

    const transitionWrapper = document.createElement('div');
    transitionWrapper.id = 'transition-wrapper';
    transitionWrapper.classList.add('element-transition');

    const clonedElement = elFrom.cloneNode(true);

    if (isCopyCssProperties) {
        const styles = window.getComputedStyle(elFrom);

        ['font', 'background', 'outline', 'border', 'color'].forEach((key) => {
            clonedElement.style.setProperty(key, styles.getPropertyValue(key));
        });
    }

    clonedElement.style.top = `${ st }px`;
    clonedElement.style.left = `${ sl }px`;
    clonedElement.style.width = `${ sw }px`;
    clonedElement.style.height = `${ sh }px`;

    transitionWrapper.appendChild(clonedElement);
    document.body.appendChild(transitionWrapper);

    // wait until condition is met
    await new Promise((resolve, reject) => {
        // eslint-disable-next-line fp/no-let
        let maxTries = 100;

        const interval = setInterval(() => {
            if (maxTries <= 0) {
                clearInterval(interval);
                reject();
            }

            const condition = elToCallback();

            if (condition) {
                clearInterval(interval);
                resolve();
            }

            maxTries -= 1;
        // eslint-disable-next-line no-magic-numbers
        }, 100);
    });

    const imageTo = elToCallback();

    const {
        top: tt, left: tl, width: tw,
    } = imageTo.getBoundingClientRect();

    const translateX = tl - sl;
    const translateY = tt - st;
    const scale = tw / sw;
    // const scaleY = th / sh;

    // clonedElement.style.transform = `translate3d(${ translateX }px, ${ translateY }px, 0) scale(${ scaleX }, ${ scaleY })`;
    clonedElement.style.transform = `translate3d(${ translateX }px, ${ translateY }px, 0) scale(${ scale })`;

    const productGallery = document.querySelector('.ProductGallery');
    const th = sh * scale;
    productGallery.style.height = `${ th }px`;

    setTimeout(() => {
        transitionWrapper.classList.add('element-transition--active');
        // eslint-disable-next-line no-magic-numbers
    }, 150);

    setTimeout(() => {
        transitionWrapper.remove();
        // eslint-disable-next-line no-magic-numbers
    }, 300);
};
