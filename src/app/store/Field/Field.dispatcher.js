import { QueryDispatcher } from 'Util/Request';
import FieldQuery from 'Query/Field';

class FieldDispatcher extends QueryDispatcher {
    getCountryList(dispatch) {
        console.log(FieldQuery);
        const query = FieldQuery.getCountryList();
    }
}

export default new FieldDispatcher();
