function GameStats({ balance, remainingCards }) {
  return (
    <div>
      <div>
        Balance: <p>${balance}</p>
      </div>
      <div>
        Cards Left: <p>{remainingCards}</p>
      </div>
    </div>
  );
}

export default GameStats;
