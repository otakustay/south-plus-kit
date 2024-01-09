import {Banner} from '../../ui/banner.js';
import {injectStyle, registerGlobalShortcut, waitForElementVisible} from '../../utils/dom.js';
import {GoFileLogic} from './logic.js';

export async function setupGoFile() {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('__spk_download__');
    injectStyle`
        .spk-row-active {
            background-color: hsl(358, 96%, 25%);
        }
    `;

    if (!name) {
        return;
    }

    await waitForElementVisible('.contentName', {timeout: 10 * 1000, interval: 100});

    const logic = GoFileLogic.initialize(name);

    if (!logic.hasContent()) {
        return;
    }

    logic.highlightRow();
    const banner = new Banner();
    banner.add('下载 [D]');
    registerGlobalShortcut('d', () => logic.download());
    banner.render();
}
