/* eslint-disable @typescript-eslint/no-var-requires */
const { ESLint } = require('eslint')

const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const ignoredFiles = await Promise.all(files.map((file) => eslint.isPathIgnored(file)))
  const filteredFiles = files.filter((_, i) => !ignoredFiles[i])
  return filteredFiles.join(' ')
}

module.exports = {
  // this will check Typescript files
  '**/*.(ts|tsx)': () => 'tsc -p tsconfig.json --noEmit',

  // This will lint and format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': async (filenames) => {
    const filesToLint = await removeIgnoredFiles(filenames)
    return [
      `eslint --max-warnings=0 --fix ${filesToLint}`,
      `prettier --write ${filenames.join(' ')} `,
    ]
  },

  // this will Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `prettier --write ${filenames.join(' ')}`,
}
