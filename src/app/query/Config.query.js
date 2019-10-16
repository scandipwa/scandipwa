import { Field } from 'Util/Query';

export class ConfigQuery {
    getQuery() {
        return new Field('storeConfig')
            .addFieldList([
                'cms_home_page',
                'cms_no_route',
                'copyright',
                'timezone',
                'header_logo_src',
                'logo_alt',
                'logo_height',
                'logo_width'
            ]);
    }
}

export default new ConfigQuery();
