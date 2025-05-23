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
    isGameOver: false,
  };

  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const { balance, deckId, remainingCards, drawnCard, betAmount, isGameOver } =
    state;

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
    }
  }, []);

  useEffect(() => {
    if (!deckId && !isGameOver) {
      shuffleDeck();
    }
  }, [deckId, isGameOver, shuffleDeck]);

  const handleDrawCard = async () => {
    if (isGameOver) {
      dispatch({
        type: "SET_MESSAGE",
        payload: "Game Over! Click 'New Game' to restart.",
      });
      return;
    }

    if (remainingCards === 0) {
      dispatch({
        type: "SET_MESSAGE",
        payload: "You went throught the whole deck! Start a new game.",
      });
      return;
    }

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
        dispatch({
          type: "DRAW_CARD",
          payload: {
            card,
            remaining: data.remaining,
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
    <>
      <h2 className="gameTitle">Risk & Reveal</h2>
      <BetForm />
      <DisplayCard drawnCard={drawnCard} />
      <GameStats />
      <button onClick={() => {handleDrawCard}}>Draw</button>

      <button onClick={() => navigate("/rules")}>Rules</button>
    </>
  );
}
