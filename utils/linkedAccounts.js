export default function userHasProvider(links, provider) {
    return links && links.some((it) => it.provider === provider);
}
