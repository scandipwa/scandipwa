const { ProviderWrapper } = require('./Provider');

export const decorators = [
    (Story) => (
      <ProviderWrapper>
        <Story />
      </ProviderWrapper>
    )
];

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};

window.storeList = ['a', 'b'];
window.storeRegexText = '\s';

