import {setupSouthPlus} from './sites/southPlus/main.js';
import {setupGoFile} from './sites/goFile/main.js';
import {setupWorkUpload} from './sites/workUpload/main.js';

switch (location.hostname) {
    case 'www.south-plus.net':
        setupSouthPlus();
        break;
    case 'gofile.io':
        void setupGoFile();
        break;
    case 'workupload.com':
        void setupWorkUpload();
        break;
}
