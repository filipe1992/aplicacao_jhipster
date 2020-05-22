import { Moment } from 'moment';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { ICarro } from 'app/shared/model/carro.model';

export interface IEndereco {
  id?: number;
  pais?: string;
  estado?: string;
  bairro?: number;
  rua?: number;
  pessoa?: IPessoa;
  carros?: ICarro[];
}

export const defaultValue: Readonly<IEndereco> = {};
