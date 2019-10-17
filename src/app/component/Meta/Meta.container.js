import { connect } from 'react-redux';

import Meta from './Meta.component';

export const mapStateToProps = state => ({
    title_prefix: state.ConfigReducer.title_prefix,
    title_suffix: state.ConfigReducer.title_suffix,
    default_description: state.ConfigReducer.default_description,
    default_keywords: state.ConfigReducer.default_keywords,
    default_title: state.ConfigReducer.default_title
});

export default connect(mapStateToProps)(Meta);
