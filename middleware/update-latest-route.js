export default function({ isClient, route }) {
  if (isClient) {
    // Client side we'll grab the most recent path from local storage
    window.localStorage.setItem('latestRoute', route.fullPath)
  }
}
