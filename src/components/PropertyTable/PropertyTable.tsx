import { FC } from 'react';
import './styles.css';
import type { PropertyTableProps } from './types';

const PropertyTable: FC<PropertyTableProps> = ({ data }) => {
  return (
    <table className="property-table">
      <tbody>
        {data.map((item, index) => (
          <tr key={`${item.name}-${index}`}>
            {Object.entries(item).map(([key, value], idx) => (
              <td key={`${key}-${idx}`}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyTable;
