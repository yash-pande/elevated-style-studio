import botanical from '@/assets/midi-botanical.jpg';
import rose from '@/assets/midi-rose.jpg';
import sage from '@/assets/maxi-sage.jpg';
import kaftan from '@/assets/beach-kaftan.jpg';

export const collections = [
  { slug: 'midi-dresses', name: 'Midi Dresses', description: 'Considered silhouettes, beautiful fabrics. Midi dresses that move effortlessly from quiet mornings to golden evenings.', available: true },
  { slug: 'maxi-dresses', name: 'Maxi Dresses', description: 'Long, flowing silhouettes with a quiet presence. Indian textiles, reimagined for the rhythm of Brazilian living.', available: true },
  { slug: 'beachwear', name: 'Beachwear', description: 'For sunlit days and an unhurried pace. Airy cotton, artisan prints, and a little freedom in every fold.', available: true },
  { slug: 'bags-accessories', name: 'Bags & Accessories', description: 'A new chapter in Indian craftsmanship. Thoughtful finishing touches, coming in their own time.', available: false },
] as const;
export const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const;
export type Size = typeof sizes[number];
export type Product = {
  slug: string; name: string; category: string; price: number; fabric: string;
  color: string; swatch: string; image: string; tag: string; description: string;
};
export const products: Product[] = [
  { slug: 'anaya-botanical-midi', name: 'Anaya Botanical Midi', category: 'midi-dresses', price: 680, fabric: 'Hand-block printed cotton', color: 'Ivory & sage', swatch: 'sage', image: botanical, tag: 'Artisan print', description: 'A little garden, carried with you. Delicate botanical motifs meet a softly gathered silhouette, with a fitted bodice and an airy midi-length skirt. A piece for slow days and beautiful, ordinary moments.' },
  { slug: 'tara-silk-midi', name: 'Tara Silk Midi', category: 'midi-dresses', price: 890, fabric: 'Handwoven silk', color: 'Dusty rose', swatch: 'rose', image: rose, tag: 'Handwoven silk', description: 'Quietly luminous silk, in a soft shade of rose. Tara pairs a clean, delicate neckline with an easy flowing skirt, letting the character of the fabric speak for itself.' },
  { slug: 'meera-woven-maxi', name: 'Meera Woven Maxi', category: 'maxi-dresses', price: 940, fabric: 'Handwoven cotton', color: 'Olive sage', swatch: 'sage', image: sage, tag: 'The signature piece', description: 'A flowing silhouette with an understated golden finish. Meera brings the texture of Indian handwoven cotton into a long, graceful dress, made for movement and a sense of ease.' },
  { slug: 'leela-printed-kaftan', name: 'Leela Printed Kaftan', category: 'beachwear', price: 520, fabric: 'Block-printed cotton', color: 'Ivory & terracotta', swatch: 'terracotta', image: kaftan, tag: 'Sunlit essentials', description: 'Light, open, and effortlessly relaxed. Warm terracotta botanicals trace an ivory cotton kaftan, with an adjustable waist and a flowing shape inspired by days beside the sea.' },
];
export function formatPrice(value: number) { return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value); }
export function filterProducts(items: Product[], fabrics: string[], selectedSizes: string[], sort: string) {
  const filtered = items.filter(p => (!fabrics.length || fabrics.includes(p.fabric)) && (!selectedSizes.length || selectedSizes.some(s => sizes.some(size => size === s))));
  if (sort === 'price-low') return [...filtered].sort((a,b) => a.price-b.price);
  if (sort === 'price-high') return [...filtered].sort((a,b) => b.price-a.price);
  if (sort === 'name') return [...filtered].sort((a,b) => a.name.localeCompare(b.name));
  return filtered;
}
export function canAddToBag(size: string): size is Size { return sizes.some(item => item === size); }
export function pageHead(title: string, description: string) {
  return { meta: [ { title: `${title} — Yamini Studio` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — Yamini Studio` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' } ] };
}
