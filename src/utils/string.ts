export function isSimilar(from: string, to: string, threshold: number) {
    const fromTokens = from.split(/\[\]\(\)【】+_-.・!\s/).filter(v => v.length > 1);
    const toTokens = from.split(/\[\]\(\)【】+_-.・!\s/).filter(v => v.length > 1);
    const intersected = toTokens.filter(v => fromTokens.includes(v));
    return intersected.length / toTokens.length >= threshold;
}
