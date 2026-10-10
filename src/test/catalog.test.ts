import { describe, expect, it } from 'vitest';
import { collections, products, canAddToBag, filterProducts } from '@/lib/catalog';

describe('Collection requirements', () => {
  it('keeps exactly four collection categories', () => {
    expect(collections.map(c => c.slug)).toEqual(['midi-dresses', 'maxi-dresses', 'beachwear', 'bags-accessories']);
  });
  it('keeps bags and accessories unavailable', () => {
    expect(collections.find(c => c.slug === 'bags-accessories')?.available).toBe(false);
    expect(products.filter(p => p.category === 'bags-accessories')).toHaveLength(0);
  });
});
describe('Catalogue interactions', () => {
  it('requires a valid size before adding a piece', () => {
    expect(canAddToBag('')).toBe(false);
    expect(canAddToBag('M')).toBe(true);
    expect(canAddToBag('unknown')).toBe(false);
  });
  it('filters by selected fabric', () => {
    expect(filterProducts(products, ['Handwoven silk'], [], 'featured').map(p => p.slug)).toEqual(['tara-silk-midi']);
  });
  it('sorts prices in ascending order', () => {
    expect(filterProducts(products, [], [], 'price-low').map(p => p.price)).toEqual([520, 680, 890, 940]);
  });
});