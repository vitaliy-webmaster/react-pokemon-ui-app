import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  id: number;
  children?: ReactNode;
}

const CardLinkWrapper: FC<Props> = ({ id, children }) => {
  return (
    <Link className="card-link" to={id.toString()}>
      {children}
    </Link>
  );
};

export default CardLinkWrapper;
