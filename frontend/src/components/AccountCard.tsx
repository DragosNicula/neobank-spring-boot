import type { AccountCardProps } from '../types/AccountCardProps';

function AccountCard({ currency, iban, sold }: AccountCardProps) {
     return (
          <div>
               <h3>Currency: {currency}</h3>
               <h3>Iban: {iban}</h3>
               <h3>Sold: {sold}</h3>
          </div>
     )
}

export default AccountCard;