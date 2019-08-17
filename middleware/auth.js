import { isAuthorized, sameRole } from '../utils/auth';
// import { isAuthorized } from '../utils/auth';

export default ({ store, route, redirect, error }) => {
    route.meta.map((meta) => {
        if (meta.auth) {
            if (!store.state.user.user) return redirect('/login');

            const role = store.state.user.user.role || 'PENDING';

            if (typeof meta.auth !== 'string')
                return error({
                    statusCode: 500,
                    message: 'meta auth should be a string',
                });

            const ok = isAuthorized(role, meta.auth);

            if (!ok && meta.redirectIfNot) return redirect(meta.redirectIfNot);
            if (!ok) {
                return error({
                    statusCode: 401,
                    message: 'What you trying',
                });
            }

            // Temporarily remove PENDING check
            // if (role === 'PENDING' && route.name !== 'pending') return redirect('/pending');

            if (meta.limit && !sameRole(role, meta.auth)) {
                if (meta.redirectIfNot) return redirect(meta.redirectIfNot);
                return redirect('/');
            }
        }
        if (meta.noAuth && store.state.user.user) return redirect('/dashboard');
    });
};
