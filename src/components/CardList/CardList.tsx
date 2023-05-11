import { FC } from 'react';
import cn from 'classnames';
import './styles.css';
import type { TPokemon } from '../../types';
import CardItem from '../CardItem';
import { useAppSelector } from '../../store/hooks';
import { selectChosenCardId } from '../../store/cardListSlice/selectors';

interface Props {
  list: TPokemon[];
}

const CardList: FC<Props> = ({ list }) => {
  const selectedId = useAppSelector(selectChosenCardId);

  return (
    <div className={cn('card-list', { 'card-list--compact': selectedId })}>
      {list.map((item) => {
        return <CardItem key={item.id} data={item} />;
      })}
    </div>
  );
};

export default CardList;
