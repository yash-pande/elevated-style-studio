import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronDown, Heart, Leaf, Menu, Search, ShoppingBag, Sparkles, X, Trash2, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { collections, products, formatPrice, type Product, type Size } from '@/lib/catalog';

type BagItem = { product: Product; size: Size; quantity: number };
type Panel = 'search' | 'saved' | 'bag' | 'menu' | null;
type ShopState = { saved: string[]; toggleSaved: (slug:string) => void; bag: BagItem[]; addToBag:(product:Product,size:Size)=>void; setPanel:(panel:Panel)=>void; updateQuantity:(slug:string,size:Size,change:number)=>void };
const ShopContext = createContext<ShopState | null>(null);
export function useShop() { const context=useContext(ShopContext); if (!context) throw new Error('Shop context is missing'); return context; }
export function Brand({ header = false }: { header?:boolean }) {
  return <Link to="/" className={`brand ${header ? 'header-brand' : ''}`} aria-label="Yamini Studio home"><img src="/favicon.svg" className="brand-emblem" width={29} height={29} alt=""/><span className="brand-name">Y A M I N I</span><span className="brand-subtitle">S T U D I O</span></Link>;
}
export function ShopShell({children}:{children:ReactNode}) {
  const [saved,setSaved]=useState<string[]>([]);
  const [bag,setBag]=useState<BagItem[]>([]);
  const [panel,setPanel]=useState<Panel>(null);
  const [search,setSearch]=useState('');
  function toggleSaved(slug:string) { setSaved(previous=>previous.includes(slug)?previous.filter(s=>s!==slug):[...previous,slug]); }
  function addToBag(product:Product,size:Size) { setBag(previous=> { const existing=previous.find(i=>i.product.slug===product.slug && i.size===size); return existing?previous.map(i=>i===existing?{...i,quantity:i.quantity+1}:i):[...previous,{product,size,quantity:1}]; }); setPanel('bag'); }
  function updateQuantity(slug:string,size:Size,change:number) { setBag(previous=>previous.map(i=>i.product.slug===slug&&i.size===size?{...i,quantity:i.quantity+change}:i).filter(i=>i.quantity>0)); }
  const count=bag.reduce((sum,i)=>sum+i.quantity,0);
  return <ShopContext.Provider value={{saved,toggleSaved,bag,addToBag,setPanel,updateQuantity}}>
    <header className="site-header">
      <div className="page-width header-main">
        <div className="header-note">Indian heritage · Brazilian spirit</div>
        <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Open collection menu" onClick={()=>setPanel('menu')}><Menu/></Button>
        <Brand header/>
        <div className="header-tools sm:ml-auto">
          <Button variant="ghost" size="icon" aria-label="Search products" title="Search" onClick={()=>setPanel('search')}><Search/></Button>
          <Button variant="ghost" size="icon" className="saved-tool" aria-label="Saved pieces" title="Saved pieces" onClick={()=>setPanel('saved')}><Heart/>{saved.length>0&&<span className="text-[9px]">{saved.length}</span>}</Button>
          <Button variant="ghost" size="icon" aria-label={`Shopping bag, ${count} items`} title="Shopping bag" onClick={()=>setPanel('bag')}><ShoppingBag/>{count>0&&<span className="text-[9px]">{count}</span>}</Button>
        </div>
      </div>
      <nav className="nav-row" aria-label="Collections">
        {collections.map(c=> <Link key={c.slug} to="/collections/$collection" params={{collection:c.slug}} className="nav-link">{c.name}{!c.available&&<span className="nav-soon"> · Yet to come</span>}</Link>)}
      </nav>
    </header>
    {children}
    <footer className="site-footer"><div className="page-width"><div className="footer-main"><Brand/><p className="footer-motto">Indian textiles. Brazilian sensibility.</p><Link to="/" className="eyebrow flex items-center gap-3">Explore the collection <ArrowRight size={14}/></Link></div><div className="footer-bottom"><span>© 2026 Yamini Studio · Yamini Fashion House</span><span>Rooted in heritage. Made for new stories.</span></div></div></footer>
    {panel&&<SidePanel title={panel==='search'?'Find your piece':panel==='saved'?'Saved pieces':panel==='bag'?`Your bag (${count})`:'Collections'} onClose={()=>setPanel(null)}>
      {panel==='menu'&&<div className="flex flex-col gap-6">{collections.map(c=><Link key={c.slug} to="/collections/$collection" params={{collection:c.slug}} onClick={()=>setPanel(null)} className="font-display text-2xl">{c.name}{!c.available&&<span className="ml-2 font-sans text-xs text-muted-foreground">Yet to come</span>}</Link>)}</div>}
      {panel==='search'&&<><input autoFocus className="search-input" aria-label="Search the collection" placeholder="Search dresses, fabrics, colours…" value={search} onChange={e=>setSearch(e.target.value)}/><p className="eyebrow text-muted-foreground mt-7">{search?'Matching pieces':'Discover the collection'}</p>{products.filter(p=>`${p.name} ${p.fabric} ${p.color}`.toLowerCase().includes(search.toLowerCase())).map(p=><PanelProduct key={p.slug} product={p} onNavigate={()=>setPanel(null)}/>)}{!products.some(p=>`${p.name} ${p.fabric} ${p.color}`.toLowerCase().includes(search.toLowerCase()))&&<p className="panel-empty">No pieces found.<br/>Try cotton, silk, or a colour.</p>}</>}
      {panel==='saved'&&<>{saved.length===0?<p className="panel-empty">Your favourite pieces will find a home here.</p>:products.filter(p=>saved.includes(p.slug)).map(p=><PanelProduct key={p.slug} product={p} onNavigate={()=>setPanel(null)} action={<Button variant="ghost" size="icon" aria-label={`Remove ${p.name} from saved pieces`} onClick={()=>toggleSaved(p.slug)}><X/></Button>}/>)}</>}
      {panel==='bag'&&<>{bag.length===0?<><p className="panel-empty">Your bag is waiting for something beautiful.</p><Button variant="outline" className="w-full rounded-none" onClick={()=>setPanel(null)}>Continue exploring <ArrowRight/></Button></>:<>{bag.map(item=><PanelProduct key={`${item.product.slug}-${item.size}`} product={item.product} onNavigate={()=>setPanel(null)} action={<Button variant="ghost" size="icon" aria-label={`Remove ${item.product.name}`} onClick={()=>updateQuantity(item.product.slug,item.size,-item.quantity)}><Trash2/></Button>}><p className="text-[10px] text-muted-foreground mt-2">{item.product.color} · Size {item.size}</p><div className="flex items-center gap-3 mt-2"><Button variant="outline" size="icon" className="h-7 w-7 rounded-none" aria-label={`Decrease ${item.product.name} quantity`} onClick={()=>updateQuantity(item.product.slug,item.size,-1)}><Minus/></Button><span className="text-xs">{item.quantity}</span><Button variant="outline" size="icon" className="h-7 w-7 rounded-none" aria-label={`Increase ${item.product.name} quantity`} onClick={()=>updateQuantity(item.product.slug,item.size,1)}><Plus/></Button></div></PanelProduct>)}<div className="flex justify-between py-6 text-sm"><span>Subtotal</span><span>{formatPrice(bag.some(item=>item.product.price===null)?null:bag.reduce((sum,item)=>sum+(item.product.price ?? 0)*item.quantity,0))}</span></div><p className="text-xs text-muted-foreground leading-6 border-t pt-5">A preview of the collection. Online checkout is not yet available.</p><Button variant="outline" className="w-full rounded-none mt-5" onClick={()=>setPanel(null)}>Continue exploring <ArrowRight/></Button></>}</>}
    </SidePanel>}
  </ShopContext.Provider>;
}
function PanelProduct({product,onNavigate,action,children}:{product:Product;onNavigate:()=>void;action?:ReactNode;children?:ReactNode}) {
 return <div className="panel-item"><Link to="/products/$product" params={{product:product.slug}} onClick={onNavigate}><img src={product.image} width={85} height={125} alt={product.name}/></Link><div className="flex-1"><Link to="/products/$product" params={{product:product.slug}} onClick={onNavigate}><h3>{product.name}</h3></Link><p className="text-xs">{formatPrice(product.price)}</p>{children}</div>{action}</div>;
}
export function SidePanel({title,onClose,children}:{title:string;onClose:()=>void;children:ReactNode}) {
 useEffect(()=>{ const old=document.body.style.overflow; document.body.style.overflow='hidden'; const handler=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();};document.addEventListener('keydown',handler);return()=>{document.body.style.overflow=old;document.removeEventListener('keydown',handler);};},[onClose]);
 return <div className="modal-backdrop" onClick={onClose}><section className="side-panel" role="dialog" aria-modal="true" aria-label={title} onClick={e=>e.stopPropagation()}><div className="panel-heading"><h2>{title}</h2><Button variant="ghost" size="icon" aria-label="Close panel" onClick={onClose}><X/></Button></div>{children}</section></div>;
}
export function CraftStrip() { return <div className="craft-strip"><div className="craft-item"><Sparkles/><div><h3>Indian craftsmanship</h3><p>A story in every thread</p></div></div><div className="craft-item"><Leaf/><div><h3>Beautiful, natural fabrics</h3><p>Chosen for character and comfort</p></div></div><div className="craft-item"><ShoppingBag/><div><h3>A considered wardrobe</h3><p>Pieces to return to, season after season</p></div></div></div>; }
export function ProductCard({product,index=1}:{product:Product;index?:number}) {
 const {saved,toggleSaved}=useShop(); const isSaved=saved.includes(product.slug);
 return <article className="product-card"><div className="product-image-wrap"><Link to="/products/$product" params={{product:product.slug}} aria-label={`View ${product.name}`}><img className="product-image" src={product.image} width={1024} height={1536} alt={`${product.name} in ${product.color}`} loading={index===0?'eager':'lazy'}/><span className="card-discover">Discover the piece <ArrowRight size={13}/></span></Link><span className="product-tag">{product.tag}</span><Button variant="ghost" size="icon" className="favorite-button" aria-label={`${isSaved?'Unsave':'Save'} ${product.name}`} aria-pressed={isSaved} onClick={()=>toggleSaved(product.slug)}><Heart className={isSaved?'fill-gold text-gold':''} size={15}/></Button></div><div className="product-info"><p className="product-fabric">{product.fabric}</p><Link to="/products/$product" params={{product:product.slug}}><h2 className="product-name">{product.name}</h2></Link><div className="flex justify-between items-center"><p className="product-price">{formatPrice(product.price)}</p><span className={`color-dot swatch-${product.swatch}`} title={product.color}/></div></div></article>;
}
