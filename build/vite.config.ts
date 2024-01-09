import {UserConfig} from 'vite';

const config: UserConfig = {
    build: {
        lib: {
            entry: 'src/main.ts',
            name: 'southPlusKit',
            formats: ['iife'],
            fileName: () => 'index.js',
        },
        rollupOptions: {},
        minify: false,
        target: ['chrome80'],
    },
};

export default config;
