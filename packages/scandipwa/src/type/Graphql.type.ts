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

export interface GQLSelectedBundleOptionValue {
    id: number;
    label: string;
    price: number;
    quantity: number;
    uid: string;
}

export interface GQLSelectedCustomizableOption {
    customizable_option_uid: string;
    id: number;
    is_required: boolean;
    label: string;
    sort_order: number;
    type: string;
    values: Array<GQLSelectedCustomizableOptionValue | null>;
}

export interface GQLSelectedCustomizableOptionValue {
    customizable_option_value_uid: string;
    id: number;
    label: string;
    price: GQLCartItemSelectedOptionValuePrice;
    value: string;
}

export interface GQLCartItemSelectedOptionValuePrice {
    type: GQLPriceTypeEnum;
    units: string;
    value: number;
}

export enum GQLPriceTypeEnum {
    FIXED = 'FIXED',
    PERCENT = 'PERCENT',
    DYNAMIC = 'DYNAMIC',
}

export interface GQLSelectedDownloadableLinks {
    id?: number;
    label?: string;
}

export enum GQLCurrencyEnum {
    AFN = 'AFN',
    ALL = 'ALL',
    AZN = 'AZN',
    DZD = 'DZD',
    AOA = 'AOA',
    ARS = 'ARS',
    AMD = 'AMD',
    AWG = 'AWG',
    AUD = 'AUD',
    BSD = 'BSD',
    BHD = 'BHD',
    BDT = 'BDT',
    BBD = 'BBD',
    BYN = 'BYN',
    BZD = 'BZD',
    BMD = 'BMD',
    BTN = 'BTN',
    BOB = 'BOB',
    BAM = 'BAM',
    BWP = 'BWP',
    BRL = 'BRL',
    GBP = 'GBP',
    BND = 'BND',
    BGN = 'BGN',
    BUK = 'BUK',
    BIF = 'BIF',
    KHR = 'KHR',
    CAD = 'CAD',
    CVE = 'CVE',
    CZK = 'CZK',
    KYD = 'KYD',
    GQE = 'GQE',
    CLP = 'CLP',
    CNY = 'CNY',
    COP = 'COP',
    KMF = 'KMF',
    CDF = 'CDF',
    CRC = 'CRC',
    HRK = 'HRK',
    CUP = 'CUP',
    DKK = 'DKK',
    DJF = 'DJF',
    DOP = 'DOP',
    XCD = 'XCD',
    EGP = 'EGP',
    SVC = 'SVC',
    ERN = 'ERN',
    EEK = 'EEK',
    ETB = 'ETB',
    EUR = 'EUR',
    FKP = 'FKP',
    FJD = 'FJD',
    GMD = 'GMD',
    GEK = 'GEK',
    GEL = 'GEL',
    GHS = 'GHS',
    GIP = 'GIP',
    GTQ = 'GTQ',
    GNF = 'GNF',
    GYD = 'GYD',
    HTG = 'HTG',
    HNL = 'HNL',
    HKD = 'HKD',
    HUF = 'HUF',
    ISK = 'ISK',
    INR = 'INR',
    IDR = 'IDR',
    IRR = 'IRR',
    IQD = 'IQD',
    ILS = 'ILS',
    JMD = 'JMD',
    JPY = 'JPY',
    JOD = 'JOD',
    KZT = 'KZT',
    KES = 'KES',
    KWD = 'KWD',
    KGS = 'KGS',
    LAK = 'LAK',
    LVL = 'LVL',
    LBP = 'LBP',
    LSL = 'LSL',
    LRD = 'LRD',
    LYD = 'LYD',
    LTL = 'LTL',
    MOP = 'MOP',
    MKD = 'MKD',
    MGA = 'MGA',
    MWK = 'MWK',
    MYR = 'MYR',
    MVR = 'MVR',
    LSM = 'LSM',
    MRO = 'MRO',
    MUR = 'MUR',
    MXN = 'MXN',
    MDL = 'MDL',
    MNT = 'MNT',
    MAD = 'MAD',
    MZN = 'MZN',
    MMK = 'MMK',
    NAD = 'NAD',
    NPR = 'NPR',
    ANG = 'ANG',
    YTL = 'YTL',
    NZD = 'NZD',
    NIC = 'NIC',
    NGN = 'NGN',
    KPW = 'KPW',
    NOK = 'NOK',
    OMR = 'OMR',
    PKR = 'PKR',
    PAB = 'PAB',
    PGK = 'PGK',
    PYG = 'PYG',
    PEN = 'PEN',
    PHP = 'PHP',
    PLN = 'PLN',
    QAR = 'QAR',
    RHD = 'RHD',
    RON = 'RON',
    RUB = 'RUB',
    RWF = 'RWF',
    SHP = 'SHP',
    STD = 'STD',
    SAR = 'SAR',
    RSD = 'RSD',
    SCR = 'SCR',
    SLL = 'SLL',
    SGD = 'SGD',
    SKK = 'SKK',
    SBD = 'SBD',
    SOS = 'SOS',
    ZAR = 'ZAR',
    KRW = 'KRW',
    LKR = 'LKR',
    SDG = 'SDG',
    SRD = 'SRD',
    SZL = 'SZL',
    SEK = 'SEK',
    CHF = 'CHF',
    SYP = 'SYP',
    TWD = 'TWD',
    TJS = 'TJS',
    TZS = 'TZS',
    THB = 'THB',
    TOP = 'TOP',
    TTD = 'TTD',
    TND = 'TND',
    TMM = 'TMM',
    USD = 'USD',
    UGX = 'UGX',
    UAH = 'UAH',
    AED = 'AED',
    UYU = 'UYU',
    UZS = 'UZS',
    VUV = 'VUV',
    VEB = 'VEB',
    VEF = 'VEF',
    VND = 'VND',
    CHE = 'CHE',
    CHW = 'CHW',
    XOF = 'XOF',
    WST = 'WST',
    YER = 'YER',
    ZMK = 'ZMK',
    ZWD = 'ZWD',
    TRY = 'TRY',
    AZM = 'AZM',
    ROL = 'ROL',
    TRL = 'TRL',
    XPF = 'XPF',
}

export interface GQLEstimateShippingCostsAddress {
    city?: string;
    country_id?: string;
    customer_id?: number;
    email?: string;
    firstname?: string;
    lastname?: string;
    postcode?: string;
    region?: string;
    region_code?: string;
    region_id?: number;
    same_as_billing?: number;
    street?: Array<string | null>;
    telephone?: string;
}

export interface GQLCustomerAddressInput {
    city?: string;
    company?: string;
    country_code?: GQLCountryCodeEnum;
    country_id?: GQLCountryCodeEnum;
    custom_attributes?: Array<GQLCustomerAddressAttributeInput | null>;
    default_billing?: boolean;
    default_shipping?: boolean;
    fax?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    postcode?: string;
    prefix?: string;
    region?: GQLCustomerAddressRegionInput;
    street?: Array<string | null>;
    suffix?: string;
    telephone?: string;
    vat_id?: string;
}

export enum GQLCountryCodeEnum {

    /**
     * Afghanistan
     */
    AF = 'AF',

    /**
     * Åland Islands
     */
    AX = 'AX',

    /**
     * Albania
     */
    AL = 'AL',

    /**
     * Algeria
     */
    DZ = 'DZ',

    /**
     * American Samoa
     */
    AS = 'AS',

    /**
     * Andorra
     */
    AD = 'AD',

    /**
     * Angola
     */
    AO = 'AO',

    /**
     * Anguilla
     */
    AI = 'AI',

    /**
     * Antarctica
     */
    AQ = 'AQ',

    /**
     * Antigua & Barbuda
     */
    AG = 'AG',

    /**
     * Argentina
     */
    AR = 'AR',

    /**
     * Armenia
     */
    AM = 'AM',

    /**
     * Aruba
     */
    AW = 'AW',

    /**
     * Australia
     */
    AU = 'AU',

    /**
     * Austria
     */
    AT = 'AT',

    /**
     * Azerbaijan
     */
    AZ = 'AZ',

    /**
     * Bahamas
     */
    BS = 'BS',

    /**
     * Bahrain
     */
    BH = 'BH',

    /**
     * Bangladesh
     */
    BD = 'BD',

    /**
     * Barbados
     */
    BB = 'BB',

    /**
     * Belarus
     */
    BY = 'BY',

    /**
     * Belgium
     */
    BE = 'BE',

    /**
     * Belize
     */
    BZ = 'BZ',

    /**
     * Benin
     */
    BJ = 'BJ',

    /**
     * Bermuda
     */
    BM = 'BM',

    /**
     * Bhutan
     */
    BT = 'BT',

    /**
     * Bolivia
     */
    BO = 'BO',

    /**
     * Bosnia & Herzegovina
     */
    BA = 'BA',

    /**
     * Botswana
     */
    BW = 'BW',

    /**
     * Bouvet Island
     */
    BV = 'BV',

    /**
     * Brazil
     */
    BR = 'BR',

    /**
     * British Indian Ocean Territory
     */
    IO = 'IO',

    /**
     * British Virgin Islands
     */
    VG = 'VG',

    /**
     * Brunei
     */
    BN = 'BN',

    /**
     * Bulgaria
     */
    BG = 'BG',

    /**
     * Burkina Faso
     */
    BF = 'BF',

    /**
     * Burundi
     */
    BI = 'BI',

    /**
     * Cambodia
     */
    KH = 'KH',

    /**
     * Cameroon
     */
    CM = 'CM',

    /**
     * Canada
     */
    CA = 'CA',

    /**
     * Cape Verde
     */
    CV = 'CV',

    /**
     * Cayman Islands
     */
    KY = 'KY',

    /**
     * Central African Republic
     */
    CF = 'CF',

    /**
     * Chad
     */
    TD = 'TD',

    /**
     * Chile
     */
    CL = 'CL',

    /**
     * China
     */
    CN = 'CN',

    /**
     * Christmas Island
     */
    CX = 'CX',

    /**
     * Cocos (Keeling) Islands
     */
    CC = 'CC',

    /**
     * Colombia
     */
    CO = 'CO',

    /**
     * Comoros
     */
    KM = 'KM',

    /**
     * Congo-Brazzaville
     */
    CG = 'CG',

    /**
     * Congo-Kinshasa
     */
    CD = 'CD',

    /**
     * Cook Islands
     */
    CK = 'CK',

    /**
     * Costa Rica
     */
    CR = 'CR',

    /**
     * Côte d’Ivoire
     */
    CI = 'CI',

    /**
     * Croatia
     */
    HR = 'HR',

    /**
     * Cuba
     */
    CU = 'CU',

    /**
     * Cyprus
     */
    CY = 'CY',

    /**
     * Czech Republic
     */
    CZ = 'CZ',

    /**
     * Denmark
     */
    DK = 'DK',

    /**
     * Djibouti
     */
    DJ = 'DJ',

    /**
     * Dominica
     */
    DM = 'DM',

    /**
     * Dominican Republic
     */
    DO = 'DO',

    /**
     * Ecuador
     */
    EC = 'EC',

    /**
     * Egypt
     */
    EG = 'EG',

    /**
     * El Salvador
     */
    SV = 'SV',

    /**
     * Equatorial Guinea
     */
    GQ = 'GQ',

    /**
     * Eritrea
     */
    ER = 'ER',

    /**
     * Estonia
     */
    EE = 'EE',

    /**
     * Ethiopia
     */
    ET = 'ET',

    /**
     * Falkland Islands
     */
    FK = 'FK',

    /**
     * Faroe Islands
     */
    FO = 'FO',

    /**
     * Fiji
     */
    FJ = 'FJ',

    /**
     * Finland
     */
    FI = 'FI',

    /**
     * France
     */
    FR = 'FR',

    /**
     * French Guiana
     */
    GF = 'GF',

    /**
     * French Polynesia
     */
    PF = 'PF',

    /**
     * French Southern Territories
     */
    TF = 'TF',

    /**
     * Gabon
     */
    GA = 'GA',

    /**
     * Gambia
     */
    GM = 'GM',

    /**
     * Georgia
     */
    GE = 'GE',

    /**
     * Germany
     */
    DE = 'DE',

    /**
     * Ghana
     */
    GH = 'GH',

    /**
     * Gibraltar
     */
    GI = 'GI',

    /**
     * Greece
     */
    GR = 'GR',

    /**
     * Greenland
     */
    GL = 'GL',

    /**
     * Grenada
     */
    GD = 'GD',

    /**
     * Guadeloupe
     */
    GP = 'GP',

    /**
     * Guam
     */
    GU = 'GU',

    /**
     * Guatemala
     */
    GT = 'GT',

    /**
     * Guernsey
     */
    GG = 'GG',

    /**
     * Guinea
     */
    GN = 'GN',

    /**
     * Guinea-Bissau
     */
    GW = 'GW',

    /**
     * Guyana
     */
    GY = 'GY',

    /**
     * Haiti
     */
    HT = 'HT',

    /**
     * Heard &amp; McDonald Islands
     */
    HM = 'HM',

    /**
     * Honduras
     */
    HN = 'HN',

    /**
     * Hong Kong SAR China
     */
    HK = 'HK',

    /**
     * Hungary
     */
    HU = 'HU',

    /**
     * Iceland
     */
    IS = 'IS',

    /**
     * India
     */
    IN = 'IN',

    /**
     * Indonesia
     */
    ID = 'ID',

    /**
     * Iran
     */
    IR = 'IR',

    /**
     * Iraq
     */
    IQ = 'IQ',

    /**
     * Ireland
     */
    IE = 'IE',

    /**
     * Isle of Man
     */
    IM = 'IM',

    /**
     * Israel
     */
    IL = 'IL',

    /**
     * Italy
     */
    IT = 'IT',

    /**
     * Jamaica
     */
    JM = 'JM',

    /**
     * Japan
     */
    JP = 'JP',

    /**
     * Jersey
     */
    JE = 'JE',

    /**
     * Jordan
     */
    JO = 'JO',

    /**
     * Kazakhstan
     */
    KZ = 'KZ',

    /**
     * Kenya
     */
    KE = 'KE',

    /**
     * Kiribati
     */
    KI = 'KI',

    /**
     * Kuwait
     */
    KW = 'KW',

    /**
     * Kyrgyzstan
     */
    KG = 'KG',

    /**
     * Laos
     */
    LA = 'LA',

    /**
     * Latvia
     */
    LV = 'LV',

    /**
     * Lebanon
     */
    LB = 'LB',

    /**
     * Lesotho
     */
    LS = 'LS',

    /**
     * Liberia
     */
    LR = 'LR',

    /**
     * Libya
     */
    LY = 'LY',

    /**
     * Liechtenstein
     */
    LI = 'LI',

    /**
     * Lithuania
     */
    LT = 'LT',

    /**
     * Luxembourg
     */
    LU = 'LU',

    /**
     * Macau SAR China
     */
    MO = 'MO',

    /**
     * Macedonia
     */
    MK = 'MK',

    /**
     * Madagascar
     */
    MG = 'MG',

    /**
     * Malawi
     */
    MW = 'MW',

    /**
     * Malaysia
     */
    MY = 'MY',

    /**
     * Maldives
     */
    MV = 'MV',

    /**
     * Mali
     */
    ML = 'ML',

    /**
     * Malta
     */
    MT = 'MT',

    /**
     * Marshall Islands
     */
    MH = 'MH',

    /**
     * Martinique
     */
    MQ = 'MQ',

    /**
     * Mauritania
     */
    MR = 'MR',

    /**
     * Mauritius
     */
    MU = 'MU',

    /**
     * Mayotte
     */
    YT = 'YT',

    /**
     * Mexico
     */
    MX = 'MX',

    /**
     * Micronesia
     */
    FM = 'FM',

    /**
     * Moldova
     */
    MD = 'MD',

    /**
     * Monaco
     */
    MC = 'MC',

    /**
     * Mongolia
     */
    MN = 'MN',

    /**
     * Montenegro
     */
    ME = 'ME',

    /**
     * Montserrat
     */
    MS = 'MS',

    /**
     * Morocco
     */
    MA = 'MA',

    /**
     * Mozambique
     */
    MZ = 'MZ',

    /**
     * Myanmar (Burma)
     */
    MM = 'MM',

    /**
     * Namibia
     */
    NA = 'NA',

    /**
     * Nauru
     */
    NR = 'NR',

    /**
     * Nepal
     */
    NP = 'NP',

    /**
     * Netherlands
     */
    NL = 'NL',

    /**
     * Netherlands Antilles
     */
    AN = 'AN',

    /**
     * New Caledonia
     */
    NC = 'NC',

    /**
     * New Zealand
     */
    NZ = 'NZ',

    /**
     * Nicaragua
     */
    NI = 'NI',

    /**
     * Niger
     */
    NE = 'NE',

    /**
     * Nigeria
     */
    NG = 'NG',

    /**
     * Niue
     */
    NU = 'NU',

    /**
     * Norfolk Island
     */
    NF = 'NF',

    /**
     * Northern Mariana Islands
     */
    MP = 'MP',

    /**
     * North Korea
     */
    KP = 'KP',

    /**
     * Norway
     */
    NO = 'NO',

    /**
     * Oman
     */
    OM = 'OM',

    /**
     * Pakistan
     */
    PK = 'PK',

    /**
     * Palau
     */
    PW = 'PW',

    /**
     * Palestinian Territories
     */
    PS = 'PS',

    /**
     * Panama
     */
    PA = 'PA',

    /**
     * Papua New Guinea
     */
    PG = 'PG',

    /**
     * Paraguay
     */
    PY = 'PY',

    /**
     * Peru
     */
    PE = 'PE',

    /**
     * Philippines
     */
    PH = 'PH',

    /**
     * Pitcairn Islands
     */
    PN = 'PN',

    /**
     * Poland
     */
    PL = 'PL',

    /**
     * Portugal
     */
    PT = 'PT',

    /**
     * Qatar
     */
    QA = 'QA',

    /**
     * Réunion
     */
    RE = 'RE',

    /**
     * Romania
     */
    RO = 'RO',

    /**
     * Russia
     */
    RU = 'RU',

    /**
     * Rwanda
     */
    RW = 'RW',

    /**
     * Samoa
     */
    WS = 'WS',

    /**
     * San Marino
     */
    SM = 'SM',

    /**
     * São Tomé & Príncipe
     */
    ST = 'ST',

    /**
     * Saudi Arabia
     */
    SA = 'SA',

    /**
     * Senegal
     */
    SN = 'SN',

    /**
     * Serbia
     */
    RS = 'RS',

    /**
     * Seychelles
     */
    SC = 'SC',

    /**
     * Sierra Leone
     */
    SL = 'SL',

    /**
     * Singapore
     */
    SG = 'SG',

    /**
     * Slovakia
     */
    SK = 'SK',

    /**
     * Slovenia
     */
    SI = 'SI',

    /**
     * Solomon Islands
     */
    SB = 'SB',

    /**
     * Somalia
     */
    SO = 'SO',

    /**
     * South Africa
     */
    ZA = 'ZA',

    /**
     * South Georgia & South Sandwich Islands
     */
    GS = 'GS',

    /**
     * South Korea
     */
    KR = 'KR',

    /**
     * Spain
     */
    ES = 'ES',

    /**
     * Sri Lanka
     */
    LK = 'LK',

    /**
     * St. Barthélemy
     */
    BL = 'BL',

    /**
     * St. Helena
     */
    SH = 'SH',

    /**
     * St. Kitts & Nevis
     */
    KN = 'KN',

    /**
     * St. Lucia
     */
    LC = 'LC',

    /**
     * St. Martin
     */
    MF = 'MF',

    /**
     * St. Pierre & Miquelon
     */
    PM = 'PM',

    /**
     * St. Vincent & Grenadines
     */
    VC = 'VC',

    /**
     * Sudan
     */
    SD = 'SD',

    /**
     * Suriname
     */
    SR = 'SR',

    /**
     * Svalbard & Jan Mayen
     */
    SJ = 'SJ',

    /**
     * Swaziland
     */
    SZ = 'SZ',

    /**
     * Sweden
     */
    SE = 'SE',

    /**
     * Switzerland
     */
    CH = 'CH',

    /**
     * Syria
     */
    SY = 'SY',

    /**
     * Taiwan
     */
    TW = 'TW',

    /**
     * Tajikistan
     */
    TJ = 'TJ',

    /**
     * Tanzania
     */
    TZ = 'TZ',

    /**
     * Thailand
     */
    TH = 'TH',

    /**
     * Timor-Leste
     */
    TL = 'TL',

    /**
     * Togo
     */
    TG = 'TG',

    /**
     * Tokelau
     */
    TK = 'TK',

    /**
     * Tonga
     */
    TO = 'TO',

    /**
     * Trinidad & Tobago
     */
    TT = 'TT',

    /**
     * Tunisia
     */
    TN = 'TN',

    /**
     * Turkey
     */
    TR = 'TR',

    /**
     * Turkmenistan
     */
    TM = 'TM',

    /**
     * Turks & Caicos Islands
     */
    TC = 'TC',

    /**
     * Tuvalu
     */
    TV = 'TV',

    /**
     * Uganda
     */
    UG = 'UG',

    /**
     * Ukraine
     */
    UA = 'UA',

    /**
     * United Arab Emirates
     */
    AE = 'AE',

    /**
     * United Kingdom
     */
    GB = 'GB',

    /**
     * United States
     */
    US = 'US',

    /**
     * Uruguay
     */
    UY = 'UY',

    /**
     * U.S. Outlying Islands
     */
    UM = 'UM',

    /**
     * U.S. Virgin Islands
     */
    VI = 'VI',

    /**
     * Uzbekistan
     */
    UZ = 'UZ',

    /**
     * Vanuatu
     */
    VU = 'VU',

    /**
     * Vatican City
     */
    VA = 'VA',

    /**
     * Venezuela
     */
    VE = 'VE',

    /**
     * Vietnam
     */
    VN = 'VN',

    /**
     * Wallis & Futuna
     */
    WF = 'WF',

    /**
     * Western Sahara
     */
    EH = 'EH',

    /**
     * Yemen
     */
    YE = 'YE',

    /**
     * Zambia
     */
    ZM = 'ZM',

    /**
     * Zimbabwe
     */
    ZW = 'ZW',
}

export interface GQLCustomerAddressAttributeInput {

    /**
     * Attribute code
     */
    attribute_code: string;

    /**
     * Attribute value
     */
    value: string;
}

export interface GQLCustomerAddressRegionInput {

    /**
     * The state or province name
     */
    region?: string;

    /**
     * The address region code
     */
    region_code?: string;

    /**
     * The unique ID for a pre-defined region
     */
    region_id?: number;
}

export interface GQLCustomerUpdateInput {

    /**
     * Indicates whether the customer has enabled remote shopping assistance
     */
    allow_remote_shopping_assistance?: boolean;

    /**
     * The customer's date of birth
     */
    date_of_birth?: string;

    /**
     * Deprecated: Use `date_of_birth` instead
     */
    dob?: string;

    /**
     * The customer's first name
     */
    firstname?: string;

    /**
     * The customer's gender (Male - 1, Female - 2)
     */
    gender?: number;

    /**
     * Indicates whether the customer is subscribed to the company's newsletter
     */
    is_subscribed?: boolean;

    /**
     * The customer's family name
     */
    lastname?: string;

    /**
     * The customer's middle name
     */
    middlename?: string;

    /**
     * An honorific, such as Dr., Mr., or Mrs.
     */
    prefix?: string;

    /**
     * A value such as Sr., Jr., or III
     */
    suffix?: string;

    /**
     * The customer's Tax/VAT number (for corporate customers)
     */
    taxvat?: string;
}

export enum GQLProductStockStatus {
    IN_STOCK = 'IN_STOCK',
    OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export interface GQLWishlistItemInput {

    /**
     * User description of wish list item
     */
    description?: string;

    /**
     * An array of options that the customer entered
     */
    entered_options?: Array<GQLEnteredOptionInput | null>;

    /**
     * Id of the wishlist item
     */
    item_id?: string;

    /**
     * For complex product types, the SKU of the parent product
     */
    parent_sku?: string;

    /**
     * Configurable product options
     */
    product_option?: GQLProductOptionInput;

    /**
     * Quantity of the product
     */
    quantity?: number;

    /**
     * An array of strings corresponding to options the customer selected
     */
    selected_options?: Array<string | null>;

    /**
     * Sku of the product
     */
    sku?: string;
}

export interface GQLEnteredOptionInput {

    /**
     * The unique ID for a `CustomizableFieldOption`, `CustomizableFileOption`,
     * `CustomizableAreaOption`, etc. of `CustomizableOptionInterface` objects
     */
    uid: string;

    /**
     * Text the customer entered
     */
    value: string;
}

export interface GQLProductOptionInput {
    buy_request?: string;
    extension_attributes?: GQLExtensionsAttributeInput;
}

export interface GQLExtensionsAttributeInput {
    bundle_options?: Array<GQLBundleOptionInput | null>;
    configurable_item_options?: Array<GQLConfigurableItemOptionsInput | null>;
    customizable_options?: Array<GQLCustomizableOptionsInput | null>;
    customizable_options_multi?: Array<GQLCustomizableOptionsInput | null>;
    downloadable_product_links?: Array<GQLDownloadableProductLinksInput | null>;
    grouped_product_options?: Array<GQLCustomizableOptionsInput | null>;
}

export interface GQLConfigurableItemOptionsInput {
    option_id?: string;
    option_value?: number;
}

export interface GQLBundleOptionInput {
    id: number;
    quantity: number;
    value: Array<string | null>;
}

export interface GQLCustomizableOptionsInput {
    option_filename?: string;
    option_id: string;
    option_value?: string;
}

export interface GQLDownloadableProductLinksInput {
    link_id?: number;
}

export interface GQLShareWishlistInput {

    /**
   * Receiver emails
   */
    emails: Array<string | null>;

    /**
   * Sharing message
   */
    message?: string;
}

export interface GQLWishlistItemUpdateInput {

    /**
     * Customer-entered comments about the item
     */
    description?: string;

    /**
     * An array of options that the customer entered
     */
    entered_options?: Array<GQLEnteredOptionInput | null>;

    /**
     * The new amount or number of this item
     */
    quantity?: number;

    /**
     * An array of strings corresponding to options the customer selected
     */
    selected_options?: Array<string | null>;

    /**
     * The unique ID for a `WishlistItemInterface` object
     */
    wishlist_item_id: string;
}

export interface GQLCartItemInput {

    /**
     * An array of entered options for the base product, such as personalization text
     */
    entered_options?: Array<GQLEnteredOptionInput | null>;
    id?: GQLCartItemId;
    item_id?: number;

    /**
     * For child products, the SKU of its parent product
     */
    parent_sku?: string;
    product_option?: GQLProductOptionInput;
    product_type?: string;
    quantity: number;
    quote_id?: string;

    /**
     * The selected options for the base product, such as color or size with  unique
     * ID for a `CustomizableRadioOption`, `CustomizableDropDownOption`,
     * `ConfigurableProductOptionsValues`, etc. objects
     */
    selected_options?: Array<string | null>;
    sku?: string;
}

export interface GQLCartItemId {
    item_id?: number;
    sku?: string;
}

export enum GQLCartUserInputErrorType {
    PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND',
    NOT_SALABLE = 'NOT_SALABLE',
    INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK',
    UNDEFINED = 'UNDEFINED',
}

export interface GQLUpdateCartItemsInput {
    cart_id: string;
    cart_items: Array<GQLCartItemUpdateInput | null>;
}

export interface GQLCartItemUpdateInput {

    /**
     * Deprecated. Use `cart_item_uid` instead.
     */
    cart_item_id?: number;

    /**
     * The unique ID for a `CartItemInterface` object
     */
    cart_item_uid?: string;
    customizable_options?: Array<GQLCustomizableOptionInput | null>;

    /**
     * Gift message details for the cart item
     */
    gift_message?: GQLGiftMessageInput;
    quantity?: number;
}

export interface GQLCustomizableOptionInput {

    /**
     * The customizable option id of the product
     */
    id?: number;

    /**
     * The string value of the option
     */
    value_string: string;
}

export interface GQLGiftMessageInput {

    /**
     * Sender name
     */
    from: string;

    /**
     * Gift message text
     */
    message: string;

    /**
     * Recipient name
     */
    to: string;
}

export interface GQLSSetBillingAddressOnCartInput {
    billing_address: GQLBillingAddressInput;
    cart_id?: string;
    same_as_shipping?: boolean;
}

export interface GQLBillingAddressInput {
    address?: GQLCartAddressInput;
    customer_address_id?: number;

    /**
     * Set billing address same as shipping
     */
    same_as_shipping?: boolean;

    /**
     * Deprecated: use `same_as_shipping` field instead
     */
    use_for_shipping?: boolean;
}

export interface GQLCartAddressInput {
    city: string;
    company?: string;
    country_code: string;
    firstname: string;
    lastname: string;
    postcode?: string;
    region?: string;
    region_id?: number;

    /**
     * Determines whether to save the address in the customer's address book. The default value is true
     */
    save_in_address_book?: boolean;
    street: Array<string | null>;
    telephone: string;
    vat_id?: string;
}

export interface GQLSSetPaymentMethodOnCartInput {
    cart_id?: string;
    payment_method: GQLPaymentMethodInput;
}

export interface GQLPaymentMethodInput {
    additional_data?: GQLPaymentMethodAdditionalData;
    braintree?: GQLBraintreeInput;
    braintree_cc_vault?: GQLBraintreeCcVaultInput;

    /**
     * Payment method code
     */
    code: string;

    /**
     * Required input for PayPal Hosted pro payments
     */
    hosted_pro?: GQLHostedProInput;
    klarna?: GQLKlarnaInput;
    klarna_kp?: GQLKlarnaInput;
    method?: string;

    /**
     * Required input for Payflow Express Checkout payments
     */
    payflow_express?: GQLPayflowExpressInput;

    /**
     * Required input for PayPal Payflow Link and Payments Advanced payments
     */
    payflow_link?: GQLPayflowLinkInput;

    /**
     * Required input type for PayPal Payflow Pro and Payment Pro payments
     */
    payflowpro?: GQLPayflowProInput;

    /**
     * Required input type for PayPal Payflow Pro vault payments
     */
    payflowpro_cc_vault?: GQLVaultTokenInput;

    /**
     * Required input for Express Checkout and Payments Standard payments
     */
    paypal_express?: GQLPaypalExpressInput;

    /**
     * Purchase order number
     */
    purchase_order_number?: string;
}

export interface GQLPaymentMethodAdditionalData {
    cc_save?: boolean;
    cc_stripejs_token?: string;
    payment_method_nonce?: string;
}

export interface GQLBraintreeInput {

    /**
     * Contains a fingerprint provided by Braintree JS SDK and should be sent with
     * sale transaction details to the Braintree payment gateway. Should be specified
     * only in a case if Kount (advanced fraud protection) is enabled for Braintree
     * payment integration.
     */
    device_data?: string;

    /**
     * States whether an entered by a customer credit/debit card should be tokenized
     * for later usage. Required only if Vault is enabled for Braintree payment integration.
     */
    is_active_payment_token_enabler: boolean;

    /**
     * The one-time payment token generated by Braintree payment gateway based on
     * card details. Required field to make sale transaction.
     */
    payment_method_nonce: string;
}

export interface GQLBraintreeCcVaultInput {
    device_data?: string;
    public_hash: string;
}

export interface GQLHostedProInput {

    /**
     * The relative URL of the page that PayPal will redirect to when the buyer
     * cancels the transaction in order to choose a different payment method. If the
     * full URL to this page is https://www.example.com/paypal/action/cancel.html,
     * the relative URL is paypal/action/cancel.html.
     */
    cancel_url: string;

    /**
     * The relative URL of the final confirmation page that PayPal will redirect to
     * upon payment success. If the full URL to this page is
     * https://www.example.com/paypal/action/return.html, the relative URL is
     * paypal/action/return.html.
     */
    return_url: string;
}

export interface GQLKlarnaInput {

    /**
     * The authorization token must be provided to set any Klarna Payments method
     */
    authorization_token: string;
}

export interface GQLPayflowExpressInput {

    /**
     * The unique ID of the PayPal user
     */
    payer_id: string;

    /**
     * The token returned by the createPaypalExpressToken mutation
     */
    token: string;
}

/**
   * A set of relative URLs that PayPal will use in response to various actions
   * during the authorization process. Magento prepends the base URL to this value to
   * create a full URL. For example, if the full URL is
   * https://www.example.com/path/to/page.html, the relative URL is
   * path/to/page.html. Use this input for Payflow Link and Payments Advanced payment methods.
   */
export interface GQLPayflowLinkInput {

    /**
     * The relative URL of the page that PayPal will redirect to when the buyer
     * cancels the transaction in order to choose a different payment method. If the
     * full URL to this page is https://www.example.com/paypal/action/cancel.html,
     * the relative URL is paypal/action/cancel.html.
     */
    cancel_url: string;

    /**
     * The relative URL of the transaction error page that PayPal will redirect to
     * upon payment error. If the full URL to this page is
     * https://www.example.com/paypal/action/error.html, the relative URL is
     * paypal/action/error.html.
     */
    error_url: string;

    /**
     * The relative URL of the order confirmation page that PayPal will redirect to
     * when the payment is successful and additional confirmation is not needed. If
     * the full URL to this page is
     * https://www.example.com/paypal/action/return.html, the relative URL is
     * paypal/action/return.html.
     */
    return_url: string;
}

/**
   * Required input for Payflow Pro and Payments Pro payment methods.
   */
export interface GQLPayflowProInput {

    /**
     * Required input for credit card related information
     */
    cc_details: GQLCreditCardDetailsInput;

    /**
     * States whether details about the customer's credit/debit card should be
     * tokenized for later usage. Required only if Vault is enabled for PayPal
     * Payflow Pro payment integration.
     */
    is_active_payment_token_enabler?: boolean;
}

/**
   * Required fields for Payflow Pro and Payments Pro credit card payments
   */
export interface GQLCreditCardDetailsInput {

    /**
     * Credit card expiration month
     */
    cc_exp_month: number;

    /**
     * Credit card expiration year
     */
    cc_exp_year: number;

    /**
     * Last 4 digits of the credit card
     */
    cc_last_4: number;

    /**
     * Credit card type
     */
    cc_type: string;
}

/**
   * Required input for payment methods with Vault support.
   */
export interface GQLVaultTokenInput {

    /**
     * The public hash of the payment token
     */
    public_hash: string;
}

export interface GQLPaypalExpressInput {

    /**
     * The unique ID of the PayPal user
     */
    payer_id: string;

    /**
     * The token returned by the createPaypalExpressToken mutation
     */
    token: string;
}

export interface GQLSaveAddressInformation {
    billing_address: GQLAddressInput;
    shipping_address: GQLAddressInput;
    shipping_carrier_code?: string;
    shipping_method_code?: string;
}

export interface GQLAddressInput {
    city?: string;
    company?: string;
    country_id?: string;
    email?: string;
    extension_attributes?: Array<GQLAddressExtensionAttributes | null>;
    firstname?: string;
    lastname?: string;
    method?: string;
    postcode?: string;
    region?: string;
    region_code?: string;
    region_id?: number;
    street?: Array<string | null>;
    telephone?: string;
    vat_id?: string;
}

export interface GQLAddressExtensionAttributes {
    attribute_code?: string;
    value?: string;
}

export enum GQLCheckoutAgreementMode {
    AUTO = 'AUTO',
    MANUAL = 'MANUAL',
}

export interface GQLContactForm {
    email?: string;
    message?: string;
    name?: string;
    telephone?: string;
}

export interface GQLKlarnaTokenInput {

    /**
   * The unique ID that identifies the guest customer's cart
   */
    guest_cart_id?: string;
}

export interface GQLCustomerInput {

    /**
     * The customer's date of birth
     */
    date_of_birth?: string;

    /**
     * Deprecated: Use `date_of_birth` instead
     */
    dob?: string;

    /**
     * The customer's email address. Required for customer creation
     */
    email?: string;

    /**
     * The customer's first name
     */
    firstname?: string;

    /**
     * The customer's gender (Male - 1, Female - 2)
     */
    gender?: number;

    /**
     * Indicates whether the customer is subscribed to the company's newsletter
     */
    is_subscribed?: boolean;

    /**
     * The customer's family name
     */
    lastname?: string;

    /**
     * The customer's middle name
     */
    middlename?: string;

    /**
     * The customer's password
     */
    password?: string;

    /**
     * An honorific, such as Dr., Mr., or Mrs.
     */
    prefix?: string;

    /**
     * A value such as Sr., Jr., or III
     */
    suffix?: string;

    /**
     * The customer's Tax/VAT number (for corporate customers)
     */
    taxvat?: string;
}

export enum GQLSubscriptionStatusesEnum {
    NOT_ACTIVE = 'NOT_ACTIVE',
    SUBSCRIBED = 'SUBSCRIBED',
    UNSUBSCRIBED = 'UNSUBSCRIBED',
    UNCONFIRMED = 'UNCONFIRMED',
}

export enum GQLShipBundleItemsEnum {
    TOGETHER = 'TOGETHER',
    SEPARATELY = 'SEPARATELY',
}

export interface GQLCreateProductReviewInput {

    /**
     * The customer's nickname. Defaults to the customer name, if logged in
     */
    nickname: string;

    /**
     * Ratings details by category. e.g price: 5, quality: 4 etc
     */
    ratings: Array<GQLProductReviewRatingInput | null>;

    /**
     * The SKU of the reviewed product
     */
    sku: string;

    /**
     * The summary (title) of the review
     */
    summary: string;

    /**
     * The review text.
     */
    text: string;
}

export interface GQLProductReviewRatingInput {

    /**
     * An encoded rating ID.
     */
    id: string;

    /**
     * An encoded rating value id.
     */
    value_id: string;
}

export interface GQLProductInfoInput {

    /**
     * Product SKU.
     */
    sku: string;
}

export enum GQLUrlRewriteEntityTypeEnum {
    CMS_PAGE = 'CMS_PAGE',
    PRODUCT = 'PRODUCT',
    CATEGORY = 'CATEGORY',
}

export interface GQLCartDisplayConfig {
    display_full_tax_summary?: boolean;
    display_tax_in_price?: string;
    display_tax_in_shipping_amount?: string;
    display_tax_in_subtotal?: string;
    display_zero_tax_subtotal?: boolean;
    include_tax_in_order_total?: boolean;
}

export interface GQLConfigurableProduct extends
    GQLProductInterface,
    GQLRoutableInterface,
    GQLPhysicalProductInterface,
    GQLCustomizableProductInterface {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    New_attribute_size?: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    New_multiple_attribute?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Test_Ainars?: number;
    attribute_allows_html?: string;

    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: number;
    brand?: string;

    /**
     * Relative canonical URL. This value is returned only if the system setting 'Use
     * Canonical Link Meta Tag For Products' is enabled
     */
    canonical_url?: string;

    /**
     * The categories assigned to a product.
     */
    categories?: Array<GQLCategoryInterface | null>;
    clothing_colour?: number;
    clothing_gender?: number;
    clothing_size?: number;
    clothing_type?: number;
    color?: number;
    color_elena?: number;
    colors_with_images?: number;

    /**
     * An array of linked simple product items
     */
    configurable_options?: Array<GQLConfigurableProductOptions | null>;

    /**
     * Specified configurable product options selection
     */
    configurable_product_options_selection?: GQLConfigurableProductOptionsSelection;

    /**
     * The product's country of origin.
     */
    country_of_manufacture?: string;

    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: string;

    /**
     * Crosssell Products
     */
    crosssell_products?: Array<GQLProductInterface | null>;

    /**
     * Detailed information about the product. The value can include simple HTML tags.
     */
    description?: GQLComplexTextValue;
    fit?: number;

    /**
     * Indicates whether a gift message is available.
     */
    gift_message_available?: string;

    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: number;

    /**
     * The relative path to the main image on the product page.
     */
    image?: GQLOptimizedProductImage;
    images_type_map?: number;
    license_key?: string;

    /**
     * A number representing the product's manufacturer.
     */
    manufacturer?: number;
    material?: string;

    /**
     * An array of Media Gallery objects.
     */
    media_gallery?: Array<GQLMediaGalleryInterface | null>;

    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use product's `media_gallery` instead
     */
    media_gallery_entries?: Array<GQLMediaGalleryEntry | null>;
    memory?: number;

    /**
     * A brief overview of the product for search results listings, maximum 255 characters.
     */
    meta_description?: string;

    /**
     * A comma-separated list of keywords that are visible only to search engines.
     */
    meta_keyword?: string;

    /**
     * A string that is displayed in the title bar and tab of the browser and in search results lists.
     */
    meta_title?: string;
    multiple_attribute?: string;

    /**
     * The product name. Customers use this name to identify the product.
     */
    name?: string;

    /**
     * The beginning date for new product listings, and determines if the product is featured as a new product.
     * @deprecated The field should not be used on the storefront.
     */
    new_from_date?: string;

    /**
     * The end date for new product listings.
     * @deprecated The field should not be used on the storefront.
     */
    new_to_date?: string;

    /**
     * Product stock only x left count
     */
    only_x_left_in_stock?: number;

    /**
     * An array of options for a customizable product.
     */
    options?: Array<GQLCustomizableOptionInterface | null>;

    /**
     * If the product has multiple options, determines where they appear on the product page.
     */
    options_container?: string;
    original_price?: number;

    /**
     * A ProductPrices object, indicating the price of an item.
     * @deprecated Use price_range for product price information.
     */
    price?: GQLProductPrices;

    /**
     * A PriceRange object, indicating the range of prices for the product
     */
    price_range: GQLPriceRange;

    /**
     * An array of TierPrice objects.
     */
    price_tiers?: Array<GQLTierPrice | null>;

    /**
     * An array of ProductLinks objects.
     */
    product_links?: Array<GQLProductLinksInterface | null>;

    /**
     * Qty field for checkout order view
     */
    qty?: number;
    quantity?: number;
    ranking?: number;

    /**
     * The average of all the ratings given to the product.
     */
    rating_summary: number;

    /**
     * Contains 0 when there is no redirect error. A value of 301 indicates the URL
     * of the requested resource has been changed permanently, while a value of 302
     * indicates a temporary redirect
     */
    redirect_code: number;

    /**
     * Related Products
     */
    related_products?: Array<GQLProductInterface | null>;

    /**
     * The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original
     */
    relative_url?: string;

    /**
     * The total count of all the reviews given to the product.
     */
    review_count: number;

    /**
     * The list of products reviews.
     */
    reviews: GQLProductReviews;
    row_total?: number;
    s_attributes?: Array<GQLAttributeWithValue | null>;
    salable_qty?: number;
    shoes_size?: number;

    /**
     * A short description of the product. Its use depends on the theme.
     */
    short_description?: GQLComplexTextValue;
    size?: number;

    /**
     * A number or code assigned to a product to identify the product, options, price, and manufacturer.
     */
    sku?: string;

    /**
     * The relative path to the small image, which is used on catalog pages.
     */
    small_image?: GQLOptimizedProductImage;

    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: string;

    /**
     * The discounted price of the product.
     */
    special_price?: number;

    /**
     * The end date that a product has a special price.
     */
    special_to_date?: string;
    stock_item?: GQLProductStockItem;

    /**
     * Stock status of the product
     */
    stock_status?: GQLProductStockStatus;

    /**
     * The file name of a swatch image
     */
    swatch_image?: string;
    test?: number;
    texture?: number;

    /**
     * The relative path to the product's thumbnail image.
     */
    thumbnail?: GQLOptimizedProductImage;

    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use price_tiers for product tier price information.
     */
    tier_price?: number;

    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use price_tiers for product tier price information.
     */
    tier_prices?: Array<GQLProductTierPrices | null>;

    /**
     * One of PRODUCT, CATEGORY, or CMS_PAGE.
     */
    type?: GQLUrlRewriteEntityTypeEnum;

    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use __typename instead.
     */
    type_id?: string;

    /**
     * The unique ID for a `ProductInterface` object.
     */
    uid: string;

    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: string;

    /**
     * Upsell Products
     */
    upsell_products?: Array<GQLProductInterface | null>;
    url?: string;

    /**
     * The part of the URL that identifies the product
     */
    url_key?: string;

    /**
     *
     * @deprecated Use product's `canonical_url` or url rewrites instead
     */
    url_path?: string;

    /**
     * URL rewrites list
     */
    url_rewrites?: Array<GQLUrlRewrite | null>;

    /**
     * The part of the product URL that is appended after the url key
     */
    url_suffix?: string;
    valuesss?: number;

    /**
     * An array of variants of products
     */
    variants?: Array<GQLConfigurableVariant | null>;

    /**
     * An array of variants of products, optimized version for PLP
     */
    variants_plp?: Array<GQLConfigurableVariant | null>;

    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Array<GQLWebsite | null>;

    /**
     * The weight of the item, in units defined by the store.
     */
    weight?: number;
    yes_no?: number;
}

export interface GQLProductInterface {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    New_attribute_size?: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    New_multiple_attribute?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Test_Ainars?: number;
    attribute_allows_html?: string;

    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: number;
    brand?: string;

    /**
     * Relative canonical URL. This value is returned only if the system setting 'Use
     * Canonical Link Meta Tag For Products' is enabled
     */
    canonical_url?: string;

    /**
     * The categories assigned to a product.
     */
    categories?: Array<GQLCategoryInterface | null>;
    clothing_colour?: number;
    clothing_gender?: number;
    clothing_size?: number;
    clothing_type?: number;
    color?: number;
    color_elena?: number;
    colors_with_images?: number;

    /**
     * The product's country of origin.
     */
    country_of_manufacture?: string;

    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: string;

    /**
     * Crosssell Products
     */
    crosssell_products?: Array<GQLProductInterface | null>;

    /**
     * Detailed information about the product. The value can include simple HTML tags.
     */
    description?: GQLComplexTextValue;
    fit?: number;

    /**
     * Indicates whether a gift message is available.
     */
    gift_message_available?: string;

    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: number;

    /**
     * The relative path to the main image on the product page.
     */
    image?: GQLOptimizedProductImage;
    images_type_map?: number;
    license_key?: string;

    /**
     * A number representing the product's manufacturer.
     */
    manufacturer?: number;
    material?: string;

    /**
     * An array of Media Gallery objects.
     */
    media_gallery?: Array<GQLMediaGalleryInterface | null>;

    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use product's `media_gallery` instead
     */
    media_gallery_entries?: Array<GQLMediaGalleryEntry | null>;
    memory?: number;

    /**
     * A brief overview of the product for search results listings, maximum 255 characters.
     */
    meta_description?: string;

    /**
     * A comma-separated list of keywords that are visible only to search engines.
     */
    meta_keyword?: string;

    /**
     * A string that is displayed in the title bar and tab of the browser and in search results lists.
     */
    meta_title?: string;
    multiple_attribute?: string;

    /**
     * The product name. Customers use this name to identify the product.
     */
    name?: string;

    /**
     * The beginning date for new product listings, and determines if the product is featured as a new product.
     * @deprecated The field should not be used on the storefront.
     */
    new_from_date?: string;

    /**
     * The end date for new product listings.
     * @deprecated The field should not be used on the storefront.
     */
    new_to_date?: string;

    /**
     * Product stock only x left count
     */
    only_x_left_in_stock?: number;

    /**
     * If the product has multiple options, determines where they appear on the product page.
     */
    options_container?: string;
    original_price?: number;

    /**
     * A ProductPrices object, indicating the price of an item.
     * @deprecated Use price_range for product price information.
     */
    price?: GQLProductPrices;

    /**
     * A PriceRange object, indicating the range of prices for the product
     */
    price_range: GQLPriceRange;

    /**
     * An array of TierPrice objects.
     */
    price_tiers?: Array<GQLTierPrice | null>;

    /**
     * An array of ProductLinks objects.
     */
    product_links?: Array<GQLProductLinksInterface | null>;

    /**
     * Qty field for checkout order view
     */
    qty?: number;
    quantity?: number;
    ranking?: number;

    /**
     * The average of all the ratings given to the product.
     */
    rating_summary: number;

    /**
     * Related Products
     */
    related_products?: Array<GQLProductInterface | null>;

    /**
     * The total count of all the reviews given to the product.
     */
    review_count: number;

    /**
     * The list of products reviews.
     */
    reviews: GQLProductReviews;
    row_total?: number;
    s_attributes?: Array<GQLAttributeWithValue | null>;
    salable_qty?: number;
    shoes_size?: number;

    /**
     * A short description of the product. Its use depends on the theme.
     */
    short_description?: GQLComplexTextValue;
    size?: number;

    /**
     * A number or code assigned to a product to identify the product, options, price, and manufacturer.
     */
    sku?: string;

    /**
     * The relative path to the small image, which is used on catalog pages.
     */
    small_image?: GQLOptimizedProductImage;

    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: string;

    /**
     * The discounted price of the product.
     */
    special_price?: number;

    /**
     * The end date that a product has a special price.
     */
    special_to_date?: string;
    stock_item?: GQLProductStockItem;

    /**
     * Stock status of the product
     */
    stock_status?: GQLProductStockStatus;

    /**
     * The file name of a swatch image
     */
    swatch_image?: string;
    test?: number;
    texture?: number;

    /**
     * The relative path to the product's thumbnail image.
     */
    thumbnail?: GQLOptimizedProductImage;

    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use price_tiers for product tier price information.
     */
    tier_price?: number;

    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use price_tiers for product tier price information.
     */
    tier_prices?: Array<GQLProductTierPrices | null>;

    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use __typename instead.
     */
    type_id?: string;

    /**
     * The unique ID for a `ProductInterface` object.
     */
    uid: string;

    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: string;

    /**
     * Upsell Products
     */
    upsell_products?: Array<GQLProductInterface | null>;
    url?: string;

    /**
     * The part of the URL that identifies the product
     */
    url_key?: string;

    /**
     *
     * @deprecated Use product's `canonical_url` or url rewrites instead
     */
    url_path?: string;

    /**
     * URL rewrites list
     */
    url_rewrites?: Array<GQLUrlRewrite | null>;

    /**
     * The part of the product URL that is appended after the url key
     */
    url_suffix?: string;
    valuesss?: number;

    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Array<GQLWebsite | null>;
    yes_no?: number;
}

export interface GQLRoutableInterface {

    /**
     * Contains 0 when there is no redirect error. A value of 301 indicates the URL
     * of the requested resource has been changed permanently, while a value of 302
     * indicates a temporary redirect
     */
    redirect_code: number;

    /**
     * The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original
     */
    relative_url?: string;

    /**
     * One of PRODUCT, CATEGORY, or CMS_PAGE.
     */
    type?: GQLUrlRewriteEntityTypeEnum;
}

export interface GQLPhysicalProductInterface {

    /**
     * The weight of the item, in units defined by the store.
     */
    weight?: number;
}

export interface GQLCustomizableProductInterface {

    /**
     * An array of options for a customizable product.
     */
    options?: Array<GQLCustomizableOptionInterface | null>;
}

export interface GQLCategoryInterface {
    available_sort_by?: Array<string | null>;

    /**
     * Breadcrumbs, parent categories info.
     */
    breadcrumbs?: Array<GQLBreadcrumb | null>;

    /**
     * Relative canonical URL. This value is returned only if the system setting 'Use
     * Canonical Link Meta Tag For Categories' is enabled
     */
    canonical_url?: string;
    children_count?: string;

    /**
     * Category CMS Block.
     */
    cms_block?: GQLCmsBlock;

    /**
     * Timestamp indicating when the category was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: string;
    custom_layout_update_file?: string;

    /**
     * The attribute to use for sorting.
     */
    default_sort_by?: string;

    /**
     * An optional description of the category.
     */
    description?: string;

    /**
     * Category display mode (products only, static block only, both)
     */
    display_mode?: string;
    filter_price_range?: number;

    /**
     * An ID that uniquely identifies the category.
     * @deprecated Use the `uid` argument instead.
     */
    id?: number;
    image?: string;
    include_in_menu?: number;
    is_anchor?: number;
    landing_page?: number;

    /**
     * Indicates the depth of the category within the tree.
     */
    level?: number;
    meta_description?: string;
    meta_keywords?: string;
    meta_title?: string;

    /**
     * The display name of the category.
     */
    name?: string;

    /**
     * Category Path.
     */
    path?: string;

    /**
     * Category path in store.
     */
    path_in_store?: string;

    /**
     * The position of the category relative to other categories at the same level in tree.
     */
    position?: number;

    /**
     * The number of products in the category that are marked as visible. By default,
     * in complex products, parent products are visible, but their child products are not.
     */
    product_count?: number;

    /**
     * The list of products assigned to the category.
     */
    products?: GQLCategoryProducts;

    /**
     * The unique ID for a `CategoryInterface` object.
     */
    uid: string;

    /**
     * Timestamp indicating when the category was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: string;
    url?: string;

    /**
     * The url key assigned to the category.
     */
    url_key?: string;

    /**
     * The url path assigned to the category.
     */
    url_path?: string;

    /**
     * The part of the category URL that is appended after the url key
     */
    url_suffix?: string;
}

export interface GQLConfigurableProductOptions {

    /**
     * A string that identifies the attribute
     */
    attribute_code?: string;

    /**
     * The ID assigned to the attribute
     * @deprecated Use attribute_uid instead
     */
    attribute_id?: string;

    /**
     * The ID assigned to the attribute
     * @deprecated Use attribute_uid instead
     */
    attribute_id_v2?: number;

    /**
     * The unique ID for a `Attribute` object
     */
    attribute_uid: string;

    /**
     * The configurable option ID number assigned by the system
     * @deprecated Use uid instead
     */
    id?: number;

    /**
     * A string that describes the configurable product option, which is displayed on the UI
     */
    label?: string;

    /**
     * A number that indicates the order in which the attribute is displayed
     */
    position?: number;

    /**
     * This is the same as a product's id field
     * @deprecated `product_id` is not needed and can be obtained from it's parent
     */
    product_id?: number;

    /**
     * The unique ID for a `ConfigurableProductOptions` object
     */
    uid: string;

    /**
     * Indicates whether the option is the default
     */
    use_default?: boolean;

    /**
     * An array that defines the value_index codes assigned to the configurable product
     */
    values?: Array<GQLConfigurableProductOptionsValues | null>;
}

export interface GQLConfigurableProductOptionsSelection {

    /**
     * Configurable options available for further selection based on current selection.
     */
    configurable_options?: Array<GQLConfigurableProductOption | null>;

    /**
     * Product images and videos corresponding to the specified configurable options selection.
     */
    media_gallery?: Array<GQLMediaGalleryInterface | null>;

    /**
     * Configurable options available for further selection based on current selection.
     */
    options_available_for_selection?: Array<GQLConfigurableOptionAvailableForSelection | null>;

    /**
     * Variant represented by the specified configurable options selection. It is
     * expected to be null, until selections are made for each configurable option.
     */
    variant?: GQLSimpleProduct;
}

export interface GQLComplexTextValue {

    /**
     * HTML format
     */
    html: string;
}

export interface GQLOptimizedProductImage {
    label?: string;
    path?: string;
    url?: string;
}

export interface GQLMediaGalleryInterface {

    /**
     * Whether the image is hidden from view.
     */
    disabled?: boolean;

    /**
     * The label of the product image or video.
     */
    label?: string;

    /**
     * The media item's position after it has been sorted.
     */
    position?: number;

    /**
     * The URL of the product image or video.
     */
    url?: string;
}

export interface GQLMediaGalleryEntry {

    /**
     * The path of the base image on the server
     */
    base?: GQLMediaGalleryImageOfType;

    /**
     * Contains a ProductMediaGalleryEntriesContent object.
     */
    content?: GQLProductMediaGalleryEntriesContent;

    /**
     * Whether the image is hidden from view.
     */
    disabled?: boolean;

    /**
     * The path of the image on the server.
     */
    file?: string;

    /**
     * The identifier assigned to the object.
     * @deprecated Use `uid` instead.
     */
    id?: number;

    /**
     * The alt text displayed on the UI when the user points to the image.
     */
    label?: string;

    /**
     * The path of the large image on the server
     */
    large?: GQLMediaGalleryImageOfType;

    /**
     * image or video.
     */
    media_type?: string;

    /**
     * The media item's position after it has been sorted.
     */
    position?: number;

    /**
     * The path of the thumbnail image on the server
     */
    thumbnail?: GQLMediaGalleryImageOfType;

    /**
     * Array of image types. It can have the following values: image, small_image, thumbnail.
     */
    types?: Array<string | null>;

    /**
     * The unique ID for a `MediaGalleryEntry` object.
     */
    uid: string;

    /**
     * Contains a ProductMediaGalleryEntriesVideoContent object.
     */
    video_content?: GQLProductMediaGalleryEntriesVideoContent;
}

export interface GQLCustomizableOptionInterface {

    /**
     * Option ID.
     * @deprecated Use `uid` instead
     */
    option_id?: number;

    /**
     * Indicates whether the option is required.
     */
    required?: boolean;

    /**
     * The order in which the option is displayed.
     */
    sort_order?: number;

    /**
     * The display name for this option.
     */
    title?: string;
    type?: string;

    /**
     * The unique ID for a `CustomizableOptionInterface` object.
     */
    uid: string;
}

export interface GQLProductPrices {

    /**
     * The highest possible final price for all the options defined within a
     * composite product. If you are specifying a price range, this would be the to value.
     * @deprecated Use PriceRange.maximum_price.
     */
    maximalPrice?: GQLPrice;

    /**
     * The lowest possible final price for all the options defined within a composite
     * product. If you are specifying a price range, this would be the from value.
     * @deprecated Use PriceRange.minimum_price.
     */
    minimalPrice?: GQLPrice;

    /**
     * The base price of a product.
     * @deprecated Use regular_price from PriceRange.minimum_price or PriceRange.maximum_price.
     */
    regularPrice?: GQLPrice;
}

export interface GQLPriceRange {

    /**
     * The highest possible price for the product.
     */
    maximum_price?: GQLProductPrice;

    /**
     * The lowest possible price for the product.
     */
    minimum_price: GQLProductPrice;
}

export interface GQLTierPrice {

    /**
     * The price discount that this tier represents.
     */
    discount?: GQLProductDiscount;
    final_price?: GQLMoney;

    /**
     * The minimum number of items that must be purchased to qualify for this price tier.
     */
    quantity?: number;
}

export interface GQLProductLinksInterface {

    /**
     * One of related, associated, upsell, or crosssell.
     */
    link_type?: string;

    /**
     * The SKU of the linked product.
     */
    linked_product_sku?: string;

    /**
     * The type of linked product (simple, virtual, bundle, downloadable, grouped, configurable).
     */
    linked_product_type?: string;

    /**
     * The position within the list of product links.
     */
    position?: number;

    /**
     * The identifier of the linked product.
     */
    sku?: string;
}

export interface GQLProductReviews {

    /**
     * An array of product reviews.
     */
    items: Array<GQLProductReview | null>;

    /**
     * Metadata for pagination rendering.
     */
    page_info: GQLSearchResultPageInfo;
}

export interface GQLAttributeWithValue {
    attribute_code?: string;
    attribute_group_code?: string;
    attribute_group_id?: string;
    attribute_group_name?: string;
    attribute_id?: number;
    attribute_label?: string;
    attribute_options?: Array<GQLAttributeWithValueOption | null>;
    attribute_type?: string;
    attribute_value?: string;
    entity_type?: string;
    used_in_product_listing?: boolean;
}

export interface GQLProductStockItem {

    /**
     * Product in stock status
     */
    in_stock?: boolean;

    /**
     * Maximal amount of item that can be bought
     */
    max_sale_qty?: number;

    /**
     * Minimal amount of item that can be bought
     */
    min_sale_qty?: number;

    /**
     * Product quantity available in stock
     */
    qty?: number;

    /**
     * Increment for number of items that can be bought
     */
    qty_increments?: number;
}

export interface GQLProductTierPrices {

    /**
     * The ID of the customer group.
     * @deprecated customer_group_id is not relevant for storefront.
     */
    customer_group_id?: string;

    /**
     * The percentage discount of the item.
     * @deprecated ProductTierPrices is deprecated. Use TierPrice.discount.
     */
    percentage_value?: number;

    /**
     * The number of items that must be purchased to qualify for tier pricing.
     * @deprecated ProductTierPrices is deprecated, use TierPrice.quantity.
     */
    qty?: number;

    /**
     * The price of the fixed price item.
     * @deprecated ProductTierPrices is deprecated. Use TierPrice.final_price
     */
    value?: number;

    /**
     * The ID assigned to the website.
     * @deprecated website_id is not relevant for storefront.
     */
    website_id?: number;
}

export interface GQLUrlRewrite {

    /**
     * Request parameters
     */
    parameters?: Array<GQLHttpQueryParameter | null>;

    /**
     * Request URL
     */
    url?: string;
}

export interface GQLConfigurableVariant {
    attributes?: Array<GQLConfigurableAttributeOption | null>;
    product?: GQLSimpleProduct;
}

export interface GQLWebsite {

    /**
     * A code assigned to the website to identify it
     * @deprecated The field should not be used on the storefront.
     */
    code?: string;

    /**
     * The default group ID that the website has
     * @deprecated The field should not be used on the storefront.
     */
    default_group_id?: string;

    /**
     * The ID number assigned to the website
     * @deprecated The field should not be used on the storefront.
     */
    id?: number;

    /**
     * Specifies if this is the default website
     * @deprecated The field should not be used on the storefront.
     */
    is_default?: boolean;

    /**
     * The website name. Websites use this name to identify it easier.
     * @deprecated The field should not be used on the storefront.
     */
    name?: string;

    /**
     * The attribute to use for sorting websites
     * @deprecated The field should not be used on the storefront.
     */
    sort_order?: number;
}

export interface GQLBreadcrumb {

    /**
     * Category ID.
     * @deprecated Use the `category_uid` argument instead.
     */
    category_id?: number;

    /**
     * Is category active
     */
    category_is_active?: boolean;

    /**
     * Category level.
     */
    category_level?: number;

    /**
     * Category name.
     */
    category_name?: string;

    /**
     * The unique ID for a `Breadcrumb` object.
     */
    category_uid: string;

    /**
     * Trimmed URL rewrite
     */
    category_url?: string;

    /**
     * Category URL key.
     */
    category_url_key?: string;

    /**
     * Category URL path.
     */
    category_url_path?: string;
}

export interface GQLCmsBlock {

    /**
     * CMS block content
     */
    content?: string;

    /**
     * CMS block is disabled
     */
    disabled?: boolean;

    /**
     * CMS block identifier
     */
    identifier?: string;

    /**
     * CMS block title
     */
    title?: string;
}

export interface GQLCategoryProducts {

    /**
     * An array of products that are assigned to the category.
     */
    items?: Array<GQLProductInterface | null>;

    /**
     * An object that includes the page_info and currentPage values specified in the query.
     */
    page_info?: GQLSearchResultPageInfo;

    /**
     * The number of products in the category that are marked as visible. By default,
     * in complex products, parent products are visible, but their child products are not.
     */
    total_count?: number;
}

export interface GQLConfigurableProductOptionsValues {

    /**
     * The label of the product on the default store
     */
    default_label?: string;

    /**
     * The label of the product
     */
    label?: string;

    /**
     * The label of the product on the current store
     */
    store_label?: string;

    /**
     * Swatch data for configurable product option
     */
    swatch_data?: GQLSwatchDataInterface;

    /**
     * The unique ID for a `ConfigurableProductOptionsValues` object
     */
    uid?: string;

    /**
     * Indicates whether to use the default_label
     */
    use_default_value?: boolean;

    /**
     * A unique index number assigned to the configurable product option
     * @deprecated Use `uid` instead
     */
    value_index?: number;
}

export interface GQLConfigurableProductOption {
    attribute_code: string;
    label: string;
    uid: string;
    values?: Array<GQLConfigurableProductOptionValue | null>;
}

export interface GQLConfigurableOptionAvailableForSelection {

    /**
     * Attribute code that uniquely identifies configurable option.
     */
    attribute_code: string;

    /**
     * Configurable option values available for further selection.
     */
    option_value_uids: Array<string | null>;
}

export interface GQLSimpleProduct extends
    GQLProductInterface,
    GQLRoutableInterface,
    GQLPhysicalProductInterface,
    GQLCustomizableProductInterface {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    New_attribute_size?: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    New_multiple_attribute?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Test_Ainars?: number;
    attribute_allows_html?: string;

    /**
     * The attribute set assigned to the product.
     * @deprecated The field should not be used on the storefront.
     */
    attribute_set_id?: number;
    brand?: string;

    /**
     * Relative canonical URL. This value is returned only if the system setting 'Use
     * Canonical Link Meta Tag For Products' is enabled
     */
    canonical_url?: string;

    /**
     * The categories assigned to a product.
     */
    categories?: Array<GQLCategoryInterface | null>;
    clothing_colour?: number;
    clothing_gender?: number;
    clothing_size?: number;
    clothing_type?: number;
    color?: number;
    color_elena?: number;
    colors_with_images?: number;

    /**
     * The product's country of origin.
     */
    country_of_manufacture?: string;

    /**
     * Timestamp indicating when the product was created.
     * @deprecated The field should not be used on the storefront.
     */
    created_at?: string;

    /**
     * Crosssell Products
     */
    crosssell_products?: Array<GQLProductInterface | null>;

    /**
     * Detailed information about the product. The value can include simple HTML tags.
     */
    description?: GQLComplexTextValue;
    fit?: number;

    /**
     * Indicates whether a gift message is available.
     */
    gift_message_available?: string;

    /**
     * The ID number assigned to the product.
     * @deprecated Use the `uid` field instead.
     */
    id?: number;

    /**
     * The relative path to the main image on the product page.
     */
    image?: GQLOptimizedProductImage;
    images_type_map?: number;
    license_key?: string;

    /**
     * A number representing the product's manufacturer.
     */
    manufacturer?: number;
    material?: string;

    /**
     * An array of Media Gallery objects.
     */
    media_gallery?: Array<GQLMediaGalleryInterface | null>;

    /**
     * An array of MediaGalleryEntry objects.
     * @deprecated Use product's `media_gallery` instead
     */
    media_gallery_entries?: Array<GQLMediaGalleryEntry | null>;
    memory?: number;

    /**
     * A brief overview of the product for search results listings, maximum 255 characters.
     */
    meta_description?: string;

    /**
     * A comma-separated list of keywords that are visible only to search engines.
     */
    meta_keyword?: string;

    /**
     * A string that is displayed in the title bar and tab of the browser and in search results lists.
     */
    meta_title?: string;
    multiple_attribute?: string;

    /**
     * The product name. Customers use this name to identify the product.
     */
    name?: string;

    /**
     * The beginning date for new product listings, and determines if the product is featured as a new product.
     * @deprecated The field should not be used on the storefront.
     */
    new_from_date?: string;

    /**
     * The end date for new product listings.
     * @deprecated The field should not be used on the storefront.
     */
    new_to_date?: string;

    /**
     * Product stock only x left count
     */
    only_x_left_in_stock?: number;

    /**
     * An array of options for a customizable product.
     */
    options?: Array<GQLCustomizableOptionInterface | null>;

    /**
     * If the product has multiple options, determines where they appear on the product page.
     */
    options_container?: string;
    original_price?: number;

    /**
     * A ProductPrices object, indicating the price of an item.
     * @deprecated Use price_range for product price information.
     */
    price?: GQLProductPrices;

    /**
     * A PriceRange object, indicating the range of prices for the product
     */
    price_range: GQLPriceRange;

    /**
     * An array of TierPrice objects.
     */
    price_tiers?: Array<GQLTierPrice | null>;

    /**
     * An array of ProductLinks objects.
     */
    product_links?: Array<GQLProductLinksInterface | null>;

    /**
     * Qty field for checkout order view
     */
    qty?: number;
    quantity?: number;
    ranking?: number;

    /**
     * The average of all the ratings given to the product.
     */
    rating_summary: number;

    /**
     * Contains 0 when there is no redirect error. A value of 301 indicates the URL
     * of the requested resource has been changed permanently, while a value of 302
     * indicates a temporary redirect
     */
    redirect_code: number;

    /**
     * Related Products
     */
    related_products?: Array<GQLProductInterface | null>;

    /**
     * The internal relative URL. If the specified URL is a redirect, the query returns the redirected URL, not the original
     */
    relative_url?: string;

    /**
     * The total count of all the reviews given to the product.
     */
    review_count: number;

    /**
     * The list of products reviews.
     */
    reviews: GQLProductReviews;
    row_total?: number;
    s_attributes?: Array<GQLAttributeWithValue | null>;
    salable_qty?: number;
    shoes_size?: number;

    /**
     * A short description of the product. Its use depends on the theme.
     */
    short_description?: GQLComplexTextValue;
    size?: number;

    /**
     * A number or code assigned to a product to identify the product, options, price, and manufacturer.
     */
    sku?: string;

    /**
     * The relative path to the small image, which is used on catalog pages.
     */
    small_image?: GQLOptimizedProductImage;

    /**
     * The beginning date that a product has a special price.
     * @deprecated The field should not be used on the storefront.
     */
    special_from_date?: string;

    /**
     * The discounted price of the product.
     */
    special_price?: number;

    /**
     * The end date that a product has a special price.
     */
    special_to_date?: string;
    stock_item?: GQLProductStockItem;

    /**
     * Stock status of the product
     */
    stock_status?: GQLProductStockStatus;

    /**
     * The file name of a swatch image
     */
    swatch_image?: string;
    test?: number;
    texture?: number;

    /**
     * The relative path to the product's thumbnail image.
     */
    thumbnail?: GQLOptimizedProductImage;

    /**
     * The price when tier pricing is in effect and the items purchased threshold has been reached.
     * @deprecated Use price_tiers for product tier price information.
     */
    tier_price?: number;

    /**
     * An array of ProductTierPrices objects.
     * @deprecated Use price_tiers for product tier price information.
     */
    tier_prices?: Array<GQLProductTierPrices | null>;

    /**
     * One of PRODUCT, CATEGORY, or CMS_PAGE.
     */
    type?: GQLUrlRewriteEntityTypeEnum;

    /**
     * One of simple, virtual, bundle, downloadable, grouped, or configurable.
     * @deprecated Use __typename instead.
     */
    type_id?: string;

    /**
     * The unique ID for a `ProductInterface` object.
     */
    uid: string;

    /**
     * Timestamp indicating when the product was updated.
     * @deprecated The field should not be used on the storefront.
     */
    updated_at?: string;

    /**
     * Upsell Products
     */
    upsell_products?: Array<GQLProductInterface | null>;
    url?: string;

    /**
     * The part of the URL that identifies the product
     */
    url_key?: string;

    /**
     *
     * @deprecated Use product's `canonical_url` or url rewrites instead
     */
    url_path?: string;

    /**
     * URL rewrites list
     */
    url_rewrites?: Array<GQLUrlRewrite | null>;

    /**
     * The part of the product URL that is appended after the url key
     */
    url_suffix?: string;
    valuesss?: number;

    /**
     * An array of websites in which the product is available.
     * @deprecated The field should not be used on the storefront.
     */
    websites?: Array<GQLWebsite | null>;

    /**
     * The weight of the item, in units defined by the store.
     */
    weight?: number;
    yes_no?: number;
}

export interface GQLMediaGalleryImageOfType {

    /**
     * Product image type
     */
    type?: string;

    /**
     * Product image url
     */
    url?: string;
}

export interface GQLProductMediaGalleryEntriesContent {

    /**
     * The image in base64 format.
     */
    base64_encoded_data?: string;

    /**
     * The file name of the image.
     */
    name?: string;

    /**
     * The MIME type of the file, such as image/png.
     */
    type?: string;
}

export interface GQLProductMediaGalleryEntriesVideoContent {

    /**
     * Must be external-video.
     */
    media_type?: string;

    /**
     * A description of the video.
     */
    video_description?: string;

    /**
     * Optional data about the video.
     */
    video_metadata?: string;

    /**
     * Describes the video source.
     */
    video_provider?: string;

    /**
     * The title of the video.
     */
    video_title?: string;

    /**
     * The URL to the video.
     */
    video_url?: string;
}

export interface GQLPrice {

    /**
     * An array that provides information about tax, weee, or weee_tax adjustments.
     * @deprecated Price is deprecated, use ProductPrice.
     */
    adjustments?: Array<GQLPriceAdjustment | null>;

    /**
     * The price of a product plus a three-letter currency code.
     * @deprecated Price is deprecated, use ProductPrice.
     */
    amount?: GQLMoney;
}

export interface GQLPriceAdjustment {

    /**
     * The amount of the price adjustment and its currency code.
     */
    amount?: GQLMoney;

    /**
     * Indicates whether the adjustment involves tax, weee, or weee_tax.
     * @deprecated PriceAdjustment is deprecated.
     */
    code?: GQLPriceAdjustmentCodesEnum;

    /**
     * Indicates whether the entity described by the code attribute is included or excluded from the adjustment.
     * @deprecated PriceAdjustment is deprecated.
     */
    description?: GQLPriceAdjustmentDescriptionEnum;
}

export interface GQLMoney {

    /**
     * A three-letter currency code, such as USD or EUR
     */
    currency?: GQLCurrencyEnum;

    /**
     * A number expressing a monetary value
     */
    value?: number;
}

export interface GQLProductPrice {

    /**
     * The base price of the product after discounts applied.
     */
    default_final_price: GQLMoney;

    /**
     * The base price of the product after discounts applied excluding taxes.
     */
    default_final_price_excl_tax: GQLMoney;

    /**
     * The base price of the product.
     */
    default_price: GQLMoney;

    /**
     * The price discount. Represents the difference between the regular and final price.
     */
    discount?: GQLProductDiscount;

    /**
     * The final price of the product after discounts applied.
     */
    final_price: GQLMoney;

    /**
     * The final price of the product after discounts applied excluding taxes.
     */
    final_price_excl_tax: GQLMoney;

    /**
     * The multiple FPTs that can be applied to a product price.
     */
    fixed_product_taxes?: Array<GQLFixedProductTax | null>;

    /**
     * The regular price of the product.
     */
    regular_price: GQLMoney;

    /**
     * The regular price of the product excluding taxes.
     */
    regular_price_excl_tax: GQLMoney;
}

export interface GQLProductDiscount {

    /**
     * The actual value of the discount.
     */
    amount_off?: number;

    /**
     * The discount expressed a percentage.
     */
    percent_off?: number;
}

export interface GQLProductReview {

    /**
     * The average rating for product review.
     */
    average_rating: number;

    /**
     * Date indicating when the review was created.
     */
    created_at: string;

    /**
     * The customer's nickname. Defaults to the customer name, if logged in
     */
    nickname: string;

    /**
     * Contains details about the reviewed product
     */
    product: GQLProductInterface;

    /**
     * An array of ratings by rating category, such as quality, price, and value
     */
    ratings_breakdown: Array<GQLProductReviewRating | null>;

    /**
     * The summary (title) of the review
     */
    summary: string;

    /**
     * The review text.
     */
    text: string;
}

export enum GQLPriceAdjustmentCodesEnum {

    /**
     *
     * @deprecated PriceAdjustmentCodesEnum is deprecated. Tax is included or excluded in price. Tax is not shown separtely in Catalog
     */
    TAX = 'TAX',

    /**
     *
     * @deprecated WEEE code is deprecated, use fixed_product_taxes.label
     */
    WEEE = 'WEEE',

    /**
     *
     * @deprecated Use fixed_product_taxes. PriceAdjustmentCodesEnum is deprecated. Tax is included or excluded in price. Tax is not shown separtely in Catalog
     */
    WEEE_TAX = 'WEEE_TAX',
}

export interface GQLSearchResultPageInfo {

    /**
     * Specifies which page of results to return
     */
    current_page?: number;

    /**
     * Specifies the maximum number of items to return
     */
    page_size?: number;

    /**
     * Total pages
     */
    total_pages?: number;
}

export interface GQLAttributeWithValueOption {
    label?: string;
    swatch_data?: GQLAttributeWithValueSwatchData;
    value?: string;
}

export interface GQLHttpQueryParameter {

    /**
     * Parameter name
     */
    name?: string;

    /**
     * Parameter value
     */
    value?: string;
}

export interface GQLConfigurableAttributeOption {

    /**
     * The ID assigned to the attribute
     */
    code?: string;

    /**
     * A string that describes the configurable attribute option
     */
    label?: string;

    /**
     * The unique ID for a `ConfigurableAttributeOption` object
     */
    uid: string;

    /**
     * A unique index number assigned to the configurable product option
     */
    value_index?: number;
}

export interface GQLSwatchDataInterface {

    /**
     * Value of swatch item (HEX color code, image link or textual value)
     */
    value?: string;
}

export interface GQLConfigurableProductOptionValue {
    is_available: boolean;
    is_use_default: boolean;
    label: string;
    swatch?: GQLSwatchDataInterface;
    uid: string;
}

export enum GQLPriceAdjustmentDescriptionEnum {
    INCLUDED = 'INCLUDED',
    EXCLUDED = 'EXCLUDED',
}

export interface GQLFixedProductTax {

    /**
     * Amount of the FPT as a money object.
     */
    amount?: GQLMoney;

    /**
     * The label assigned to the FPT to be displayed on the frontend.
     */
    label?: string;
}

export interface GQLProductReviewRating {

    /**
     * The label assigned to an aspect of a product that is being rated, such as quality or price
     */
    name: string;

    /**
     * The rating value given by customer. By default, possible values range from 1 to 5.
     */
    value: string;
}

export interface GQLAttributeWithValueSwatchData {
    type?: string;
    value?: string;
}

export interface GQLPriceTaxDisplay {

    /**
     * Defines if product price will include/exclude tax or both in catalog
     */
    product_price_display_type?: string;

    /**
     * Defines if shipping price will include/exclude tax or both
     */
    shipping_price_display_type?: string;
}

export interface GQLQuoteData extends GQLTotalsObject {
    applied_rule_ids?: string;
    applied_taxes?: Array<GQLAppliedTaxItem | null>;
    base_currency_code?: string;
    base_discount_amount?: number;
    base_grand_total?: number;
    base_shipping_amount?: number;
    base_shipping_discount_amount?: number;
    base_shipping_incl_tax?: number;
    base_shipping_tax_amount?: number;
    base_subtotal?: number;
    base_subtotal_with_discount?: number;
    base_tax_amount?: number;
    coupon_code?: string;
    customer_is_guest?: boolean;
    customer_tax_class_id?: number;
    discount_amount?: number;
    grand_total?: number;
    id?: string;
    is_in_store_pickup_available?: boolean;
    is_virtual?: boolean;
    items?: Array<GQLTotalsItem | null>;
    items_count?: number;
    items_qty?: number;
    quote_currency_code?: string;
    shipping_amount?: number;
    shipping_discount_amount?: number;
    shipping_incl_tax?: number;
    shipping_method?: string;
    shipping_tax_amount?: number;
    store_id?: number;
    subtotal?: number;
    subtotal_incl_tax?: number;
    subtotal_with_discount?: number;
    tax_amount?: number;
    weee_tax_applied_amount?: number;
}

export interface GQLTotalsObject {
    applied_rule_ids?: string;
    base_currency_code?: string;
    base_discount_amount?: number;
    base_grand_total?: number;
    base_shipping_amount?: number;
    base_shipping_discount_amount?: number;
    base_shipping_incl_tax?: number;
    base_shipping_tax_amount?: number;
    base_subtotal?: number;
    base_subtotal_with_discount?: number;
    base_tax_amount?: number;
    coupon_code?: string;
    customer_is_guest?: boolean;
    customer_tax_class_id?: number;
    discount_amount?: number;
    grand_total?: number;
    is_in_store_pickup_available?: boolean;
    items?: Array<GQLTotalsItem | null>;
    items_count?: number;
    items_qty?: number;
    quote_currency_code?: string;
    shipping_amount?: number;
    shipping_discount_amount?: number;
    shipping_incl_tax?: number;
    shipping_method?: string;
    shipping_tax_amount?: number;
    store_id?: number;
    subtotal?: number;
    subtotal_incl_tax?: number;
    subtotal_with_discount?: number;
    tax_amount?: number;
    weee_tax_applied_amount?: number;
}

export interface GQLAppliedTaxItem {
    amount?: number;
    percent?: number;
    rates?: Array<GQLAppliedTaxItemRate | null>;
}

export interface GQLAppliedTaxItemRate {
    percent?: number;
    title?: string;
}

export interface GQLTotalsItem {
    base_discount_amount?: number;
    base_price?: number;
    base_price_incl_tax?: number;
    base_row_total?: number;
    base_row_total_incl_tax?: number;
    base_tax_amount?: number;
    bundle_options?: Array<GQLSelectedBundleOption | null>;
    customizable_options?: Array<GQLSelectedCustomizableOption | null>;
    discount_amount?: number;
    discount_percent?: number;
    downloadable_links?: Array<GQLSelectedDownloadableLinks | null>;
    item_id?: number;
    name?: string;
    options?: string;
    price?: number;
    price_incl_tax?: number;
    product?: GQLProductInterface;
    qty?: number;
    row_total?: number;
    row_total_incl_tax?: number;
    row_total_with_discount?: number;
    sku?: string;
    tax_amount?: number;
    tax_percent?: number;
    weee_tax_applied?: number;
    weee_tax_applied_amount?: number;
}

export interface GQLSelectedBundleOption {

    /**
     *
     * @deprecated Use `uid` instead
     */
    id: number;
    label: string;
    type: string;

    /**
     * The unique ID for a `SelectedBundleOption` object
     */
    uid: string;
    values: Array<GQLSelectedBundleOptionValue | null>;
}
