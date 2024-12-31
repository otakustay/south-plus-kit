interface WaitOptions {
    timeout: number;
    interval: number;
}

export function waitForElementVisible(selector: string, options: WaitOptions): Promise<void> {
    const detect = (resolve: (element: Element) => void) => {
        const result = document.querySelector(selector);
        if (result) {
            resolve(result);
        }
        else {
            setTimeout(detect, options.interval, resolve);
        }
    };
    const abort = (resolve: (value: any) => void, reject: (error: Error) => void) => {
        setTimeout(() => reject(new Error(`Query ${selector} timed out`)), options.timeout);
    };

    return Promise.race([new Promise(detect), new Promise(abort)]);
}

export function dispatchClick(element: Element | HTMLElement) {
    if ('click' in element) {
        element.click();
    }
    else {
        const event = new MouseEvent('click');
        element.dispatchEvent(event);
    }
}

export type SelectElement<A> = (args: A) => Element | null;

type ElementSelector<A> = Record<string, string | SelectElement<A>>;

export type SelectContext<S extends ElementSelector<A>, A = void> = { [K in keyof S]: HTMLElement | null };

export function selectElementContext<S extends ElementSelector<A>, A>(selectors: S, args: A): SelectContext<S, A> {
    const context = {} as any;
    for (const [key, selector] of Object.entries(selectors)) {
        if (typeof selector === 'string') {
            const element = document.querySelector(selector.replace(/!$/, ''));
            if (selector.endsWith('!') && !element) {
                throw new Error(`Unable to find required element "${selector}"`);
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            context[key as keyof S] = element;
        }
        else {
            const element = selector(args);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            context[key as keyof S] = element;
        }
    }
    return context as SelectContext<S, A>;
}

export function injectStyle(strings: TemplateStringsArray, ...values: any[]) {
    const parts: string[] = [];
    for (let i = 0; i < strings.length; i++) {
        parts.push(strings[i]);
        if (i < values.length) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            parts.push(values[i]);
        }
    }

    const element = document.createElement('style');
    element.textContent = parts.join('').trim();
    element.setAttribute('data-source', 'south-plus-kit');
    document.head.appendChild(element);
}

export function registerGlobalShortcut(key: string, listener: () => void) {
    document.addEventListener(
        'keyup',
        e => {
            if (e.key === key) {
                listener();
            }
        }
    );
}
