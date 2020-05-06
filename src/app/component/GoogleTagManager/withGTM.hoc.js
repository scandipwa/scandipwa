import GoogleTagManagerRouteWrapperComponent from './GoggleTagManagerRouteWrapper.component';

const withGTM = (WrappableComponent, gtmRoute) => props => (
    <GoogleTagManagerRouteWrapperComponent route={ gtmRoute }>
        <WrappableComponent { ...props } />
    </GoogleTagManagerRouteWrapperComponent>
);

export default withGTM;
