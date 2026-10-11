import { describe, expect, it } from 'vitest';
import { collections, products, canAddToBag, filterProducts } from '@/lib/catalog';

describe('Collection requirements', () => {
  it('keeps exactly four collection categories', () => {
    expect(collections.map(c => c.slug)).toEqual(['maxi-dresses', 'midi-dresses', 'mini-dresses', 'mayamini']);
  });
  it('keeps Mayamini unavailable until launch', () => {
    expect(collections.find(c => c.slug === 'mayamini')?.available).toBe(false);
    expect(products.filter(p => p.category === 'mayamini')).toHaveLength(0);
  });
  it('removes beachwear and bags and accessories', () => {
    expect(collections.some(c => ['beachwear', 'bags-accessories'].includes(c.slug))).toBe(false);
    expect(products.filter(p => ['beachwear', 'bags-accessories'].includes(p.category))).toHaveLength(0);
  });
});
describe('Catalogue interactions', () => {
  it('moves Aurelia into the Mini section', () => {
    expect(products.find(p=>p.slug==='aurelia-floral-midi')?.category).toBe('mini-dresses');
    expect(products.find(p=>p.slug==='aurelia-floral-midi')?.gallery).toHaveLength(6);
  });
  it('adds the uploaded royal-blue dress to Midi', () => {
    expect(products.filter(p=>p.category==='midi-dresses').map(p=>p.slug)).toEqual(['indira-royal-blue-midi']);
    expect(products.find(p=>p.slug==='indira-royal-blue-midi')?.gallery).toHaveLength(4);
  });
  it('adds the uploaded botanical dress to Maxi', () => {
    expect(products.filter(p=>p.category==='maxi-dresses').map(p=>p.slug)).toEqual(['neelam-botanical-maxi']);
    expect(products.find(p=>p.slug==='neelam-botanical-maxi')?.gallery).toHaveLength(6);
  });
  it('requires a valid size before adding a piece', () => {
    expect(canAddToBag('')).toBe(false);
    expect(canAddToBag('M')).toBe(true);
    expect(canAddToBag('unknown')).toBe(false);
  });
  it('filters by selected fabric', () => {
    expect(filterProducts(products, ['Floral print · Smocked bodice'], [], 'featured').map(p => p.slug)).toEqual(['aurelia-floral-midi']);
  });
  it('sorts prices in ascending order', () => {
    const items = [{...products[0], price: 520}, {...products[1], price: 300}, {...products[2], price: null}];
    expect(filterProducts(items, [], [], 'price-low').map(p => p.price)).toEqual([300, 520, null]);
  });
});