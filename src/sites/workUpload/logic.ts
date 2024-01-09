import {SelectContext, dispatchClick, selectElementContext} from '../../utils/dom.js';

interface SelectArgs {
    name: string;
}

const archiveSelectors = {
    container: ({name}: SelectArgs) => {
        const elements = document.querySelectorAll<HTMLSpanElement>('.filename');
        const element = [...elements].find(v => v.innerText.includes(name));
        return element ? element.closest('.frame') : null;
    },
} as const;

type ArchiveElementContext = SelectContext<typeof archiveSelectors, SelectArgs>;

export class WorkUploadArchiveLogic {
    private constructor(private readonly context: ArchiveElementContext) {}

    static initialize(name: string) {
        const context = selectElementContext(archiveSelectors, {name});
        return new WorkUploadArchiveLogic(context);
    }

    hasContent() {
        return !!this.context.container;
    }

    highlightRow() {
        this.context.container?.classList.add('spk-row-active');
    }

    download() {
        const link = this.context.container?.querySelector('.filedownload > a');
        if (link) {
            dispatchClick(link);
        }
    }
}

const fileSelectors = {
    downloadButton: 'a.btn.btn-prio',
};

type FileElementContext = SelectContext<typeof fileSelectors>;

export class WorkUploadFileLogic {
    private constructor(private readonly context: FileElementContext) {}

    static initialize() {
        const context = selectElementContext(fileSelectors, {});
        return new WorkUploadFileLogic(context);
    }

    hasContent() {
        return !!this.context.downloadButton;
    }

    download() {
        if (this.context.downloadButton) {
            dispatchClick(this.context.downloadButton);
        }
    }
}
