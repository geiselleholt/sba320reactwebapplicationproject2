import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="pageContainer">
        <h2 className="rulesTitle">Game Rules & Payouts</h2>
        <div className="rulesContent">
          <p>
            Welcome to the Card Bet Challenge! You start with a balance of $100.
          </p>
          <p>
            Your goal is to increase your balance by betting on the next card
            drawn from a standard 52-card deck.
          </p>
          <p>
            Each time you draw a card, one card is removed from the deck. When
            the deck runs out, you can start a new game.
          </p>

          <h3 className="rulesSubtitle">How to Play:</h3>
          <ul className="rulesList">
            <li>Enter your desired Bet Amount</li>
            <li>Select a Bet Type ex: Red or Black, Face Card</li>
            <li>
              Select a specific Bet Value based on your chosen type ex:"RED",
              "YES", "HEARTS", "ACE"
            </li>
            <li>
              Click "Draw Card" to reveal the next card and see if you won!
            </li>
          </ul>

          <h3 className="rulesSubtitle">Payouts:</h3>
          <p>
            Payouts are proportional to the odds of winning in each category:
          </p>
          <ul className="payoutsList">
            <li>Red or Black: 2x your bet</li>
            <li>Face Card: 4x your bet</li>
            <li>Specific Suit: 4x your bet</li>
            <li>Specific Card: 13x your bet</li>
          </ul>

          <p>🍀 Good luck, 😁 Have fun, and 🫡 Play Responsibily!</p>
        </div>

        <button onClick={() => navigate("/game")} className="backToGameButton">
          Play
        </button>
      </div>
    </>
  );
}

export default RulesPage;
