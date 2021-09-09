import { match as Match } from 'react-router';

import { CmsPage } from 'Component/CmsPage';
import Footer from 'Component/Footer';
import InstallPrompt from 'Component/InstallPrompt';
import { SimpleComponent } from 'Util/SimpleComponent';

export interface HomePageProps {
    match: Match,
    pageIdentifiers: string
}

export class HomePageComponent extends SimpleComponent<HomePageProps> {
    render(): JSX.Element {
        const { match, pageIdentifiers } = this.props;
        return (
            <div block="HomePage">
                <InstallPrompt />
                <CmsPage match={ match } pageIdentifiers={ pageIdentifiers } />
                <Footer isVisibleOnMobile />
            </div>
        );
    }
}
