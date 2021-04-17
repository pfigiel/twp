import classNames from "classnames";
import { createBemGenerator } from "features/common/utils";
import { ReactElement } from "react";
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

export interface TableAction {
    icon: ReactElement;
    onClick: (id: number) => void;
}

export interface Props<TData> {
    ["data-testid"]?: string;
    data: TData[];
    columns: TableColumn<TData>[];
    idColumn: string & keyof TData;
    actions?: TableAction[];
}

const DataTable = <TData extends object>({
    "data-testid": testId = "data-table",
    data,
    columns,
    idColumn,
    actions,
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
            {actions?.length && (
                <div className={classNames(styles[bem("column")], styles[bem("column", "action")])}>
                    <div className={classNames(styles[bem("cell")], styles[bem("cell", "header")])} />
                    {data.map((record) => (
                        <div key={`${record[idColumn]}`} className={styles[bem("cell")]}>
                            {actions.map((action, index) => (
                                <div
                                    key={index}
                                    className={styles[bem("action-button")]}
                                    onClick={() => action.onClick((record[idColumn] as unknown) as number)}>
                                    {action.icon}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DataTable;
