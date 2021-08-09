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
import AddIcon from 'Component/AddIcon';
import CartIcon from 'Component/CartIcon';
import ChevronIcon from 'Component/ChevronIcon';
import CloseIcon from 'Component/CloseIcon';
import CompareIcon from 'Component/CompareIcon';
import EditIcon from 'Component/EditIcon';
import ExclamationMarkIcon from 'Component/ExclamationMarkIcon';
import FilterIcon from 'Component/FilterIcon';
import GridIcon from 'Component/GridIcon';
import HeartIcon from 'Component/HeartIcon';
import HomeIcon from 'Component/HomeIcon';
import ListIcon from 'Component/ListIcon';
import MenuIcon from 'Component/MenuIcon';
import MinusIcon from 'Component/MinusIcon';
import SearchIcon from 'Component/SearchIcon';
import ShareIcon from 'Component/ShareIcon';
import StarIcon from 'Component/StarIcon';
import UserIcon from 'Component/UserIcon';
import facebook from 'Style/icons/Logos/facebook.svg';
import linkedIn from 'Style/icons/Logos/linkedIn.svg';
import twitter from 'Style/icons/Logos/twitter.svg';

export const BUTTONS = 'buttons';
export const TEXT_STYLES = 'text styles';
export const MENU_ITEMS_AND_LINKS = 'menu items and links';
export const INPUTS = 'inputs';
export const ICONS = 'icons';
export const PRODUCT_POD = 'product pod';
export const ADDITIONAL_ELEMENTS = 'additional elements';
export const ICONS_LIST = {
    CartIcon,
    FilterIcon,
    MinusIcon,
    AddIcon,
    MenuIcon,
    SearchIcon,
    UserIcon,
    HeartIcon,
    StarIcon,
    ChevronIcon,
    CompareIcon,
    ExclamationMarkIcon,
    CloseIcon,
    linkedIn,
    facebook,
    twitter,
    GridIcon,
    HomeIcon,
    ListIcon,
    ShareIcon,
    EditIcon
};
export const NOTIFICATION_SUCCESS_DATA = {
    msgText: 'Product was added to cart!',
    msgType: 'success'
};
export const NOTIFICATION_ERROR_DATA = {
    msgText: 'Product was not added to cart!',
    msgType: 'error'
};
export const NOTIFICATION_INFO_DATA = {
    msgText: 'Please correct all errors.',
    msgType: 'info'
};
