export default function GetAmazonTag(region = 'com'): string {
  switch (region) {
    case 'com':
      return 'healthprote05-20';

    case 'es':
      return 'healthprote04-21';

    default:
      return 'healthprote05-20';
  }
}
