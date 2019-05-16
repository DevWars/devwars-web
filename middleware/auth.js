import { isAuthorized } from '../utils/auth';

export default ({ store, route, redirect, error }) => {
    route.meta.map((meta) => {
        let auth = [];
        if (meta.auth) {
            if (!store.state.user.user) return redirect('/login');

            const role = store.state.user.user.role || 'PENDING';

            if (typeof meta.auth === 'string') auth.push(meta.auth);
            else auth = meta.auth;
            

            const ok = isAuthorized(role, auth);

            if (!ok && meta.redirectIfNot) return redirect(meta.redirectIfNot);
            if(!ok) {
                return error({
                    statusCode: 401,
                    message: 'What you trying',
                });
            }
        }

        if (meta.noAuth && store.state.user.user) return redirect('/dashboard');
    });
};
