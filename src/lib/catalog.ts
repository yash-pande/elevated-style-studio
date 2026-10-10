import kaftan from '@/assets/beach-kaftan.jpg';
import floral1 from '@/assets/aurelia-floral-1.png.asset.json';
import floral2 from '@/assets/aurelia-floral-2.png.asset.json';
import floral3 from '@/assets/aurelia-floral-3.png.asset.json';
import floral4 from '@/assets/aurelia-floral-4.png.asset.json';
import floral5 from '@/assets/aurelia-floral-5.png.asset.json';
import floral6 from '@/assets/aurelia-floral-6.png.asset.json';

export const collections = [
  { slug: 'midi-dresses', name: 'Midi Dresses', description: 'Considered silhouettes, beautiful fabrics. Midi dresses that move effortlessly from quiet mornings to golden evenings.', available: true },
  { slug: 'maxi-dresses', name: 'Maxi Dresses', description: 'Long, flowing silhouettes with a quiet presence. Indian textiles, reimagined for the rhythm of Brazilian living.', available: true },
  { slug: 'beachwear', name: 'Beachwear', description: 'For sunlit days and an unhurried pace. Airy cotton, artisan prints, and a little freedom in every fold.', available: true },
  { slug: 'bags-accessories', name: 'Bags & Accessories', description: 'A new chapter in Indian craftsmanship. Thoughtful finishing touches, coming in their own time.', available: false },
] as const;
export const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const;
export type Size = typeof sizes[number];
export type Product = {
  slug: string; name: string; category: string; price: number | null; fabric: string;
  color: string; swatch: string; image: string; tag: string; description: string;
  gallery?: { image: string; label: string; contain?: boolean }[]; details?: string;
};
export const products: Product[] = [
  { slug: 'aurelia-floral-midi', name: 'Aurelia Floral Midi', category: 'midi-dresses', price: null, fabric: 'Floral print · Smocked bodice', color: 'Ivory & yellow', swatch: 'ivory', image: floral1.url, tag: 'New in', description: 'A sunlit floral dress with delicate yellow blossoms and soft green leaves on an ivory ground. Tie-up shoulder straps frame a square neckline, while a smocked bodice opens into a softly gathered, tiered skirt.', details: 'Adjustable tie-up shoulder straps. Square neckline. Smocked front and back bodice. Gathered waist and tiered skirt with a ruffled hem. Yellow floral print with green foliage on ivory. Fabric composition, garment measurements, and care instructions are awaiting confirmation.', gallery: [
    { image: floral1.url, label: 'Front view' },
    { image: floral2.url, label: 'Side view' },
    { image: floral3.url, label: 'Back view' },
    { image: floral4.url, label: 'Alternate front view' },
    { image: floral5.url, label: 'Design & construction', contain: true },
    { image: floral6.url, label: 'Shoulder tie & smocking detail', contain: true },
  ] },
  { slug: 'leela-printed-kaftan', name: 'Leela Printed Kaftan', category: 'beachwear', price: 520, fabric: 'Block-printed cotton', color: 'Ivory & terracotta', swatch: 'terracotta', image: kaftan, tag: 'Sunlit essentials', description: 'Light, open, and effortlessly relaxed. Warm terracotta botanicals trace an ivory cotton kaftan, with an adjustable waist and a flowing shape inspired by days beside the sea.' },
];
export function formatPrice(value: number | null) { if (value === null) return 'Price to be confirmed'; return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value); }
export function filterProducts(items: Product[], fabrics: string[], selectedSizes: string[], sort: string) {
  const filtered = items.filter(p => (!fabrics.length || fabrics.includes(p.fabric)) && (!selectedSizes.length || selectedSizes.some(s => sizes.some(size => size === s))));
  if (sort === 'price-low') return [...filtered].sort((a,b) => (a.price ?? Infinity)-(b.price ?? Infinity));
  if (sort === 'price-high') return [...filtered].sort((a,b) => (b.price ?? -Infinity)-(a.price ?? -Infinity));
  if (sort === 'name') return [...filtered].sort((a,b) => a.name.localeCompare(b.name));
  return filtered;
}
export function canAddToBag(size: string): size is Size { return sizes.some(item => item === size); }
export function pageHead(title: string, description: string) {
  return { meta: [ { title: `${title} — Yamini Studio` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — Yamini Studio` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' } ] };
}
