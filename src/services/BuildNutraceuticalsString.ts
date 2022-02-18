import { useApp } from 'contexts/app';

export default function BuildNutraceuticalsString(slugs: string[]): string {
  const context = useApp();
  const { nutraceuticals } = context;

  const titles = slugs.map(
    slug =>
      nutraceuticals.find(nutraceutical => nutraceutical.slug === slug)?.title,
  );

  const string = titles.join(', ');

  const lastComma = string.lastIndexOf(',');

  return (
    string.slice(0, lastComma) + string.slice(lastComma).replace(',', ' and')
  );
}
