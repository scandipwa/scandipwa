import { ActionDispatcher } from 'Util/Request';
import { MyAccount as MyAccountMutations } from 'Query';

/**
 * My account actions
 * @class MyAccount
 * @extends {ActionDispatcher}
 */
class MyAccount extends ActionDispatcher {
    /**
     * Forgot password action
     * @param {{email: String}} [options={}]
     * @memberof MyAccount
     */
    forgotPassword(options = {}) {
        const mutation = MyAccountMutations.getForgotPasswordMutation(options);

        this.executeFetch(mutation).then(
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

        this.executeFetch(mutation).then(
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

        this.executeFetch(mutation).then(
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

        this.executeFetch(mutation).then(
            data => console.log(data),
            error => console.log(error)
        );
    }
}

export default new MyAccount();
