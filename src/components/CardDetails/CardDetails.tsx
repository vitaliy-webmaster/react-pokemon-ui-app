import { FC } from 'react';
import { Affix, Card } from 'antd';
import './style.css';
import { useAppSelector } from '../../store/hooks';
import { selectChosenCardData } from '../../store/cardListSlice/selectors';
import PropertyTable from '../PropertyTable';

const CardDetails: FC = () => {
  const data = useAppSelector(selectChosenCardData);

  if (!data) {
    return null;
  }

  const { id, name, types, stats, sprites } = data;

  const typesList = types.map((item) => ({
    name: 'type',
    value: item.type.name,
  }));

  const featuresList = stats.map((item) => ({
    name: item.stat.name,
    value: item.base_stat,
  }));

  return (
    <Affix className="card-affix" offsetTop={0}>
      <Card
        className="card-details"
        cover={<img alt={`${name}`} src={sprites.front_default} />}
        bodyStyle={{ padding: '16px' }}
      >
        <div className="card-details__title">
          {`${name} #${String(id).padStart(3, '0')}`}
        </div>
        <div className="card-details__tags">
          <PropertyTable data={[...typesList, ...featuresList]} />
        </div>
      </Card>
    </Affix>
  );
};

export default CardDetails;
