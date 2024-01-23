import {SelectContext, dispatchClick, selectElementContext} from '../../utils/dom.js';
import {mostSimilar} from '../../utils/string.js';

interface SelectArgs {
    name: string;
}

const selectors = {
    row: ({name}: SelectArgs) => {
        const elements = [...document.querySelectorAll<HTMLSpanElement>('.contentName')];
        const targetText = mostSimilar(elements.map(v => v.innerText), name);
        const element = elements.find(v => v.innerText === targetText);
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
        if (button) {
            dispatchClick(button);
        }
    }
}
