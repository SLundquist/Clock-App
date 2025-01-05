import googleConfig from 'eslint-config-google';

export default [
  {
    files: ['**/*.js', '**/*.mjs'], // Target JavaScript files
    ignores: ['node_modules/**', 'dist/**', 'minifiedJS/main.js'], // Ignore common folders
    languageOptions: {
      ecmaVersion: 2021, // Use modern JavaScript
      sourceType: 'module', // ES modules
      globals: {
        window: 'readonly',
        document: 'readonly',
      },
    },
    rules: {
      // Spread Google rules but exclude "valid-jsdoc"
      ...Object.fromEntries(
          Object.entries(googleConfig.rules).filter(([rule]) => rule !== 'valid-jsdoc'),
      ),
      // Custom rules
      'require-jsdoc': 'off', // Turn off JSDoc requirement
      'max-len': [
        'warn',
        {
          code: 100, // Max line length
          ignoreUrls: true, // Ignore long URLs
          ignoreComments: true, // Ignore comments
          ignoreStrings: true, // Ignore long strings
          ignoreTemplateLiterals: true, // Ignore template literals
          ignoreRegExpLiterals: true, // Ignore regular expressions
        },
      ],
      'quotes': ['error', 'single', {avoidEscape: true}], // Enforce single quotes
      'no-var': ['warn'],
    },
  },
];
