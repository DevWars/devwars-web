export default function nameFromStatus(status) {
    return ['SCHEDULING', 'PREPARING', 'ACTIVE', 'ENDED'][status];
}
