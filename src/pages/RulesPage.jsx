import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="pageContainer">
        <h2 className="rulesTitle">Game Rules & Payouts</h2>
        <div className="rulesContent">
          <h3 className="rulesSubtitle">Rules:</h3>
          <ul className="rulesList">
            <li>You start with a balance of $100</li>
            <li>
              Your goal is to increase your balance by betting on the next card
              drawn from a standard 52-card deck
            </li>
            <li>
              Each time you draw a card, one card is removed from the deck.
            </li>
            <li>
              As the deck runs out, if you have a good memory, you'll have a
              better chance of guessing the next card.
            </li>
          </ul>

          <h3 className="rulesSubtitle">How to Play:</h3>
          <ul className="rulesList">
            <li>Enter your desired Bet Amount</li>
            <li>Select a Bet Type ex: Red or Black, Face Card</li>
            <li>
              Select a specific Bet Value based on your chosen type ex:"RED", "YES", "HEARTS", "ACE"
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
          <p>If you have a gambling addiction, play this game as much as you want to scratch that itch.</p>
          <p>Or reach out to:</p>
          <a href="https://www.ncpgambling.org/help-treatment">800-GAMBLER</a>
        </div>

        <button onClick={() => navigate("/game")} className="backToGameButton">
          Play
        </button>
      </div>
    </>
  );
}

export default RulesPage;
