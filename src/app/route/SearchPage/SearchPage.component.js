import CategoryPage from 'Route/CategoryPage/CategoryPage.component';
import ContentWrapper from 'Component/ContentWrapper';

export default class SearchPage extends CategoryPage {
    renderSearchDetails() {
        const { search } = this.props;

        return (
            <article block="CategoryDetails">
                <div block="CategoryDetails" elem="Description">
                <h1 block="CategoryDetails" elem="Heading">
                    { __('Search results for: ') }
                    { search }
                </h1>
                </div>
            </article>
        );
    }

    render() {
        return (
            <main block="CategoryPage">
                <ContentWrapper
                  wrapperMix={ {
                      block: 'CategoryPage',
                      elem: 'Wrapper',
                      mods: { isSearchPage: true }
                  } }
                  label="Category page"
                >
                    { this.renderFilterOverlay() }
                    { this.renderSearchDetails() }
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
