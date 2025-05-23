import { useNavigate } from "react-router-dom";
import cards from "../images/cards.png";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="pageContainer">
      <h1 className="homeTitle">Risk & Reveal</h1>
      <img src={cards} alt="cards spread in a circle" />
      <h1 className="homeParagraph"> 🍀Test your luck and intuition...</h1>
      <h2>Bet on the next card drawn and watch your money grow 🎋</h2>
      <h2> Or watch it fly away 💸</h2>
      <button onClick={() => navigate("/game")} className="startButtonHome">
        Start Game
      </button>
      <button onClick={() => navigate("/rules")} className="rulesButtonHome">
        Rules
      </button>
    </div>
  );
}

export default HomePage;
