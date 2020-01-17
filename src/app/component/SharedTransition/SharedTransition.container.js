// TODO: implement props passing

import { Subscribe } from 'unstated';
import SharedTransitionContainer from './SharedTransition.unstated';
import SharedTransition from './SharedTransition.component';

export default props => (
    <Subscribe to={ [SharedTransitionContainer] }>
        { sharedTransition => (
            <SharedTransition
              { ...props }
              { ...sharedTransition }
            />
        ) }
    </Subscribe>
);
