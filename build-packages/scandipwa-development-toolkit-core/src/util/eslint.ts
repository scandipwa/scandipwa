import { ESLint } from 'eslint';

export const fixESLint = async (filePaths: string[]) => {
    const jsFilePaths = filePaths.filter(file => /\.(j|t)sx?$/.test(file));

    const eslint = new ESLint({ fix: true });

    const results = await eslint.lintFiles(jsFilePaths);

    await ESLint.outputFixes(results);

    // * Uncomment if ESLint output is needed
    // const formatter = await eslint.loadFormatter("stylish");
    // const resultText = formatter.format(results);
    // console.log(resultText);
};

export default fixESLint;