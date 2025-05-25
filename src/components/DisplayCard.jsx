function DisplayCard({ drawnCard }) {
  if (!drawnCard) {
    return null;
    }
    
    
  return (
    <>
      <div className="drawnCardContainer">
        <p className="drawnCardLabel">Last Card Drawn:</p>
        <img
          src={drawnCard.image}
          alt={`${drawnCard.value} of ${drawnCard.suit}`}
          className="cardImage"
          height={300}
        />
      </div>
    </>
  );
}

export default DisplayCard;
