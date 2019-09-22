class Braintree {
    constructor(containerId) {
        this.containerId = containerId;
    }

    async create() {
        // const { default: dropIn } = await import('braintree-web-drop-in');

        // this.braintreeDropIn = await dropIn.create({
        //     authorization: 'sandbox_pgn82gzx_rm5zj63hvmf684tx',
        //     container: `#${ this.containerId }`
        // });
    }

    requestPaymentNonce = () => this.braintreeDropIn.requestPaymentMethod();
}

export default Braintree;
