import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="rulesContainer">
        <h2 className="rulesTitle">Game Rules & Payouts</h2>
        <div className="rules">
          <section>
            <h3>How to Play:</h3>
            <ul>
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
          </section>
                    <section>
            <h3>Payouts:</h3>
            <p>
              Payouts are proportional to the odds of winning:
            </p>
            <ul>
              <li>Red or Black: 2x your bet</li>
              <li>Face Card: 4x your bet</li>
              <li>Card Suit: 4x your bet</li>
              <li>Card Type: 13x your bet</li>
            </ul>
          </section>
          <section>
            <h3>Rules:</h3>
            <ul>
              <li>You start with a balance of $100</li>
              <li>
                Your goal is to get thru the entire deck without busting your
                bank
              </li>
              <li>
                Try to increase your balance by betting on the next card drawn
                from a standard 52-card deck
              </li>
              <li>
                Each time you draw a card, it is removed from the deck
              </li>
              <li>
                As the deck runs out, if you have a good memory, you'll have a
                better chance of guessing the next card
              </li>
            </ul>
          </section>

        </div>
        <section className="rulesLowerSection">
          <p>😁 Have fun 🍀 Good luck 🫡 Play Responsibily!</p>
          <p>
            If you have a gambling addiction, play this game as much as you want
            to scratch that itch.
          </p>
          <p>
            Or reach out to:{" "}
            <a href="https://www.ncpgambling.org/help-treatment">800-GAMBLER</a>
          </p>
        </section>
      </div>
      <button onClick={() => navigate("/game")} className="backToGameButton">
        Play
      </button>
    </>
  );
}

export default RulesPage;
