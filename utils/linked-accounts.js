export const user_has_provider = (links, provider) => {
    return links && links.some(it => it.provider === provider);
};
