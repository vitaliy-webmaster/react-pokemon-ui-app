import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CardLinkWrapperProps } from './types';

const CardLinkWrapper: FC<CardLinkWrapperProps> = ({ id, children }) => {
  return (
    <Link className="card-link" to={id.toString()}>
      {children}
    </Link>
  );
};

export default CardLinkWrapper;
