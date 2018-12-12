export function name_from_status(status) {
    try {
        return ["SCHEDULING", "PREPARING", "ACTIVE", "ENDED"][status];
    } catch(e) {
        return '';
    }
}
