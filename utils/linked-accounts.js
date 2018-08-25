export const user_has_provider = (user, provider) => {
    return user && user.linked_accounts && user.linked_accounts.some(it => it.provider === provider);
};
