export interface Movement {
  id: number;
  idUsuario: any;
  idLivro: number;
  locacao: number;
  dataLocacao: string;
  previsaoDevolucao: string;
  dataDevolucao: any;
  devolucao: number;
  status: string;
  proprietario: string;
}

export type Movements = Array<Movement>;
