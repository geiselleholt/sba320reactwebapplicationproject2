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

  const suits = ["❤️HEARTS", "♦️DIAMONDS", "♣️CLUBS", "♠️SPADES"];

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Bet Amount:</label>
        <input
          type="number"
          id="betAmount"
          value={betAmount}
          onChange={(e) =>
            dispatch({
              type: "SET_BET_AMOUNT",
              payload: parseInt(e.target.value) || 0,
            })
          }
          min="0"
          max={balance}
          disabled={
            isLoading || remainingCards === 0 || isGameOver || balance <= 0
          }
        />
      </div>

      <div>
        <h3>Bet Type</h3>
        <div>
          <label>
            Red or Black
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
          <label>
            Face Card- K, Q, J
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
          <label>
            Specific Suit
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
          <label>
            Specific Rank
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
        </div>

        <div>
          <h3>Choose Value</h3>
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
                <label key={suit}>
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
              <option value="">Select Rank</option>
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
