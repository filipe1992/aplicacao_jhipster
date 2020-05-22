import { IEndereco } from 'app/shared/model/endereco.model';
import { ICarro } from 'app/shared/model/carro.model';

export interface IPessoa {
  id?: number;
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  endereco?: IEndereco;
  carros?: ICarro[];
}

export const defaultValue: Readonly<IPessoa> = {};
