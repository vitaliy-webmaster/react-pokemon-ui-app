import { FC } from 'react';
import { Button, Card } from 'antd';

import './style.css';
import { TPokemon } from '../../types';
import { useAppSelector } from '../../store/hooks';
import { selectChosenCardId } from '../../store/cardListSlice/selectors';
import CardLinkWrapper from './CardLinkWrapper';

interface Props {
  data: TPokemon;
}

const CardItem: FC<Props> = ({ data }) => {
  const { id, name, types, sprites } = data;
  const selectedId = useAppSelector(selectChosenCardId);

  const tags = types.map((item) => item.type.name);

  // console.log(data.name, data);

  const cardJSX = (
    <Card
      className="card"
      cover={<img alt={`${name} image`} src={sprites.front_default} />}
      bodyStyle={{ padding: '16px' }}
    >
      <div className="card__title">{name}</div>
      <div className="card__tags">
        {tags.map((item) => (
          <Button key={item} type="text" className="card__tag">
            {item}
          </Button>
        ))}
      </div>
    </Card>
  );

  if (selectedId && selectedId === id) {
    return cardJSX;
  }

  return <CardLinkWrapper id={id}>{cardJSX}</CardLinkWrapper>;
};

export default CardItem;
