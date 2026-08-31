import type { OfferCardProps } from '../types/OfferCardProps';
import Card from './Card';

function OfferCard({ title, description, image }: OfferCardProps) {
     
     return(
          <Card>
               <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg mb-3" />
               <h3 className="text-lg font-medium text-ink mb-1">{title}</h3>
               <p className="text-sm text-slate">{description}</p>
          </Card>
     )
}

export default OfferCard;