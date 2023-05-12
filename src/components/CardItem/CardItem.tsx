import { FC } from 'react';
import { Button, Card } from 'antd';
import './style.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectChosenCardId } from '../../store/cardListSlice/selectors';
import { selectTypeFromCard } from '../../store/cardListSlice';
import CardLinkWrapper from './CardLinkWrapper';
import { CardItemProps } from './types';

const CardItem: FC<CardItemProps> = ({ data }) => {
  const { id, name, types, sprites } = data;

  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(selectChosenCardId);

  const tags = types.map((item) => item.type.name);

  const handleTagClick = (tag: string) => {
    dispatch(selectTypeFromCard(tag));
  };

  const cardJSX = (
    <Card
      className="card"
      cover={<img alt={`${name}`} src={sprites.front_default} />}
      bodyStyle={{ padding: '16px' }}
    >
      <div className="card__title">{name}</div>
      <div className="card__tags">
        {tags.map((tag) => (
          <Button
            key={tag}
            type="text"
            className="card__tag"
            onClick={handleTagClick.bind(null, tag)}
          >
            {tag}
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
