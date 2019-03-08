import { connect } from 'react-redux';
import HomeSlider from './HomeSlider.component';

const mapStateToProps = state => ({
    slider: state.CmsBlocksAndSliderReducer.slider
});

const HomeSliderContainer = connect(mapStateToProps)(HomeSlider);

export default HomeSliderContainer;
