export default function({store, redirect}) {
    let user = store.state.user.user;

    if(user && user.role === "PENDING") {
        redirect('/pending');
    }
}
