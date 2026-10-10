import { createFileRoute, notFound } from '@tanstack/react-router';
import { ProductPage } from '@/components/shop/product-page';
import { products, pageHead } from '@/lib/catalog';
export const Route = createFileRoute('/products/$product')({
 loader: ({params})=> { const product=products.find(p=>p.slug===params.product); if(!product)throw notFound(); return product; },
 head: ({loaderData})=>pageHead(loaderData?.name??'Piece unavailable',loaderData?.description??'Explore the Yamini Studio collection.'),
 component: ProductDetail,
});
function ProductDetail() { const product=Route.useLoaderData();return <ProductPage key={product.slug} product={product}/>; }
