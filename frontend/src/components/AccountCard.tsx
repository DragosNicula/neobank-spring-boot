import type { AccountCardProps } from '../types/AccountCardProps';
import Card from './Card';

function AccountCard({ currency, iban, sold }: AccountCardProps) {
     return (
          <div className="p-4">
               <Card >
                    <p className="text-sm text-slate">{currency} account</p>
                    <p className="text-3xl font-medium text-ink">{sold} {currency}</p>
                    <div className="border-t border-mist pt-2">
                         <p className="text-sm text-slate">{iban}</p>
                    </div>
               </Card>
          </div>

     )
}

export default AccountCard;