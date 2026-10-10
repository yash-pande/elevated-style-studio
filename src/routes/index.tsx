import { createFileRoute } from '@tanstack/react-router';
import { CollectionPage } from '@/components/shop/collection-page';
import { pageHead } from '@/lib/catalog';
export const Route = createFileRoute('/')({
 head: () => pageHead('The Collection', 'Discover Yamini Studio’s midi dresses, maxi dresses and beachwear. Indian textile heritage meets contemporary Brazilian living.'),
 component: Index,
});
function Index() { return <CollectionPage/>; }
