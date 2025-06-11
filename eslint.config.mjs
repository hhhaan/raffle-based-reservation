import { FlatCompat } from '@eslint/eslintrc';
import dotenv from 'dotenv';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    // 전역 무시 설정
    {
        ignores: [
            // 의존성 및 패키지
            'node_modules/**',
            'npm-debug.log*',
            'yarn-debug.log*',
            'yarn-error.log*',

            // 빌드 결과물
            'dist/**',
            'build/**',
            '.next/**',
            'out/**',
            'coverage/**',

            // 환경 설정
            '.env*',

            // 압축/최적화된 파일들
            '*.min.js',
            '*.min.css',
            '*.bundle.js',

            // 자동 생성 파일들
            '*.d.ts',
            '!src/**/*.d.ts',

            // 로그 파일
            '*.log',
            'logs/**',

            // 임시 파일
            '.tmp/**',
            'temp/**',

            // 테스트 관련
            '.nyc_output/**',

            // Storybook
            'storybook-static/**',

            // PWA
            'public/sw.js',
            'public/workbox-*.js',

            // 기타 설정 파일
            '.eslintcache',
            '.stylelintcache',

            // public 폴더 (JS/TS 파일 제외)
            'public/**',
            '!public/**/*.js',
            '!public/**/*.ts',
        ],
    },

    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            // TypeScript 관련
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            // 임포트 정렬 규칙
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // 1. React 관련 (최우선)
                        ['^react', '^react-dom'],
                        // 2. Next.js 관련
                        ['^next'],
                        // 3. 외부 라이브러리 (node_modules)
                        ['^@?\\w'],
                        // 4. 내부 절대경로 (@로 시작)
                        ['^@/'],
                        // 5. 상대경로 (../ 형태)
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        // 6. 현재 디렉토리 (./ 형태)
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        // 7. 타입 임포트 (마지막)
                        ['^.+\\u0000$'],
                    ],
                },
            ],
            'simple-import-sort/exports': 'error',

            // 일반적인 코드 품질 규칙
            'no-unused-vars': 'off', // TypeScript 버전을 사용
            // 'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
            'prefer-const': 'error',
            'no-var': 'error',

            // React 관련 규칙
            'react-hooks/exhaustive-deps': 'warn',
            'react/jsx-key': 'error',
            'react/no-unescaped-entities': 'off',

            // Next.js 관련
            '@next/next/no-img-element': 'off', // Image 컴포넌트 사용 권장하지만 강제하지 않음
        },
    },
];

export default eslintConfig;
