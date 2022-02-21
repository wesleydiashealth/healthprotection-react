export default function ConvertLangToRegion(lang = 'en'): string {
  switch (lang) {
    case 'en':
      return 'com';

    case 'es':
      return 'es';

    case 'pt-br':
      return 'com.br';

    case 'it':
      return 'it';

    default:
      return 'com';
  }
}
