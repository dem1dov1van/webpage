<template>
  <div class="container">
    <div class="memory-game">
      <div class="stats">
        <div class="stat-card">
          <span class="stat-label">🎯 ходы</span>
          <span class="stat-value">{{ moves }}</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">🧩 совпадения</span>
          <span class="stat-value">{{ matchedPairs }} / {{ totalPairs }}</span>
        </div>
      </div>

      <div :class="['cards-grid', { 'disable-clicks': gameWon || lockBoard }]">
        <div
          v-for="(card, idx) in cards"
          :key="card.id"
          :class="['card', { 'flipped': card.flipped || card.matched, 'matched': card.matched }]"
          @click="handleCardClick(idx)"
        >
          <div class="card-inner">
            <div class="card-front" v-html="card.svg"></div>
            <div class="card-back"></div>
          </div>
        </div>
      </div>

      <div v-if="gameWon" class="win-message">
        ✨ Поздравляем! Все пары собраны за {{ moves }} ходов ✨
      </div>

      <button class="new-game-btn" @click="initGame">⟳ Новая игра</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import tomSvg from '@/assets/games/memory-game/tom.svg?raw';
import jerrySvg from '@/assets/games/memory-game/jerry.svg?raw';
import spikeSvg from '@/assets/games/memory-game/spike.svg?raw';
import tykeSvg from '@/assets/games/memory-game/tyke.svg?raw';
import nibblesSvg from '@/assets/games/memory-game/nibbles.svg?raw';
import butchSvg from '@/assets/games/memory-game/butch.svg?raw';

interface Card {
  id: string;
  name: string;
  svg: string;
  flipped: boolean;
  matched: boolean;
}

interface TempCard {
  index: number;
  card: Card;
}

const CHARACTERS = [
  { name: 'Том', svg: tomSvg },
  { name: 'Джерри', svg: jerrySvg },
  { name: 'Спайк', svg: spikeSvg },
  { name: 'Тайк', svg: tykeSvg },
  { name: 'Ни́бблз', svg: nibblesSvg },
  { name: 'Бутч', svg: butchSvg },
];

definePageMeta({
  layout: 'empty'
})

const shuffleArray = <T>(arr: T[]): T[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const createDeck = (): Card[] => {
  const deck: Card[] = [];
  CHARACTERS.forEach((char, idx) => {
    const base = { name: char.name, svg: char.svg, flipped: false, matched: false };
    deck.push({ id: `${char.name}-${idx}-a`, ...base });
    deck.push({ id: `${char.name}-${idx}-b`, ...base });
  });
  return shuffleArray(deck);
};

const cards = ref<Card[]>([]);
const moves = ref(0);
const matchedPairs = ref(0);
const lockBoard = ref(false);
const firstCard = ref<TempCard | null>(null);
const secondCard = ref<TempCard | null>(null);
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const totalPairs = computed(() => cards.value.length / 2);
const gameWon = computed(() => matchedPairs.value === totalPairs.value && totalPairs.value > 0);

const resetTempSelection = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  firstCard.value = null;
  secondCard.value = null;
  lockBoard.value = false;
};

const checkMatch = (cardA: Card, cardB: Card) => {
  if (cardA.name === cardB.name) {
    cardA.matched = true;
    cardB.matched = true;
    matchedPairs.value += 1;
    resetTempSelection();
  } else {
    lockBoard.value = true;
    timeoutId = setTimeout(() => {
      cardA.flipped = false;
      cardB.flipped = false;
      resetTempSelection();
    }, 700);
  }
};

const handleCardClick = (clickedIdx: number) => {
  const clickedCard = cards.value[clickedIdx];

  if (gameWon.value) return;
  if (lockBoard.value) return;
  if (clickedCard.matched) return;
  if (clickedCard.flipped) return;
  if (firstCard.value && secondCard.value) return;

  if (firstCard.value === null) {
    clickedCard.flipped = true;
    firstCard.value = { index: clickedIdx, card: clickedCard };
    return;
  }

  if (firstCard.value.index !== clickedIdx) {
    clickedCard.flipped = true;
    secondCard.value = { index: clickedIdx, card: clickedCard };
    moves.value += 1;
    checkMatch(firstCard.value.card, secondCard.value.card);
  }
};

const initGame = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  cards.value = createDeck();
  moves.value = 0;
  matchedPairs.value = 0;
  lockBoard.value = false;
  firstCard.value = null;
  secondCard.value = null;
};

onMounted(() => {
  initGame();
});
</script>

<style scoped>
.container {
  padding: 16px;
  min-height: 100vh;
  min-width: 100vw;
  max-height: 100vh;
  max-width: 100vw;
  background-color: #fff8ee;
  display: flex;
  align-items: center;
  justify-content: center;
}

.memory-game {
  max-width: 750px;
  width: 100%;
  background: #ffffff;
  border-radius: 2rem;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.02);
  padding: 1.8rem 1.5rem 2rem 1.5rem;
  margin: 0 auto;
  font-family: system-ui, 'Segoe UI', 'Roboto', sans-serif;
}

.stats {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  background: #f8fafc;
  border-radius: 2rem;
  padding: 0.6rem 1.2rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.6rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03), inset 0 0 0 1px #e9edf2;
  font-weight: 500;
}

.stat-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #5b6e8c;
}

.stat-value {
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1;
  color: #1e2a3e;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 560px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card {
  background: transparent;
  perspective: 600px;
  cursor: pointer;
  aspect-ratio: 1 / 1;
}

.card:active {
  transform: scale(0.97);
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  transform-style: preserve-3d;
  border-radius: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 1px 1px rgba(0, 0, 0, 0.02);
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.card-front {
  background: #ffffff;
  transform: rotateY(180deg);
  padding: 12%;
  border: 1px solid #eef2f9;
}

.card-front :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.card-back {
  background: #e6edf4;
  background-image: radial-gradient(circle at 35% 40%, #cddae9 1.2px, transparent 1px);
  background-size: 12px 12px;
  border: 1px solid #dce3ec;
}

.card-back::after {
  content: "🐱🐭";
  font-size: 1.9rem;
  opacity: 0.7;
}

.card.matched {
  cursor: default;
  filter: drop-shadow(0 0 4px #b9d2f0);
}

.card.matched .card-front {
  background: #f6fafe;
  border: 1px solid #b9d2f0;
}

.disable-clicks {
  pointer-events: none;
}

.win-message {
  text-align: center;
  background: #eef2f5;
  padding: 0.8rem;
  border-radius: 3rem;
  margin-top: 0.2rem;
  font-weight: 600;
  color: #1f3b4c;
  font-size: 1.1rem;
  border: 1px solid #dee4ec;
}

.new-game-btn {
  display: block;
  width: 100%;
  background: #1e2a3e;
  border: none;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  border-radius: 2.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1.2rem;
  text-align: center;
  letter-spacing: 0.3px;
}

.new-game-btn:hover {
  background: #2c3e4e;
  transform: translateY(-1px);
}

.new-game-btn:active {
  transform: translateY(1px);
}

@media (max-width: 550px) {
  .memory-game {
    padding: 1.2rem;
  }
  .cards-grid {
    gap: 0.7rem;
  }
  .stat-value {
    font-size: 1.5rem;
  }
  .stat-card {
    padding: 0.4rem 0.8rem;
  }
  .card-back::after {
    font-size: 1.4rem;
  }
}
</style>
