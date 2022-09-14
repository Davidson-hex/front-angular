export interface Book {
  ativo?: number;
  autor?: string;
  dataCriacao?: string;
  id?: number;
  idUsuarioCadastro?: null;
  proprietario?: string;
  titulo?: string;
}

export type Books = Array<Book>;
