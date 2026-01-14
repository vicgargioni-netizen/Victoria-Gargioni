
import React from 'react';
import { GameState, TrailNode, SignType } from '../types';
import { SIGN_GLYPHS } from '../constants';
import { Heart, Clock, Award, Package, Map as MapIcon, ChevronRight, Compass } from 'lucide-react';

interface HUDProps {
  gameState: GameState;
  currentNode: TrailNode;
  onChoice: (choice: any) => void;
  scoutMessage: string;
}

const HUD: React.FC<HUDProps> = ({ gameState, currentNode, onChoice, scoutMessage }) => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10 overflow-hidden">
      {/* Vignette effect for immersion */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

      {/* Top Bar: Compass & Status */}
      <div className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col gap-4">
          <div className="bg-[#f4e4bc] border-2 border-[#8b4513] p-4 rounded-lg shadow-[5px_5px_0px_0px_rgba(139,69,19,0.5)] flex gap-6 items-center text-[#5d2e0a]">
            <div className="flex items-center gap-2">
              <Award size={18} />
              <span className="font-bold text-lg">{gameState.score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="fill-[#b22222] text-[#b22222]" size={18} />
              <span className="font-bold text-lg">{gameState.lives}</span>
            </div>
            <div className="h-6 w-px bg-[#8b4513]/20" />
            <div className="flex items-center gap-2 font-mono font-bold">
              <Clock size={18} />
              <span>{Math.floor(gameState.time / 60)}:{(gameState.time % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Diegetic Compass */}
        <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-[#f4e4bc] border-4 border-[#8b4513] rounded-full flex items-center justify-center shadow-lg transform rotate-[-15deg]">
               <Compass className="text-[#8b4513] animate-pulse" size={32} />
            </div>
            <span className="scout-font text-[#f4e4bc] text-xl font-bold drop-shadow-md">Norte</span>
        </div>
      </div>

      {/* Field Notes & Choices */}
      <div className="flex flex-col items-center gap-6 mb-4 relative">
        {/* Scout Master Message - Paper Scrap style */}
        {scoutMessage && (
          <div className="bg-[#fff9e6] border-l-8 border-green-700 p-4 rounded-sm max-w-lg animate-fade-in pointer-events-auto shadow-xl transform -rotate-1">
             <p className="text-[#2d4d2d] font-medium text-sm italic leading-relaxed">
               "{scoutMessage}"
             </p>
             <div className="flex justify-end mt-2">
                <span className="text-[10px] text-green-800 font-bold uppercase tracking-tighter">Instrutor de Campo</span>
             </div>
          </div>
        )}

        {/* Main Log Book */}
        <div className="bg-[#fdf5e6] border-2 border-[#8b4513] p-0 rounded-sm max-w-3xl w-full pointer-events-auto shadow-[10px_10px_20px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row overflow-hidden">
          {/* Left Side: Illustration/Sign */}
          <div className="w-full sm:w-1/3 bg-[#f4e4bc] border-r-2 border-[#8b4513] p-6 flex flex-col items-center justify-center gap-4">
             {currentNode.sign ? (
               <div className="w-32 h-32 bg-[#fff9e6] rounded-sm p-4 border border-[#8b4513]/30 shadow-inner flex items-center justify-center">
                  {SIGN_GLYPHS[currentNode.sign]}
               </div>
             ) : (
                <div className="w-32 h-32 flex items-center justify-center">
                   <MapIcon size={64} className="text-[#8b4513]/20" />
                </div>
             )}
             <span className="scout-font text-[#8b4513] text-2xl border-b-2 border-[#8b4513]/20 pb-1">Log de Trilha</span>
          </div>

          {/* Right Side: Description & Actions */}
          <div className="w-full sm:w-2/3 p-8 flex flex-col">
            <div className="mb-6">
               <h3 className="scout-font text-3xl text-[#5d2e0a] mb-2">Relatório de Localização</h3>
               <p className="text-[#5d2e0a]/80 font-serif text-lg leading-tight italic">
                 {currentNode.narrative}
               </p>
            </div>

            <div className="grid grid-cols-1 gap-3 mt-auto">
              {currentNode.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => onChoice(opt)}
                  className="flex items-center justify-between p-4 bg-[#8b4513]/5 hover:bg-[#8b4513]/10 border-2 border-[#8b4513]/20 rounded-sm transition-all group text-[#5d2e0a] text-left font-bold font-serif"
                >
                  <span className="flex-1 pr-4">{opt.label}</span>
                  <ChevronRight size={20} className="text-[#8b4513] group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
              {gameState.status === 'WON' && (
                 <button onClick={() => window.location.reload()} className="bg-green-700 hover:bg-green-600 text-white font-bold p-4 rounded-sm transition-all uppercase tracking-widest shadow-lg">
                    Finalizar Treinamento
                 </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Inventory & Progress */}
      <div className="flex justify-between items-end pointer-events-auto">
          <div className="bg-[#f4e4bc] border-2 border-[#8b4513] p-3 rounded-lg text-[#5d2e0a] flex items-center gap-4 shadow-lg">
             <Package size={20} />
             <div className="flex gap-2">
                {gameState.inventory.length === 0 ? (
                  <span className="text-sm opacity-40 italic">Sem itens</span>
                ) : (
                  gameState.inventory.map((item, i) => (
                    <div key={i} className="px-2 py-1 bg-[#8b4513]/10 rounded text-xs font-bold border border-[#8b4513]/20 uppercase">
                      {item}
                    </div>
                  ))
                )}
             </div>
          </div>

          <div className="w-48">
             <div className="flex justify-between text-[#f4e4bc] scout-font text-lg mb-1 drop-shadow-sm">
                <span>Progresso</span>
                <span>{Math.round(gameState.progress)}%</span>
             </div>
             <div className="h-3 bg-black/40 rounded-full border border-[#8b4513]/30 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-green-600 transition-all duration-1000" 
                  style={{ width: `${gameState.progress}%` }}
                />
             </div>
          </div>
      </div>
    </div>
  );
};

export default HUD;
