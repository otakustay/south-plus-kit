import {SelectContext, dispatchClick, selectElementContext} from '../../utils/dom.js';

interface SelectArgs {
    name: string;
}

const selectors = {
    row: ({name}: SelectArgs) => {
        const elements = document.querySelectorAll<HTMLSpanElement>('.contentName');
        const element = [...elements].find(v => v.innerText.includes(name));
        return element ? element.closest('.row') : null;
    },
} as const;

type ElementContext = SelectContext<typeof selectors, SelectArgs>;

export class GoFileLogic {
    private constructor(private readonly context: ElementContext) {}

    static initialize(name: string) {
        const context = selectElementContext(selectors, {name});
        return new GoFileLogic(context);
    }

    hasContent() {
        return !!this.context.row;
    }

    highlightRow() {
        this.context.row?.classList.add('spk-row-active');
    }

    download() {
        const button = this.context.row?.querySelector('button');
        if (button?.parentElement) {
            dispatchClick(button.parentElement);
        }
    }
}
