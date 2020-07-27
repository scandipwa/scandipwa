// TODO: implement props passing

import { Subscribe } from 'unstated';

import SharedTransition from './SharedTransition.component';
import SharedTransitionContainer from './SharedTransition.unstated';

export default (props) => (
    <Subscribe to={ [SharedTransitionContainer] }>
        { (sharedTransition) => (
            <SharedTransition
              { ...props }
              { ...sharedTransition }
            />
        ) }
    </Subscribe>
);
