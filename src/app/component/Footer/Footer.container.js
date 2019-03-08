import { connect } from 'react-redux';
import { CmsBlocksAndSliderDispatcher } from 'Store/CmsBlocksAndSlider';
import Footer from './Footer.component';

const mapStateToProps = state => ({
    blocks: state.CmsBlocksAndSliderReducer.blocks
});

const FooterContainer = connect(mapStateToProps)(Footer);

export default FooterContainer;
