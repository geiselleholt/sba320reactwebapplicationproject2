import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="pageContainer">
      <h1 className="homeTitle">Risk & Reveal</h1>
      <p className="homeParagraph">
        Test your luck and intuition! Bet on the next card drawn and watch your
        money grow 🤑... or watch it fly away💸!
      </p>
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
