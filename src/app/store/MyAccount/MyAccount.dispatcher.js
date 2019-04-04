import { QueryDispatcher, fetchMutation } from 'Util/Request';
import { setAuthorizationToken } from 'Util/Auth';
import { MyAccount as MyAccountMutations } from 'Query';

/**
 * My account actions
 * @class MyAccount
 * @extends {QueryDispatcher}
 */
class MyAccount extends QueryDispatcher {
    constructor() {
        super('MyAccount', 86400);
    }

    /**
     * Forgot password action
     * @param {{email: String}} [options={}]
     * @memberof MyAccount
     */
    forgotPassword(options = {}) {
        const mutation = MyAccountMutations.getForgotPasswordMutation(options);

        fetchMutation(mutation).then(
            data => console.log(data),
            error => console.log(error)
        );
    }

    /**
     * Reset password action
     * @param {{token: String, password: String, password_confirmation: String}} [options={}]
     * @memberof MyAccount
     */
    resetPassword(options = {}) {
        const mutation = MyAccountMutations.getResetPasswordMutation(options);

        fetchMutation(mutation).then(
            data => console.log(data),
            error => console.log(error)
        );
    }

    /**
     * Create account action
     * @param {{customer: Object, password: String}} [options={}]
     * @memberof MyAccount
     */
    createAccount(options = {}) {
        const mutation = MyAccountMutations.getCreateAccountMutation(options);

        fetchMutation(mutation).then(
            data => console.log(data),
            error => console.log(error)
        );
    }

    /**
     * Sign in action
     * @param {{email: String, password: String}} [options={}]
     * @memberof MyAccount
     */
    signIn(options = {}) {
        const mutation = MyAccountMutations.getSignInMutation(options);

        fetchMutation(mutation).then(
            ({ token }) => {
                // TODO: TEST
                setAuthorizationToken(token);
                // dispatch user authorized action
            },
            error => console.log(error)
        );
    }
}

export default new MyAccount();
