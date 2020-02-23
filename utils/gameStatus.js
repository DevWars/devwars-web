export default function nameFromStatus(status) {
  return ['SCHEDULED', 'ACTIVE', 'ENDED'][status];
}
