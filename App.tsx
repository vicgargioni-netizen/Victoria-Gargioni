
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, TrailNode } from './types';
import { TRAIL_NODES } from './constants';
import ForestScene from './components/ForestScene';
import HUD from './components/HUD';
import { getScoutMasterAdvice } from './services/geminiService';
import { Award } from 'lucide-react';

const INITIAL_STATE: GameState = {
  score: 0,
  lives: 3,
  time: 0,
  progress: 0,
  inventory: [],
  status: 'START',
  currentNodeId: 1
};

// URLs de efeitos sonoros estáveis (Google Actions Sounds)
const SFX = {
  FOOTSTEPS: 'https://actions.google.com/sounds/v1/foley/footsteps_on_grass.ogg',
  SUCCESS: 'https://actions.google.com/sounds/v1/alarms/beep_short.ogg',
  ERROR: 'https://actions.google.com/sounds/v1/alarms/bugle_tune.ogg',
  AMBIENT: 'https://actions.google.com/sounds/v1/ambiences/forest_daybreak.ogg'
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [scoutMessage, setScoutMessage] = useState<string>("Siga as pistas para chegar ao acampamento, Recruta!");
  const [isAudioStarted, setIsAudioStarted] = useState(false);

  // Referências para elementos de áudio
  const ambientAudio = useRef<HTMLAudioElement | null>(null);
  const footstepAudio = useRef<HTMLAudioElement | null>(null);
  const sfxAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inicializar áudio ambiente
    ambientAudio.current = new Audio(SFX.AMBIENT);
    ambientAudio.current.loop = true;
    ambientAudio.current.volume = 0.3;

    footstepAudio.current = new Audio(SFX.FOOTSTEPS);
    footstepAudio.current.volume = 0.5;

    sfxAudio.current = new Audio();

    return () => {
      ambientAudio.current?.pause();
      footstepAudio.current?.pause();
      if (ambientAudio.current) ambientAudio.current.src = "";
      if (footstepAudio.current) footstepAudio.current.src = "";
    };
  }, []);

  const playSFX = (url: string) => {
    if (!sfxAudio.current || !isAudioStarted) return;
    sfxAudio.current.src = url;
    sfxAudio.current.play().catch(e => console.warn("SFX play failed", e));
  };

  const startGame = () => {
    setIsAudioStarted(true);
    if (ambientAudio.current) {
      ambientAudio.current.play().catch(e => console.warn("Ambient audio blocked", e));
    }
    setGameState(prev => ({ ...prev, status: 'PLAYING' }));
  };

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (gameState.status === 'PLAYING') {
      interval = setInterval(() => {
        setGameState(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.status]);

  const handleChoice = useCallback(async (option: any) => {
    const nextNode = TRAIL_NODES[option.nextNodeId];
    if (!nextNode) return;

    let newScore = gameState.score;
    let newLives = gameState.lives;
    let newInventory = [...gameState.inventory];
    let newStatus = gameState.status;

    if (option.isCorrect) {
      playSFX(SFX.SUCCESS);
      if (footstepAudio.current && isAudioStarted) {
        footstepAudio.current.currentTime = 0;
        footstepAudio.current.play().catch(e => console.warn(e));
      }
      
      newScore += 10;
      if (nextNode.item && !newInventory.includes(nextNode.item)) {
        newInventory.push(nextNode.item);
        newScore += 5; 
      }
    } else {
      playSFX(SFX.ERROR);
      newScore = Math.max(0, newScore - 5);
      newLives -= 1;
      if (newLives <= 0) newStatus = 'GAMEOVER';
    }

    if (nextNode.sign === 'FINAL') {
      newStatus = 'WON';
      const timeBonus = Math.max(0, 100 - Math.floor(gameState.time / 2));
      newScore += timeBonus;
    }

    setGameState(prev => ({
      ...prev,
      currentNodeId: option.nextNodeId,
      score: newScore,
      lives: newLives,
      inventory: newInventory,
      status: newStatus,
      progress: (option.nextNodeId / Object.keys(TRAIL_NODES).length) * 100
    }));

    // Resposta Dinâmica Gemini
    const advice = await getScoutMasterAdvice(
        `Nó ${nextNode.id}: ${nextNode.narrative}`,
        option.label
    );
    setScoutMessage(advice);
  }, [gameState, isAudioStarted]);

  if (gameState.status === 'START') {
    return (
      <div className="w-full h-full bg-[#0a120a] flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-black/40 backdrop-blur-xl border border-white/10 p-12 rounded-3xl text-center shadow-2xl">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-lg shadow-green-500/20">
               !
            </div>
          </div>
          <h1 className="scout-font text-6xl text-white mb-4">Trilha Escoteira</h1>
          <p className="text-gray-400 text-lg mb-8">
            Você é um recruta em treinamento. O objetivo é chegar ao acampamento seguindo corretamente os sinais de pista deixados pela floresta.
          </p>
          <button 
            onClick={startGame}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl text-xl transition-all transform hover:scale-105 shadow-xl shadow-green-600/30"
          >
            Começar Treinamento
          </button>
          <p className="mt-6 text-xs text-gray-500 uppercase tracking-widest">Atenção: 3 erros e você está fora!</p>
        </div>
      </div>
    );
  }

  if (gameState.status === 'GAMEOVER') {
    if (ambientAudio.current) ambientAudio.current.pause();
    return (
      <div className="w-full h-full bg-red-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-black/60 backdrop-blur-xl p-10 rounded-3xl text-center border border-red-500/20">
          <h1 className="scout-font text-5xl text-red-500 mb-4">Treinamento Falho</h1>
          <p className="text-gray-300 mb-8">Você se perdeu na floresta ou cometeu erros fatais. O Mestre Escoteiro teve que vir te resgatar.</p>
          <div className="bg-white/5 p-4 rounded-xl mb-8">
            <p className="text-sm text-gray-400">PONTUAÇÃO FINAL</p>
            <p className="text-4xl font-bold text-white">{gameState.score}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <ForestScene 
        currentNode={TRAIL_NODES[gameState.currentNodeId]} 
        isAudioStarted={isAudioStarted} 
      />
      <HUD 
        gameState={gameState} 
        currentNode={TRAIL_NODES[gameState.currentNodeId]} 
        onChoice={handleChoice}
        scoutMessage={scoutMessage}
      />
      
      {gameState.status === 'WON' && (
        <div className="absolute inset-0 bg-green-900/40 backdrop-blur-sm z-50 flex items-center justify-center pointer-events-none">
           <div className="bg-black/80 p-12 rounded-3xl text-center border-4 border-yellow-500 pointer-events-auto shadow-2xl animate-bounce">
              <Award className="text-yellow-500 mx-auto mb-4" size={64} />
              <h1 className="scout-font text-6xl text-white mb-2">VITÓRIA!</h1>
              <p className="text-yellow-400 font-bold text-xl mb-4">Você é um mestre da trilha!</p>
              <div className="flex gap-4 justify-center">
                 <div className="bg-white/10 p-4 rounded-lg">
                    <p className="text-xs text-gray-400">SCORE</p>
                    <p className="text-2xl font-bold text-white">{gameState.score}</p>
                 </div>
                 <div className="bg-white/10 p-4 rounded-lg">
                    <p className="text-xs text-gray-400">TEMPO</p>
                    <p className="text-2xl font-bold text-white">{gameState.time}s</p>
                 </div>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="mt-8 bg-yellow-500 text-black font-bold px-8 py-3 rounded-xl"
              >
                Novo Desafio
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
