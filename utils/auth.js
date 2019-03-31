export const roles = {
    moderator: 'MODERATOR',
    admin: 'ADMIN',
    user: 'USER',
    pending: 'PENDING',
};

export const isAuthorized = (userRole, roles = ['USER']) =>
    roles.find((e) => userRole === e);
