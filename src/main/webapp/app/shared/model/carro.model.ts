import { IEndereco } from 'app/shared/model/endereco.model';
import { IPessoa } from 'app/shared/model/pessoa.model';

export interface ICarro {
  id?: number;
  nome?: string;
  placa?: string;
  enderecos?: IEndereco[];
  pessoa?: IPessoa;
}

export const defaultValue: Readonly<ICarro> = {};
