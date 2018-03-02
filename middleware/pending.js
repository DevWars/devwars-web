export default function({store, redirect, route}) {
    let user = store.state.user.user;

    if(user && user.role === "PENDING" && route.path !== '/pending') {
        redirect('/pending');
    }
}
