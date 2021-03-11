import { renderHook } from "@testing-library/react-hooks";
import { useRef } from "react";
import { mocked } from "ts-jest/utils";
import { useCreateCancelToken } from "..";

jest.mock("react", () => ({ ...(jest.requireActual("react") as any), useRef: jest.fn() }));

describe("api", () => {
    describe("hooks", () => {
        describe("useCreateCancelToken", () => {
            it("Should cancel created token on unmount.", () => {
                // given
                const cancel = jest.fn();
                mocked(useRef).mockReturnValue({ current: { cancel } });
                const { unmount } = renderHook(() => useCreateCancelToken());

                // when
                unmount();

                // then
                expect(cancel).toHaveBeenCalled();
            });
        });
    });
});
