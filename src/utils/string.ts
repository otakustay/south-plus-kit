const SPLIT_REGEX = /[[\]()【】+_\-.・!\s]/;

export function mostSimilar(from: string[], to: string) {
    const toTokens = to.split(SPLIT_REGEX).filter(v => v.length > 1);
    const state = {
        max: 0,
        value: '',
    };
    for (const value of from) {
        if (value === to) {
            return value;
        }

        const fromTokens = value.split(SPLIT_REGEX).filter(v => v.length > 1);
        const intersected = toTokens.filter(v => fromTokens.includes(v));
        const similarity = intersected.length / toTokens.length;
        if (similarity > state.max) {
            state.max = similarity;
            state.value = value;
        }
    }
    return state.value;
}
