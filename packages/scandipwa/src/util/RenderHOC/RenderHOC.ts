import { Constructable } from 'Type/Constructable';
import { SimpleComponent } from 'Util/SimpleComponent';

export const renderHOC = <P, T>(
    Component: Constructable<SimpleComponent<T>>,
    logicHook?: (props: P) => T
) => (props: P): JSX.Element => {
        const componentProps = logicHook ? logicHook(props) : {};
        const renderComponent = new Component(componentProps);

        return renderComponent.render();
    };
