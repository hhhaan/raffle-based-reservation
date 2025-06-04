// app/restaurants/[id]/page.tsx
import { RestaurantDetailScreen } from '@/src/screens';

export default function RestaurantPage({ params }: { params: { id: string } }) {
    return <RestaurantDetailScreen id={params.id} />;
}
