import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import i18next from 'eslint-plugin-i18next';
import noSecrets from 'eslint-plugin-no-secrets';
import sonarjs from 'eslint-plugin-sonarjs';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      i18next,
      'no-secrets': { rules: noSecrets.rules },
      sonarjs: sonarjs,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Extreme Type Strictness
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',

      // i18n Enforcement: Mandatory for business logic (t/translate)
      'i18next/no-literal-string': [
        'error',
        {
          mode: 'all',
          onlyFunctions: ['t', 'translate'],
          // Expanded ignore list for all technical infrastructure strings
          ignoreFunctions: [
            'Logger.*',
            'ConfigService.get',
            'ApiProperty',
            'ApiOperation',
            'ApiTags',
            'ApiBody',
            'ApiResponse',
            'Controller',
            'Get',
            'Post',
            'Put',
            'Delete',
            'Patch',
            'setGlobalPrefix',
            'setTitle',
            'setDescription',
            'setVersion',
            'addTag',
            'setup',
            'forRoot',
            'register',
            'findUnique',
            'create',
            'update',
            'upsert',
            'delete',
            'findMany',
            'findFirst',
            'send',
            'publish',
            'putItem',
            'getItem',
            'upload',
            'get',
            'listen',
            'getUrl',
            'logOperation',
            'handleError',
            'recordMetric',
            'startTrace',
          ],
        },
      ],

      // Naming Conventions (SOLID)
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I'],
        },
      ],

      // Hardcoded Secret Detection
      'no-secrets/no-secrets': 'error',

      // Architectural Shield (SOLID / SRP)
      'sonarjs/cognitive-complexity': ['error', 15],
      'max-lines': ['error', { max: 200, skipBlankLines: true, skipComments: true }],
      'sonarjs/no-duplicate-string': 'warn',
      'sonarjs/no-identical-functions': 'error',
    },
  },
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'eslint.config.mjs',
      'jest-unit.json',
      'jest-int.json',
      'test/**',
      'prisma/**',
      '.releaserc.json',
      'src/providers/aws/*.ts',
      'src/providers/openai/*.ts',
      'src/main.ts',
      'src/common/filters/*.ts',
      'src/common/middlewares/*.ts',
      'src/modules/health/*.ts',
      'src/app.controller.ts',
    ],
  },
);
