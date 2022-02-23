export default function GetSubdomain(): string {
  const parts = window.location.hostname.split('.');

  let lastIndex = -3;
  const last = parts[parts.length - 1];
  const isLocalhost = last === 'localhost';
  if (isLocalhost) {
    lastIndex = -1;
  }

  const subdomain = parts.slice(0, lastIndex).join();

  return subdomain || 'en';
}
