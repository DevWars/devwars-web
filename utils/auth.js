export const roles = {
  PENDING: 2,
  USER: 2,
  MODERATOR: 3,
  ADMIN: 4
}

export const names = {
  PENDING: 'PENDING',
  USER: 'USER',
  MODERATOR: 'MODERATOR',
  ADMIN: 'ADMIN'
}

export const isAuthorized = (userRole, miniRole) =>
  roles[userRole] && roles[miniRole] && roles[userRole] >= roles[miniRole]

export const sameRole = (userRole, roleLimited) =>
  names[userRole] === names[roleLimited]
