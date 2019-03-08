import { connect } from 'react-redux';
import NewsletterSubscribe from './NewsletterSubscribe.component';

const mapStateToProps = state => ({
    blocks: state.CmsBlocksAndSliderReducer.blocks
});

const NewsletterSubscribeContainer = connect(mapStateToProps)(NewsletterSubscribe);

export default NewsletterSubscribeContainer;
