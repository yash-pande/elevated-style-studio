import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronRight, Grid2X2, LayoutGrid, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { collections, products, filterProducts, sizes } from '@/lib/catalog';
import { CraftStrip, ProductCard, SidePanel } from './storefront';

export function CollectionPage({slug}:{slug?:string}) {
 const collection=collections.find(c=>c.slug===slug);
 const all=!slug;
 const [sort,setSort]=useState('featured');
 const [filtersOpen,setFiltersOpen]=useState(false);
 const [fabrics,setFabrics]=useState<string[]>([]);
 const [selectedSizes,setSelectedSizes]=useState<string[]>([]);
 const [roomy,setRoomy]=useState(false);
 const items=collection?products.filter(p=>p.category===collection.slug):products;
 const shown=filterProducts(items,fabrics,selectedSizes,sort);
 const count=fabrics.length+selectedSizes.length;
 function toggle(value:string,values:string[],set:(items:string[])=>void) { set(values.includes(value)?values.filter(i=>i!==value):[...values,value]); }
 return <main className="page-width"><div className="breadcrumb"><Link to="/">Home</Link><ChevronRight size={10}/>{all?<span>Collections</span>:<><Link to="/">Collections</Link><ChevronRight size={10}/><span>{collection?.name??'Collection not found'}</span></>}</div>
  <section className="collection-intro"><p className="eyebrow text-gold">The Yamini Collection</p><h1 className="collection-title">{all?'The Art of Everyday Elegance':collection?.name??'Collection not found'}</h1><p className="collection-description">{all?'Rooted in Indian craftsmanship. Reimagined for Brazilian living.\nDiscover thoughtful pieces, each with a story woven into its fabric.':collection?.description}</p></section>
  {collection?.available===false?<div className="empty-collection"><p className="font-display text-4xl text-gold">Launching soon</p><p className="text-xs text-muted-foreground">Something beautiful is taking shape.</p><Button variant="outline" asChild className="rounded-none mt-3"><Link to="/">Explore the collection <ArrowRight/></Link></Button></div>:slug&&!collection?<div className="empty-collection"><Button variant="outline" asChild><Link to="/">Back to collections</Link></Button></div>:<>
    <div className="catalog-toolbar"><div className="toolbar-actions"><Button variant="ghost" className="px-0 h-7 font-normal text-[11px]" onClick={()=>setFiltersOpen(true)}><SlidersHorizontal size={14}/> Filter {count>0&&`(${count})`}</Button><span className="text-[10px] text-muted-foreground border-l pl-5">{shown.length} pieces</span></div><div className="toolbar-actions"><label className="sr-only" htmlFor="sort">Sort products</label><select id="sort" value={sort} className="sort-select" onChange={e=>setSort(e.target.value)}><option value="featured">Sort by: Featured</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option><option value="name">Name: A to Z</option></select><div className="layout-tools flex gap-1 border-l pl-4"><Button variant="ghost" size="icon" className={`h-6 w-6 ${roomy?'text-muted-foreground':'text-foreground'}`} aria-label="Four column view" aria-pressed={!roomy} title="Four column view" onClick={()=>setRoomy(false)}><LayoutGrid size={14}/></Button><Button variant="ghost" size="icon" className={`h-6 w-6 ${roomy?'text-foreground':'text-muted-foreground'}`} aria-label="Two column view" aria-pressed={roomy} title="Two column view" onClick={()=>setRoomy(true)}><Grid2X2 size={14}/></Button></div></div></div>
    {count>0&&<div className="flex gap-2 flex-wrap mb-6">{[...fabrics,...selectedSizes].map(value=><Button key={value} variant="outline" size="sm" className="rounded-none font-normal text-[10px]" onClick={()=>fabrics.includes(value)?toggle(value,fabrics,setFabrics):toggle(value,selectedSizes,setSelectedSizes)}>{value}<X size={10}/></Button>)}<Button variant="link" size="sm" className="text-[10px]" onClick={()=>{setFabrics([]);setSelectedSizes([]);}}>Clear all</Button></div>}
    <div className={`products-grid ${roomy?'roomy':''}`}>{shown.map((p,index)=><ProductCard key={p.slug} product={p} index={index}/>)}</div>
    {shown.length===0&&<div className="empty-collection"><p className="font-display text-3xl">No pieces match your selection</p><Button variant="outline" onClick={()=>{setFabrics([]);setSelectedSizes([]);}}>Clear filters</Button></div>}
    <div className="catalog-end"><span>{shown.length===items.length?"You've discovered every piece":`${shown.length} of ${items.length} pieces`}</span><div className="catalog-end-line"/><span className="font-display text-lg italic">A new story for every fabric.</span></div>
  </>}
  {all&&<section className="coming-band"><div><p className="eyebrow text-gold">The next chapter</p><h2>Mayamini</h2><p>Thoughtful details. The same artisan soul.<br/>A new collection, unfolding soon.</p></div><Link to="/collections/$collection" params={{collection:'mayamini'}} className="coming-stamp flex items-center gap-6">Launching soon <ArrowRight size={15}/></Link></section>}
  <CraftStrip/>
  {filtersOpen&&<SidePanel title="Filter the collection" onClose={()=>setFiltersOpen(false)}><div className="filter-section"><h3>Fabric</h3>{Array.from(new Set(items.map(p=>p.fabric))).map(f=><label key={f} className="filter-option"><input type="checkbox" checked={fabrics.includes(f)} onChange={()=>toggle(f,fabrics,setFabrics)}/>{f}</label>)}</div><div className="filter-section"><h3>Size</h3><div className="flex flex-wrap gap-2">{sizes.map(s=><Button key={s} variant="outline" className="size-button" aria-pressed={selectedSizes.includes(s)} onClick={()=>toggle(s,selectedSizes,setSelectedSizes)}>{s}</Button>)}</div></div><Button className="add-button" onClick={()=>setFiltersOpen(false)}>Show {shown.length} pieces <ArrowRight/></Button>{count>0&&<Button variant="link" className="w-full mt-3" onClick={()=>{setFabrics([]);setSelectedSizes([]);}}>Clear filters</Button>}</SidePanel>}
 </main>;
}
