import { FC } from 'react';
import { Button } from 'antd';
import cn from 'classnames';
import './styles.css';
import CardItem from '../CardItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  selectChosenCardId,
  selectFilteredListData,
} from '../../store/cardListSlice/selectors';
import { fetchCardListAsync } from '../../store/cardListSlice';

const CardList: FC = () => {
  const dispatch = useAppDispatch();
  const filteredList = useAppSelector(selectFilteredListData);
  const selectedId = useAppSelector(selectChosenCardId);

  const handleFetchMoreClick = () => {
    dispatch(fetchCardListAsync());
  };

  return (
    <div className={cn('card-list', { 'card-list--compact': selectedId })}>
      {filteredList.length > 0 && (
        <>
          <div className="card-list__cards">
            {filteredList.map((item) => {
              return <CardItem key={item.id} data={item} />;
            })}
          </div>
          <div className="card-list__fetch-more">
            <Button
              className="card-list__fetch-more-btn"
              onClick={handleFetchMoreClick}
              type="primary"
              size="large"
              block
            >
              Load More
            </Button>
          </div>
        </>
      )}

      {filteredList.length === 0 && (
        <div className="card-list__empty">Your pokemon list is empty!</div>
      )}
    </div>
  );
};

export default CardList;
