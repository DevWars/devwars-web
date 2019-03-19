export default function({store, redirect, route}) {
    const {user} = store.state.user;

    if(user && user.role === "PENDING" && route.path !== '/pending') {
        redirect('/pending');
    }
}
