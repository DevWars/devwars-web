export default function ({ store, redirect }) {
    const {user} = store.state.user;

    if (user && user.competitor) {
        return redirect('/competitor/registered');
    }
}
