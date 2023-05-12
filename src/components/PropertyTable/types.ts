export type TableRowData = {
  name: string;
  value: string | number;
};

export interface PropertyTableProps {
  data: TableRowData[];
}
