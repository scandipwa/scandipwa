import CmsPage from 'Component/CmsPage';
import Footer from 'Component/Footer';
import InstallPrompt from 'Component/InstallPrompt';
import { SimpleComponent } from 'Util/SimpleComponent';

export interface HomePageProps {}

export class HomePageComponent extends SimpleComponent<HomePageProps> {
    render(): JSX.Element {
        return (
            <div block="HomePage">
                <InstallPrompt />
                <CmsPage />
                <Footer isVisibleOnMobile />
            </div>
        );
    }
}
