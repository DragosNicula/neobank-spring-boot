import OfferCard from "../components/OfferCard";
import { offers } from '../data/Offers';

function HomePage() {


     return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
               {offers.map(offer => (
                    <OfferCard key={offer.title} title={offer.title} description={offer.description} image={offer.image} />
               ))}
          </div>

     )
}

export default HomePage;