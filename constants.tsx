
import React from 'react';
import { SignType } from './types';

export const SIGN_GLYPHS: Record<SignType, React.ReactNode> = {
  [SignType.INICIO]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <circle cx="50" cy="50" r="40" />
      <path d="M30 30 L70 70 M70 30 L30 70" />
    </svg>
  ),
  [SignType.SIGA]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <path d="M20 50 L80 50 M60 30 L80 50 L60 70" />
    </svg>
  ),
  [SignType.SALTAR]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
       <path d="M20 50 L80 50 M60 30 L80 50 L60 70" />
       <path d="M40 30 L40 70 M50 30 L50 70" strokeWidth="6" />
    </svg>
  ),
  [SignType.VOLTAR_PARTIDA]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <circle cx="50" cy="50" r="30" />
      <path d="M80 50 L95 50 M85 40 L95 50 L85 60" />
    </svg>
  ),
  [SignType.PERIGO]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <path d="M50 15 L85 80 L15 80 Z" />
    </svg>
  ),
  [SignType.EVITAR]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[8]">
      <path d="M20 20 L80 80 M80 20 L20 80" />
    </svg>
  ),
  [SignType.SIGA_2KM]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <path d="M20 50 L80 50 M65 35 L80 50 L65 65" />
      <path d="M35 30 L35 70 M45 30 L45 70" />
    </svg>
  ),
  [SignType.ACAMPAMENTO]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <path d="M20 50 L80 50 M65 35 L80 50 L65 65" />
      <path d="M30 45 L30 20 L50 32.5 L30 45" fill="black" />
    </svg>
  ),
  [SignType.RAPIDO]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <path d="M30 20 Q70 20 70 50 Q70 80 30 80" />
      <path d="M20 50 L40 50 M30 40 L40 50 L30 60" />
    </svg>
  ),
  [SignType.BIFURCACAO]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <path d="M50 90 L50 60 L20 30 M50 60 L80 30" />
      <text x="10" y="25" fontSize="12" fill="black" stroke="none">2</text>
      <text x="80" y="25" fontSize="12" fill="black" stroke="none">3</text>
    </svg>
  ),
  [SignType.AGUA_NAO_POTAVEL]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <path d="M20 40 Q35 30 50 40 T80 40" />
      <path d="M20 55 Q35 45 50 55 T80 55" />
      <path d="M20 70 Q35 60 50 70 T80 70" />
      <path d="M30 30 L70 80 M70 30 L30 80" stroke="red" strokeWidth="6" />
    </svg>
  ),
  [SignType.AGUA_POTAVEL]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <path d="M20 40 Q35 30 50 40 T80 40" />
      <path d="M20 55 Q35 45 50 55 T80 55" />
      <path d="M20 70 Q35 60 50 70 T80 70" />
    </svg>
  ),
  [SignType.OBJETO_2_PASSOS]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <rect x="25" y="25" width="40" height="40" />
      <path d="M65 45 L85 45 L85 65 M75 55 L85 65 L95 55" />
      <text x="40" y="55" fontSize="20" fill="black" stroke="none" fontWeight="bold">2</text>
    </svg>
  ),
  [SignType.OBJETO_OCULTO]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <rect x="30" y="30" width="40" height="40" />
      <path d="M70 50 L90 50 M80 40 L90 50 L80 60" />
    </svg>
  ),
  [SignType.ESPERE]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <rect x="20" y="20" width="60" height="60" />
      <rect x="35" y="35" width="30" height="30" />
    </svg>
  ),
  [SignType.COMECO_JOGO]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <path d="M30 30 L50 50 L30 70 M50 30 L70 50 L50 70" strokeWidth="6" />
    </svg>
  ),
  [SignType.VOLTE_REUNIAO]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <circle cx="50" cy="50" r="35" />
      <circle cx="50" cy="50" r="5" fill="black" />
    </svg>
  ),
  [SignType.FINAL]: (
    <svg viewBox="0 0 100 100" className="w-full h-full stroke-black fill-none stroke-[4]">
      <path d="M30 20 L30 80 M50 20 L50 80 M70 20 L70 80 M20 30 L80 30 M20 50 L80 50 M20 70 L80 70" />
    </svg>
  ),
};

export const TRAIL_NODES: Record<number, any> = {
  1: {
    id: 1,
    position: [0, 0, 0],
    sign: SignType.INICIO,
    narrative: "Bem-vindo ao treinamento de campo, Recruta! Aqui começa sua jornada. Procure pelo sinal de partida e siga adiante.",
    options: [
      { label: "Seguir pela trilha principal", nextNodeId: 2, isCorrect: true },
      { label: "Cortar caminho pela mata fechada", nextNodeId: 101, isCorrect: false },
    ]
  },
  2: {
    id: 2,
    position: [0, 0, -20],
    sign: SignType.SIGA,
    item: "Cantil",
    narrative: "Ótimo começo. Você encontrou um Cantil! Lembre-se: hidratação é vital.",
    options: [
      { label: "Ir para a esquerda", nextNodeId: 3, isCorrect: true },
      { label: "Ir para a direita", nextNodeId: 102, isCorrect: false },
    ]
  },
  3: {
    id: 3,
    position: [-15, 0, -40],
    sign: SignType.PERIGO,
    narrative: "Cuidado! Este sinal indica perigo iminente. Talvez um desmoronamento à frente?",
    options: [
      { label: "Continuar devagar", nextNodeId: 4, isCorrect: true },
      { label: "Correr para passar rápido", nextNodeId: 103, isCorrect: false },
    ]
  },
  4: {
    id: 4,
    position: [-10, 0, -65],
    sign: SignType.AGUA_POTAVEL,
    narrative: "Água fresca! Este sinal confirma que a água é potável. Quer encher o cantil?",
    options: [
      { label: "Encher cantil e seguir", nextNodeId: 5, isCorrect: true },
      { label: "Ignorar e seguir", nextNodeId: 104, isCorrect: false },
    ]
  },
  5: {
    id: 5,
    position: [5, 0, -85],
    sign: SignType.SALTAR,
    narrative: "Um tronco caído bloqueia o caminho. O sinal é claro.",
    options: [
      { label: "Pular o obstáculo", nextNodeId: 6, isCorrect: true },
      { label: "Tentar dar a volta por baixo", nextNodeId: 105, isCorrect: false },
    ]
  },
  6: {
    id: 6,
    position: [15, 0, -110],
    sign: SignType.ACAMPAMENTO,
    narrative: "Quase lá! Posso ver a fumaça da fogueira ao longe.",
    options: [
      { label: "Seguir em direção ao acampamento", nextNodeId: 7, isCorrect: true },
      { label: "Explorar caverna escura", nextNodeId: 106, isCorrect: false },
    ]
  },
  7: {
    id: 7,
    position: [10, 0, -140],
    sign: SignType.FINAL,
    narrative: "Parabéns, Escoteiro! Você completou a trilha seguindo todos os sinais corretamente.",
    options: []
  },
  // Failure nodes
  101: { id: 101, narrative: "Você se perdeu nos arbustos e foi picado por formigas de fogo!", options: [{ label: "Voltar", nextNodeId: 1, isCorrect: false }] },
  102: { id: 102, narrative: "O caminho para a direita levou a um pântano lamacento.", options: [{ label: "Voltar", nextNodeId: 2, isCorrect: false }] },
  103: { id: 103, narrative: "Você correu e tropeçou em uma raiz, torcendo o tornozelo!", options: [{ label: "Voltar", nextNodeId: 3, isCorrect: false }] },
  104: { id: 104, narrative: "A sede começou a bater forte e você ficou desorientado.", options: [{ label: "Voltar", nextNodeId: 4, isCorrect: false }] },
  105: { id: 105, narrative: "Havia um ninho de vespas embaixo do tronco!", options: [{ label: "Voltar", nextNodeId: 5, isCorrect: false }] },
  106: { id: 106, narrative: "Um urso estava dormindo na caverna. Péssima ideia.", options: [{ label: "Voltar", nextNodeId: 6, isCorrect: false }] },
};
