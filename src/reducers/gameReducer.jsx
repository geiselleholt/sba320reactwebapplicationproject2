export default function gameReducer(state, action) {
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

  let newBalance = 0;

  switch (action.type) {
    case "START_LOADING":
      return {
        ...state,
        isLoading: true,
        message: action.payload.message,
        drawnCard: null,
      };
    case "STOP_LOADING":
      return { ...state, isLoading: false };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "SET_DECK":
      return {
        ...state,
        deckId: action.payload.deckId,
        remainingCards: action.payload.remaining,
        message: "Place your bet",
        isGameOver: false,
      };
    case "PLACE_BET":
      newBalance = state.balance - action.payload.amount;
      return {
        ...state,
        balance: newBalance,
        isGameOver: newBalance <= 0,
        message:
          newBalance <= 0
            ? "Game Over! Your balance reached zero."
            : state.message,
      };
    case "DRAW_CARD":
      newBalance = state.balance + action.payload.winnings;
      return {
        ...state,
        drawnCard: action.payload.card,
        remainingCards: action.payload.remaining,
        balance: newBalance,
        message: action.payload.message,
        isGameOver: newBalance <= 0,
      };
    case "SET_BET_AMOUNT":
      return { ...state, betAmount: action.payload };
    case "SET_BET_TYPE":
      return { ...state, betType: action.payload, betValue: "" };
    case "SET_BET_VALUE":
      return { ...state, betValue: action.payload };

    case "RESET_GAME":
      return initialGameState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
