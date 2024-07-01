export default function isMobileDevice() {
  if (typeof navigator !== "undefined") {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  return false;
}
