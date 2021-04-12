import classNames from "classnames";
import { createBemGenerator } from "features/common/utils";
import styles from "./styles.module.scss";

export type TableColumn<TData> = {
    key: string & keyof TData;
} & (
    | {
          hidden: true;
          label?: never;
      }
    | {
          hidden?: never;
          label: string;
      }
);

export interface Props<TData> {
    ["data-testid"]?: string;
    data: TData[];
    columns: TableColumn<TData>[];
    idColumn: string & keyof TData;
}

const DataTable = <TData extends object>({
    "data-testid": testId = "data-table",
    data,
    columns,
    idColumn,
}: Props<TData>) => {
    const bem = createBemGenerator("data-table");

    return (
        <div className={styles[bem()]}>
            {columns
                .filter((column) => !column.hidden)
                .map((column) => (
                    <div key={column.key} className={styles[bem("column")]}>
                        <div
                            data-testid={`${testId}__header-cell`}
                            className={classNames(styles[bem("cell")], styles[bem("cell", "header")])}>
                            {column.label}
                        </div>
                        {data.map((record) => (
                            <div
                                data-testid={`${testId}__cell-${column.key}`}
                                key={`${record[idColumn]}`}
                                className={styles[bem("cell")]}>
                                {record[column.key]}
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
};

export default DataTable;
