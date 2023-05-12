import { ReactNode } from 'react';
import { TPokemon } from '../../types';

export interface CardItemProps {
  data: TPokemon;
}

export interface CardLinkWrapperProps {
  id: number;
  children?: ReactNode;
}
