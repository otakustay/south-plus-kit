import {Banner} from '../../ui/banner.js';
import {injectStyle, registerGlobalShortcut, waitForElementVisible} from '../../utils/dom.js';
import {WorkUploadArchiveLogic, WorkUploadFileLogic} from './logic.js';

async function setupArchivePage() {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('__spk_download__');
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    injectStyle`
        .spk-row-active {
            background-color: #f6c050;
        }
    `;

    if (!name) {
        return;
    }

    await waitForElementVisible('.filename', {timeout: 10 * 1000, interval: 100});

    const logic = WorkUploadArchiveLogic.initialize(name);

    if (!logic.hasContent()) {
        return;
    }

    logic.highlightRow();
    const banner = new Banner();
    banner.add('下载 [D]');
    registerGlobalShortcut('d', () => logic.download());
    banner.render();
}

async function setupFilePage() {
    await waitForElementVisible('a.btn.btn-prio', {timeout: 10 * 1000, interval: 100});

    const logic = WorkUploadFileLogic.initialize();

    if (!logic.hasContent()) {
        return;
    }

    const banner = new Banner();
    banner.add('下载 [D]');
    registerGlobalShortcut('d', () => logic.download());
    banner.render();
}

export async function setupWorkUpload() {
    const path = location.pathname;
    if (path.startsWith('/archive/')) {
        await setupArchivePage();
    }
    else if (path.startsWith('/file/')) {
        await setupFilePage();
    }
}
