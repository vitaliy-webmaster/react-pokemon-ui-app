import { FC, useMemo } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import './styles.css';
import { selectChosenTypeIds, selectTypeData } from '../../store/cardListSlice/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTypes } from '../../store/cardListSlice';

const TypeFilter: FC = () => {
  const dispatch = useAppDispatch();
  const typeData = useAppSelector(selectTypeData);
  const selectedTypeIds = useAppSelector(selectChosenTypeIds);
  const selectedTypeIdsNormalized = selectedTypeIds.map((id) => id.toString());

  const typeSelectOptions: SelectProps['options'] = useMemo(() => {
    return typeData.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    }));
  }, [typeData]);

  const handleChange = (values: string[]) => {
    dispatch(selectTypes(values.map((item) => parseInt(item))));
  };

  return (
    <div className="type-filter">
      <Select
        className="type-filter__select"
        mode="multiple"
        size="middle"
        optionFilterProp="label"
        virtual={false}
        allowClear
        placeholder="Filter pokemons by type"
        onChange={handleChange}
        options={typeSelectOptions}
        value={selectedTypeIdsNormalized}
      />
    </div>
  );
};

export default TypeFilter;
