function BetForm({
  betAmount,
  betType,
  betValue,
  balance,
  remainingCards,
  isLoading,
  isGameOver,
  dispatch,
  onSubmit,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const suits = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];

  const ranks = [
    "ACE",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
  ];

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label className="betAmount">Bet Amount:</label>
        <input
          type="number"
          id="betAmount"
          value={betAmount}
          onChange={(e) =>
            dispatch({
              type: "SET_BET_AMOUNT",
              payload: parseInt(e.target.value),
            })
          }
          min="0"
          max={balance}
          disabled={
            isLoading || remainingCards === 0 || isGameOver || balance <= 0
          }
        />
      </div>

      <div >
        <h3 className="betTitle">Bet Type</h3>
        <div>
          <section>
          <label>
              Red or Black  (wins 2x bet amount)
            <input
              type="radio"
              name="betType"
              value="color"
              checked={betType === "color"}
              onChange={() =>
                dispatch({ type: "SET_BET_TYPE", payload: "color" })
              }
              disabled={
                isLoading || remainingCards === 0 || isGameOver || balance <= 0
              }
            />
            </label>
          </section>
          <section>
          <label>
            Face Card- K, Q, J (wins 4x bet amount)
            <input
              type="radio"
              name="betType"
              value="face"
              checked={betType === "face"}
              onChange={() =>
                dispatch({ type: "SET_BET_TYPE", payload: "face" })
              }
              disabled={
                isLoading || remainingCards === 0 || isGameOver || balance <= 0
              }
            />
          </label>
          </section>
          <section>
          <label>
            Card Suit (wins 4x bet amount)
            <input
              type="radio"
              name="betType"
              value="suit"
              checked={betType === "suit"}
              onChange={() =>
                dispatch({ type: "SET_BET_TYPE", payload: "suit" })
              }
              disabled={
                isLoading || remainingCards === 0 || isGameOver || balance <= 0
              }
            />
          </label>
          </section>
          <section>
          <label>
            Card Type (wins 13x bet amount)
            <input
              type="radio"
              name="betType"
              value="rank"
              checked={betType === "rank"}
              onChange={() =>
                dispatch({ type: "SET_BET_TYPE", payload: "rank" })
              }
              disabled={
                isLoading || remainingCards === 0 || isGameOver || balance <= 0
              }
            />
            </label>
            </section>
        </div>

        <div>
          {betType && <h3 className="chooseValue">Choose Value</h3>}
          {betType === "color" && (
            <div>
              <label>
                Red
                <input
                  type="radio"
                  name="betValue"
                  value="RED"
                  checked={betValue === "RED"}
                  onChange={(e) =>
                    dispatch({ type: "SET_BET_VALUE", payload: e.target.value })
                  }
                  disabled={
                    isLoading ||
                    remainingCards === 0 ||
                    isGameOver ||
                    balance <= 0
                  }
                />
              </label>
              <label>
                Black
                <input
                  type="radio"
                  name="betValue"
                  value="BLACK"
                  checked={betValue === "BLACK"}
                  onChange={(e) =>
                    dispatch({ type: "SET_BET_VALUE", payload: e.target.value })
                  }
                  className="radioInput"
                  disabled={
                    isLoading ||
                    remainingCards === 0 ||
                    isGameOver ||
                    balance <= 0
                  }
                />
              </label>
            </div>
          )}
          {betType === "face" && (
            <div>
              <label>
                Yes
                <input
                  type="radio"
                  name="betValue"
                  value="YES"
                  checked={betValue === "YES"}
                  onChange={(e) =>
                    dispatch({ type: "SET_BET_VALUE", payload: e.target.value })
                  }
                  disabled={
                    isLoading ||
                    remainingCards === 0 ||
                    isGameOver ||
                    balance <= 0
                  }
                />
              </label>
              <label>
                {" "}
                No
                <input
                  type="radio"
                  name="betValue"
                  value="NO"
                  checked={betValue === "NO"}
                  onChange={(e) =>
                    dispatch({ type: "SET_BET_VALUE", payload: e.target.value })
                  }
                  disabled={
                    isLoading ||
                    remainingCards === 0 ||
                    isGameOver ||
                    balance <= 0
                  }
                />
              </label>
            </div>
          )}
          {betType === "suit" && (
            <div>
              {suits.map((suit) => (
                <label key={suit}>{suit}
                  <input
                    type="radio"
                    name="betValue"
                    value={suit}
                    checked={betValue === suit}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_BET_VALUE",
                        payload: e.target.value,
                      })
                    }
                    className="radioInput"
                    disabled={
                      isLoading ||
                      remainingCards === 0 ||
                      isGameOver ||
                      balance <= 0
                    }
                  />
                  
                </label>
              ))}
            </div>
          )}
          {betType === "rank" && (
            <select
              value={betValue}
              onChange={(e) =>
                dispatch({ type: "SET_BET_VALUE", payload: e.target.value })
              }
              className="selectInput"
              disabled={
                isLoading || remainingCards === 0 || isGameOver || balance <= 0
              }
            >
              <option value="">Select Type</option>
              {ranks.map((rank) => (
                <option key={rank} value={rank}>
                  {rank}
                </option>
              ))}
            </select>
          )}
          {!betType && <p>Select a bet type to choose a value.</p>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={
            isLoading ||
            !betType ||
            (betType !== "face" && !betValue) ||
            betAmount <= 0 ||
            betAmount > balance ||
            remainingCards === 0 ||
            isGameOver
          }
        >
          {isLoading ? "Drawing..." : "Draw Card"}
        </button>
      </div>
    </form>
  );
}

export default BetForm;
