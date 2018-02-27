export default function ({store, redirect}) {
    if (store.state.user.user) {
        return redirect('/dashboard')
    }
}
