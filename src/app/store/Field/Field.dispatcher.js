import { QueryDispatcher, executePost } from 'Util/Request';
import { prepareQuery } from 'Util/Query';
import { getCountryList } from 'Store/Field';
import FieldQuery from 'Query/FieldQuery.query';

class FieldDispatcher extends QueryDispatcher {
    getCountriesList(dispatch) {
        const query = FieldQuery.getCountriesList();

        return executePost(prepareQuery([query])).then(
            ({ countries }) => dispatch(getCountryList(countries)),
            error => console.log(error)
        );
    }
}

export default new FieldDispatcher();
