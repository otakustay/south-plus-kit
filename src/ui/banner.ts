import {injectStyle} from '../utils/dom.js';

export class Banner {
    private readonly dom;

    static {
        injectStyle`
            .spk-banner {
                position: fixed;
                z-index: 1;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1em;
                height: 2em;
                padding: 0 4em;
                background-color: hsl(358, 96%, 60%);
                color: #fff;
            }
        `;
    }

    constructor() {
        this.dom = document.createElement('div');
        this.dom.className = 'spk-banner';
    }

    add(text: string) {
        const label = document.createElement('span');
        label.className = 'spk-banner-text';
        label.innerText = text;
        this.dom.appendChild(label);
    }

    render() {
        document.body.appendChild(this.dom);
    }
}
