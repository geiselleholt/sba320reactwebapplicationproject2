export default function gameReducer(state, action) {
  let newBalance;
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
        message: "Place your bet.",
        isGameOver: false,
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
    case "RESET_GAME":
      return initialGameState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
