import { render } from "@testing-library/react";
import DataTable, { Props, TableColumn } from "..";

describe("common", () => {
    describe("components", () => {
        const testId = "data-table";

        interface TestData {
            id: number;
            testOne: number;
            testTwo: string;
        }

        const testColumns: TableColumn<TestData>[] = [
            {
                key: "id",
                hidden: true,
            },
            {
                key: "testOne",
                label: "Test One",
            },
            {
                key: "testTwo",
                label: "Test One",
            },
        ];

        const testData: TestData[] = [
            {
                id: 1,
                testOne: 1,
                testTwo: "One",
            },
            {
                id: 2,
                testOne: 2,
                testTwo: "Two",
            },
            {
                id: 3,
                testOne: 3,
                testTwo: "Three",
            },
        ];

        describe("DataTable", () => {
            const renderComponent = (props: Partial<Props<TestData>> = {}) => {
                const { data = testData, columns = testColumns, idColumn = "id" } = props;

                return render(<DataTable data-testid={testId} data={data} columns={columns} idColumn={idColumn} />);
            };

            it("Should render non-hidden header cells.", () => {
                // given
                const nonHiddenColumns = testColumns.filter((column) => !column.hidden);

                // when
                const { getAllByTestId } = renderComponent();

                // then
                const headerCells = getAllByTestId(`${testId}__header-cell`);

                expect(headerCells).toHaveLength(nonHiddenColumns.length);
                headerCells.forEach((cell, index) => expect(cell).toHaveTextContent(nonHiddenColumns[index].label!));
            });

            it("Should render data.", () => {
                // given
                const nonHiddenColumns = testColumns.filter((column) => !column.hidden);

                // given & when
                const { getAllByTestId } = renderComponent();

                // then
                for (const key of nonHiddenColumns.map((column) => column.key)) {
                    const columnCells = getAllByTestId(`${testId}__cell-${key}`);

                    expect(columnCells).toHaveLength(testData.length);
                    columnCells.forEach((cell, index) => expect(cell).toHaveTextContent(`${testData[index][key]}`));
                }
            });
        });
    });
});
