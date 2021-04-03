import classNames from "classnames";
import { createBemGenerator } from "features/common/utils";
import styles from "./styles.module.scss";

export interface TableColumn<TData> {
    key: string & keyof TData;
    label: string;
}

export interface Props<TData> {
    data: TData[];
    columns: TableColumn<TData>[];
    idColumn: string & keyof TData;
}

const DataTable = <TData extends object>({ data, columns, idColumn }: Props<TData>) => {
    const bem = createBemGenerator("data-table");

    return (
        <div className={styles[bem()]}>
            {columns.map((column) => (
                <div key={column.key} className={styles[bem("column")]}>
                    <div className={classNames(styles[bem("cell")], styles[bem("cell", "header")])}>{column.label}</div>
                    {data.map((record) => (
                        <div key={`${record[idColumn]}`} className={styles[bem("cell")]}>
                            {record[column.key]}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default DataTable;
