import {SelectContext, dispatchClick, selectElementContext} from '../../utils/dom.js';

const selectors = {
    titleLabel: '#subject_tpc!',
    purchaseButton: 'input[value="愿意购买,我买,我付钱"]',
    purchasedContent: 'blockquote.jumbotron',
    goLink: 'a[href^="https://gofile.io/"]',
    workUploadLink: 'a[href^="https://workupload.com/"]',
    megaLink: 'a[href^="https://mega.nz/"]',
} as const;

type ElementContext = SelectContext<typeof selectors>;

export class SouthPlusLogic {
    private constructor(private readonly context: ElementContext) {}

    static initialize() {
        const context = selectElementContext(selectors, {});
        return new SouthPlusLogic(context);
    }

    canDownload() {
        return !!(this.context.goLink ?? this.context.workUploadLink ?? this.context.megaLink);
    }

    canPurchase() {
        return !this.context.purchasedContent && !!this.context.purchaseButton;
    }

    canCopy() {
        return !!this.context.titleLabel;
    }

    isSatisfied() {
        return this.canDownload() || this.canPurchase();
    }

    purchase() {
        if (this.context.purchaseButton) {
            dispatchClick(this.context.purchaseButton);
        }
    }

    openAvailableLink() {
        if (this.context.goLink) {
            this.openDownloadLink(this.context.goLink);
        }
        else if (this.context.workUploadLink) {
            this.openDownloadLink(this.context.workUploadLink);
        }
        else if (this.context.megaLink) {
            const url = new URL(this.context.megaLink.getAttribute('href')!);
            url.searchParams.set('__spk_download__', 'immediate');
            void GM.openInTab(url.toString(), {active: true});
        }
    }

    copyTitle() {
        if (this.context.titleLabel) {
            void GM.setClipboard(this.context.titleLabel.innerText.replaceAll(':', ' '));
        }
    }

    private openDownloadLink(element: HTMLElement) {
        const url = new URL(element.getAttribute('href')!);
        if (this.context.titleLabel) {
            url.searchParams.set('__spk_download__', this.context.titleLabel.innerText);
        }
        void GM.openInTab(url.toString(), {active: true});
    }
}
