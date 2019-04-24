import { QueryDispatcher, executePost } from 'Util/Request';
import { prepareQuery } from 'Util/Query';
import { getCountryList } from 'Store/Country';
import Country from 'Query/Country.query';

class CountryDispatcher extends QueryDispatcher {
    getCountriesList(dispatch) {
        const query = Country.getCountriesList();

        return executePost(prepareQuery([query])).then(
            ({ countries }) => dispatch(getCountryList(countries)),
            error => console.log(error)
        );
    }
}

export default new CountryDispatcher();
