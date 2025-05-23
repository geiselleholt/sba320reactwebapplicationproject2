import GameStats from "../components/GameStats";
import BetForm from "../components/BetForm";
import DisplayCard from "../components/DisplayCard";

export default function GamePage() {
  return (
    <>
      <h1>Game Page</h1>
      <DisplayCard />
      <GameStats />
      <BetForm />
    </>
  );
}
