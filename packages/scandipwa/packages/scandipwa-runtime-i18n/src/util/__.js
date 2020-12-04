import i18n from "./i18n";

function injectValues(string, ...values) {
  // eslint-disable-next-line fp/no-let
  let i = 0;
  return string.replace(/%s/g, () => values[i++]);
}

export default function __(string, ...values) {
  const translatedString = i18n.currentTranslation[string] || string;
  console.log(translatedString);

  return injectValues(translatedString, ...values);
}
