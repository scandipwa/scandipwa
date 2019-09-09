import { Field } from 'Util/Query';

export class ConfigQuery {
    getQuery() {
        return new Field('storeConfig')
            .addFieldList([
                'cms_home_page',
                'cms_no_route',
                'copyright',
                'header_logo_src',
                'timezone'
            ]);
    }
}

export default new ConfigQuery();
