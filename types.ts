
export enum SignType {
  INICIO = 'INICIO',
  SIGA = 'SIGA',
  SALTAR = 'SALTAR',
  VOLTAR_PARTIDA = 'VOLTAR_PARTIDA',
  PERIGO = 'PERIGO',
  EVITAR = 'EVITAR',
  SIGA_2KM = 'SIGA_2KM',
  ACAMPAMENTO = 'ACAMPAMENTO',
  RAPIDO = 'RAPIDO',
  BIFURCACAO = 'BIFURCACAO',
  AGUA_NAO_POTAVEL = 'AGUA_NAO_POTAVEL',
  AGUA_POTAVEL = 'AGUA_POTAVEL',
  OBJETO_2_PASSOS = 'OBJETO_2_PASSOS',
  OBJETO_OCULTO = 'OBJETO_OCULTO',
  ESPERE = 'ESPERE',
  COMECO_JOGO = 'COMECO_JOGO',
  VOLTE_REUNIAO = 'VOLTE_REUNIAO',
  FINAL = 'FINAL'
}

export interface GameState {
  score: number;
  lives: number;
  time: number;
  progress: number;
  inventory: string[];
  status: 'START' | 'PLAYING' | 'WON' | 'GAMEOVER';
  currentNodeId: number;
}

export interface TrailNode {
  id: number;
  position: [number, number, number];
  sign?: SignType;
  options: {
    label: string;
    nextNodeId: number;
    isCorrect: boolean;
  }[];
  item?: string;
  narrative?: string;
}
