export default function userHasProvider(links, provider) {
    if (!links.some) {
        return false;
    }
    return links && links.some((it) => it.provider === provider);
}
