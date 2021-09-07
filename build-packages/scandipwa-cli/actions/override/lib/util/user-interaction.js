const inquirer = require('inquirer');

const QUESTION_KEY = 'QUESTION_KEY';

class UserInteraction {
    async _select(question, selectOptions, isMultiSelect) {
        const answers = await inquirer.prompt({
            message: question,
            type: isMultiSelect ? 'checkbox' : 'list',
            name: QUESTION_KEY,
            choices: selectOptions.map(
                ({ displayName, value }) => ({ name: displayName, value })
            )
        });

        const answer = answers[QUESTION_KEY];

        return answer;
    }

    async singleSelect(question, selectOptions) {
        return this._select(question, selectOptions, false);
    }

    async multiSelect(question, selectOptions) {
        return this._select(question, selectOptions, true);
    }

    async yesNo(question) {
        const answers = await inquirer.prompt({
            message: question,
            name: QUESTION_KEY,
            type: 'confirm'
        });

        const answer = answers[QUESTION_KEY];

        return answer;
    }
}

const ui = new UserInteraction();

module.exports = ui;
