export default function({ store, redirect }) {
    if (store.getters['user/isCompetitor']) {
        return redirect('/competitor/registered');
    }
}
