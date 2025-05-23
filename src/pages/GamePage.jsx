import { useCallback, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GameStats from "../components/GameStats";
import BetForm from "../components/BetForm";
import DisplayCard from "../components/DisplayCard";
import gameReducer from "../reducers/gameReducer.jsx";

export default function GamePage() {
  const navigate = useNavigate();
  const initialGameState = {
    balance: 100,
    deckId: null,
    remainingCards: 0,
    drawnCard: null,
    betAmount: 10,
    message: "",
    betType: "",
    betValue: "",
    isLoading: false,
    isGameOver: false,
  };

  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const {
    balance,
    deckId,
    remainingCards,
    drawnCard,
    betAmount,
    betType,
    betValue,
    message,
    isLoading,
    isGameOver,
  } = state;

  const shuffleDeck = useCallback(async () => {
    dispatch({
      type: "START_LOADING",
      payload: { message: "Shuffling a new deck..." },
    });
    try {
      const response = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      const data = response.data;
      dispatch({
        type: "SET_DECK",
        payload: { deckId: data.deck_id, remaining: data.remaining },
      });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  }, []);

  useEffect(() => {
    if (!deckId && !isGameOver) {
      shuffleDeck();
    }
  }, [deckId, isGameOver, shuffleDeck]);

  const handleDrawCard = async () => {
    if (isGameOver) {
      alert("Game Over! Click New Game to restart");
      return;
    }
    if (betAmount <= 0) {
      alert("Bet amount must be greater than zero");
      return;
    }
    if (betAmount > balance) {
      alert("Bet amount cannot be more than your balance");
      return;
    }

    if (!betType || !betValue) {
      dispatch({
        type: "SET_MESSAGE",
        payload: "Please select a bet type AND value.",
      });
      return;
    }

    if (remainingCards === 0) {
      alert("You went throught the whole deck! Start a new game.");
      return;
    }

    dispatch({ type: "PLACE_BET", payload: { amount: betAmount } });

    dispatch({
      type: "START_LOADING",
      payload: { message: "Drawing card..." },
    });

    try {
      const response = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      const data = response.data;

      if (data.success && data.cards.length > 0) {
        const card = data.cards[0];
        let win = false;
        let payoutMultiplier = 0;

        const cardValue = card.value;
        const cardSuit = card.suit;
        const cardColor =
          cardSuit === "HEARTS" || cardSuit === "DIAMONDS" ? "RED" : "BLACK";
        const isFaceCard = ["JACK", "QUEEN", "KING"].includes(cardValue);

        switch (betType) {
          case "color":
            win = betValue === cardColor;
            payoutMultiplier = 2;
            break;
          case "face":
            win =
              (betValue === "YES" && isFaceCard) ||
              (betValue === "NO" && !isFaceCard);
            payoutMultiplier = isFaceCard ? 4 : 0;
            break;
          case "suit":
            win = betValue === cardSuit;
            payoutMultiplier = 4;
            break;
          case "rank":
            win = betValue === cardValue;
            payoutMultiplier = 13;
            break;
          default:
            win = false;
        }

        const winnings = win ? betAmount * payoutMultiplier : 0;

        const finalMessage = win
          ? `WINNER 💲💲💲  The card was ${cardValue} of ${cardSuit}. You won $${winnings}!`
          : `LOSER 🤡  The card was ${cardValue} of ${cardSuit}. You lost $${betAmount}.`;

        dispatch({
          type: "DRAW_CARD",
          payload: {
            card,
            remaining: data.remaining,
            winnings,
            message: finalMessage,
          },
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "STOP_LOADING" });
    }
  };

  const startNewGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  return (
    <div className="gameContainer">
      <h1 className="gameTitle">Risk & Reveal</h1>

      <GameStats balance={balance} remainingCards={remainingCards} />
      <div className="playContainer">
        <BetForm
          betAmount={betAmount}
          betType={betType}
          betValue={betValue}
          balance={balance}
          remainingCards={remainingCards}
          isLoading={isLoading}
          isGameOver={isGameOver}
          dispatch={dispatch}
          onSubmit={handleDrawCard}
        />

        <DisplayCard drawnCard={drawnCard} />
      </div>
      <div>
        <button onClick={startNewGame} disabled={isLoading}>
          New Game
        </button>
        <button onClick={() => navigate("/rules")}>Rules</button>
      </div>

      <p>
        {isGameOver && balance <= 0
          ? "Game Over! Your balance reached zero. Click 'New Game' to restart."
          : message}
      </p>
    </div>
  );
}
