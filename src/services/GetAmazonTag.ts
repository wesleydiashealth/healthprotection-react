export default function GetAmazonTag(region = 'com'): string {
  switch (region) {
    case 'com':
      return 'healthprote09-20';

    case 'es':
      return 'healthprote04-21';

    default:
      return 'healthprote09-20';
  }
}
