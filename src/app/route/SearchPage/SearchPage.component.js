import CategoryPage from 'Route/CategoryPage/CategoryPage.component';
import ContentWrapper from 'Component/ContentWrapper';

export default class SearchPage extends CategoryPage {
    render() {
        return (
            <main block="CategoryPage">
                <h1 style={ { display: 'none' } }>Search</h1>
                <ContentWrapper
                  wrapperMix={ {
                      block: 'CategoryPage',
                      elem: 'Wrapper',
                      mods: { isSearchPage: true }
                  } }
                  label="Category page"
                >
                    { this.renderFilterOverlay() }
                    <aside block="CategoryPage" elem="Miscellaneous">
                        { this.renderItemsCount() }
                        { this.renderCategorySort() }
                        { this.renderFilterButton() }
                    </aside>
                    { this.renderCategoryProductList() }
                </ContentWrapper>
            </main>
        );
    }
}
