import {Banner} from '../../ui/banner.js';
import {registerGlobalShortcut} from '../../utils/dom.js';
import {SouthPlusLogic} from './logic.js';

export function setupSouthPlus() {
    const logic = SouthPlusLogic.initialize();

    if (!logic.isSatisfied()) {
        return;
    }

    const banner = new Banner();
    if (logic.canDownload()) {
        banner.add('下载资源 [D]');
        registerGlobalShortcut('d', () => logic.openAvailableLink());
    }
    if (logic.canPurchase()) {
        banner.add('购买资源 [B]');
        registerGlobalShortcut('b', () => logic.purchase());
    }
    if (logic.canCopy()) {
        banner.add('复制标题 [C]');
        registerGlobalShortcut('c', () => logic.copyTitle());
    }
    banner.render();
}
