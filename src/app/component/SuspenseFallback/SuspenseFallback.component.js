import { PureComponent } from 'react';
import Loader from 'Component/Loader';

import './SuspenseFallback.style';

class SuspenseFallback extends PureComponent {

    render() {
        return (
            <div block="SuspenseFallback">
                <Loader isLoading />
            </div>
        );
    }
}

export default SuspenseFallback;
