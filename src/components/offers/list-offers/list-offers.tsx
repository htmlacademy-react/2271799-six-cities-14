import MemorizedCard from '../card-offer/card-offer';
import { Offer } from '../../../types/offer';

type ListOffersProps = {
  offers: Offer[];
  block: string;
  onCardHover?: (id: string | null) => void;
  size: 'small' | 'large';
}

function ListOffers({ offers, block, onCardHover, size}: ListOffersProps): JSX.Element {

  return (
    <>
      {offers.map((offer) => (
        <MemorizedCard
          key={offer.id}
          block={block}
          size={size}
          onCardHover={onCardHover}
          offer={offer}
        />
      )
      )}
    </>
  );
}

export default ListOffers;
