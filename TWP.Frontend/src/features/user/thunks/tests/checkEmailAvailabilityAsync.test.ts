import { makeApiRequest } from "api/utils";
import { mapObjectToQueryParameters } from "features/common/utils";
import { checkEmailAvailability } from "features/user/actions";
import { RootState } from "store";
import { createCancelToken } from "tests/utils";
import { mocked } from "ts-jest/utils";
import { checkEmailAvailabilityAsync } from "..";

jest.mock("api/utils", () => ({ ...(jest.requireActual("api/utils") as object), makeApiRequest: jest.fn() }));

describe("user", () => {
    describe("thunks", () => {
        describe("checkEmailAvailabilityAsync", () => {
            it("Should dispatch request action and call makeApiRequest.", async () => {
                // given
                const email = "email";
                const cancelToken = createCancelToken();
                const dispatch = jest.fn();
                const makeApiRequestMock = jest.fn();
                const thunk = checkEmailAvailabilityAsync(email, cancelToken);
                const api = {
                    checkEmailAvailabilityAsync: jest.fn(),
                };
                mocked(makeApiRequest).mockImplementation(makeApiRequestMock);

                // when
                await thunk(dispatch, () => ({} as RootState), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, checkEmailAvailability.request());
                expect(makeApiRequestMock).toHaveBeenCalledWith(
                    api.checkEmailAvailabilityAsync,
                    [mapObjectToQueryParameters({ email }), cancelToken],
                    checkEmailAvailability.success,
                    checkEmailAvailability.failure,
                    dispatch
                );
            });
        });
    });
});
