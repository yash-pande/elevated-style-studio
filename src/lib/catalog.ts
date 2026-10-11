import midi4 from '@/assets/indira-midi-4.png.asset.json';
import midi2 from '@/assets/indira-midi-2.png.asset.json';
import midi3 from '@/assets/indira-midi-3.png.asset.json';
import midi6 from '@/assets/indira-midi-6.png.asset.json';
import maxi1 from '@/assets/neelam-maxi-1.png.asset.json';
import maxi2 from '@/assets/neelam-maxi-2.png.asset.json';
import maxi3 from '@/assets/neelam-maxi-3.png.asset.json';
import maxi4 from '@/assets/neelam-maxi-4.png.asset.json';
import maxi5 from '@/assets/neelam-maxi-5.png.asset.json';
import maxi6 from '@/assets/neelam-maxi-6.png.asset.json';
import floral1 from '@/assets/aurelia-floral-1.png.asset.json';
import floral2 from '@/assets/aurelia-floral-2.png.asset.json';
import floral3 from '@/assets/aurelia-floral-3.png.asset.json';
import floral4 from '@/assets/aurelia-floral-4.png.asset.json';
import floral5 from '@/assets/aurelia-floral-5.png.asset.json';
import floral6 from '@/assets/aurelia-floral-6.png.asset.json';

export const collections = [
  { slug: 'maxi-dresses', name: 'Maxi Dress', description: 'Flowing silhouettes, expressive prints, and thoughtful details. Discover our Maxi Dress collection.', available: true },
  { slug: 'midi-dresses', name: 'Midi Dress', description: 'Beautifully balanced silhouettes with a story in every detail. Discover our Midi Dress collection.', available: true },
  { slug: 'mini-dresses', name: 'Mini Dress', description: 'Fresh silhouettes and playful details. Discover our Mini Dress collection.', available: true },
  { slug: 'mayamini', name: 'Mayamini', description: 'A new chapter is taking shape. Mayamini is launching soon.', available: false },
] as const;
export const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const;
export type Size = typeof sizes[number];
export type Product = {
  slug: string; name: string; category: string; price: number | null; fabric: string;
  color: string; swatch: string; image: string; tag: string; description: string;
  gallery?: { image: string; label: string; contain?: boolean }[]; details?: string;
};
export const products: Product[] = [
  { slug: 'aurelia-floral-midi', name: 'Aurelia Floral Mini', category: 'mini-dresses', price: null, fabric: 'Floral print · Smocked bodice', color: 'Ivory & yellow', swatch: 'ivory', image: floral1.url, tag: 'New in', description: 'A sunlit floral dress with delicate yellow blossoms and soft green leaves on an ivory ground. Tie-up shoulder straps frame a square neckline, while a smocked bodice opens into a softly gathered, tiered skirt.', details: 'Adjustable tie-up shoulder straps. Square neckline. Smocked front and back bodice. Gathered waist and tiered skirt with a ruffled hem. Yellow floral print with green foliage on ivory. Fabric composition, garment measurements, and care instructions are awaiting confirmation.', gallery: [
    { image: floral1.url, label: 'Front view' },
    { image: floral2.url, label: 'Side view' },
    { image: floral3.url, label: 'Back view' },
    { image: floral4.url, label: 'Alternate front view' },
    { image: floral5.url, label: 'Design & construction', contain: true },
    { image: floral6.url, label: 'Shoulder tie & smocking detail', contain: true },
  ] },
  { slug: 'indira-royal-blue-midi', name: 'Indira Royal Blue Midi', category: 'midi-dresses', price: null, fabric: 'Gold motifs · Ornate border', color: 'Royal blue & gold', swatch: 'royal-blue', image: midi4.url, tag: 'New in', description: 'A royal-blue dress scattered with delicate gold motifs. A fitted sleeveless bodice and scoop neckline meet a gathered skirt, finished with an ornate gold-toned border and colourful decorative accents.', details: 'Sleeveless silhouette. Scoop front neckline and low scoop back. Fitted bodice with a gathered waist and back tie bow. Full skirt with small gold motifs and an ornate multicoloured hem border. Fabric composition, garment measurements, and care instructions are awaiting confirmation.', gallery: [
    { image: midi4.url, label: 'Front view' },
    { image: midi2.url, label: 'Back view' },
    { image: midi3.url, label: 'Side view' },
    { image: midi6.url, label: 'Alternate front view' },
  ] },
  { slug: 'neelam-botanical-maxi', name: 'Neelam Botanical Maxi', category: 'maxi-dresses', price: null, fabric: 'Botanical print · Ruffled shoulders', color: 'Blue & white', swatch: 'botanical-blue', image: maxi2.url, tag: 'New in', description: 'Blue and white botanical motifs bring a fresh rhythm to this flowing dress. Ruffled shoulders frame a scoop neckline, while a gathered waist leads into a full skirt with a softly ruffled lower tier.', details: 'Ruffled shoulder straps. Scoop front neckline and low scoop back. Fitted bodice and gathered waist. Blue and white botanical print. Full skirt with a gathered ruffle tier at the hem. Fabric composition, garment measurements, and care instructions are awaiting confirmation.', gallery: [
    { image: maxi2.url, label: 'Front view' },
    { image: maxi1.url, label: 'Alternate front view' },
    { image: maxi3.url, label: 'Side view' },
    { image: maxi4.url, label: 'Back view' },
    { image: maxi5.url, label: 'Fabric & construction details', contain: true },
    { image: maxi6.url, label: 'Design & construction', contain: true },
  ] },
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
