import { Field } from 'Util/Query';
/**
 * Menu Query
 * @class MenuQuery
 */
class MenuQuery {
    /**
     * get Menu query
     * @param  {{menuId: String}} options A object containing different aspects of query, each item can be omitted
     * @return {Field} Menu query
     * @memberof MenuQuery
     */
    getQuery(options) {
        const { menuId } = options;

        const items = new Field('items')
            .addFieldList([
                'item_id', 'is_active',
                'parent_id', 'position', 'title',
                'item_class', 'url', 'url_type',
                'cms_page_identifier', 'category_id'
            ]);

        return new Field('scandiwebMenu')
            .addArgument('id', 'ID!', menuId)
            .addFieldList(['menu_id', 'is_active', 'css_class'])
            .addField(items)
            .setAlias('menu');
    }
}

export default new MenuQuery();
