"use client";

import { useEffect, useReducer } from "react";

import { useGame } from "./use-game";
import { isGameOver } from "./utils";
import { MATCHING_CARDS } from "./constants";

function Card({
  item,
  onClick,
  revealed = false,
  found = false,
}: {
  item: string;
  onClick: () => void;
  revealed?: boolean;
  found?: boolean;
}) {
  const cardTransitionClasses = "transition duration-500";
  const cardContentTransitionClasses = "transition duration-300";
  const contentClasses = "bg-purple-400 w-full h-full absolute top-0 left-0 rounded";
  const flipUpClasses = "scale-x-100 opacity-100";
  const flipDownClasses = "-scale-x-100 opacity-0";

  return (
    <button
      className={`w-20 h-32 relative ${cardTransitionClasses} ${
        found ? "opacity-0" : ""
      }`}
      onClick={() => {
        if (!found && !revealed) {
          onClick();
        }
      }}
      aria-label="Memory Card"
    >
      <div
        className={`${contentClasses} ${cardTransitionClasses} ${
          revealed ? flipDownClasses : flipUpClasses
        }`}
      />

      <div
        className={`flex items-center justify-center ${contentClasses} ${cardTransitionClasses} ${
          revealed ? flipUpClasses : flipDownClasses
        }`}
      >
        <p
          className={`text-3xl ${cardContentTransitionClasses} ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          {item}
        </p>
      </div>
    </button>
  );
}

export function Board() {
  const { state, handler } = useGame();

  return (
    <div className="flex w-full items-center justify-center gap-6 flex-col text-purple-950" aria-label="Memory Board">
      <div className="flex flex-col">
        <p>Find all the matching pair of cards.</p>
      <div className="flex justify-between">
        <p>Cards Found: {Number(state.found.length) * MATCHING_CARDS}</p>
        <p>Moves: {state.moves}</p>
      </div>
        {isGameOver(state.found) ? (
          <p className="font-bold">End of Game!</p>
        ) : null}
        <button
          className="self-center px-4 mt-2 font-bold border rounded border-gray-600 text-slate-800"
          onClick={() => handler.reset()}
        >
          Reset Game
        </button>
      </div>

      <div className="flex w-11/12 md:w-2/3 max-w-md items-center justify-center gap-2 flex-wrap">
        {state.cards.map((item, i) => (
          <Card
            item={item}
            key={`key-item-${item}-${i}`}
            onClick={() => handler.revealCard(i)}
            found={state.found.includes(item)}
            revealed={state.revealedIndexes.includes(i)}
          />
        ))}
      </div>
    </div>
  );
}
