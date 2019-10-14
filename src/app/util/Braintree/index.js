import { fetchMutation } from 'Util/Request';
import { Field } from 'Util/Query';

class Braintree {
    isLoading = false;

    constructor(containerId) {
        this.containerId = containerId;
    }

    async create() {
        const { default: dropIn } = await import('braintree-web-drop-in');
        const authorization = await this.requestBraintreeClientToken();
        this.braintreeDropIn = await dropIn.create({
            authorization,
            container: `#${ this.containerId }`
        });

        return true;
    }

    requestBraintreeClientToken() {
        const mutation = (new Field('createBraintreeClientToken')).setAlias('token');
        return fetchMutation(mutation).then(({ token }) => token);
    }

    requestPaymentNonce = () => this.braintreeDropIn.requestPaymentMethod();
}

export default Braintree;
