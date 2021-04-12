import { makeApiRequest } from "api/utils";
import { mapObjectToQueryParameters } from "features/common/utils";
import { checkUsernameAvailability } from "features/user/actions";
import { RootState } from "store";
import { createCancelToken } from "tests/utils";
import { mocked } from "ts-jest/utils";
import { checkUsernameAvailabilityAsync } from "..";

jest.mock("api/utils", () => ({ ...(jest.requireActual("api/utils") as object), makeApiRequest: jest.fn() }));

describe("user", () => {
    describe("thunks", () => {
        describe("checkUsernameAvailabilityAsync", () => {
            it("Should dispatch request action and call makeApiRequest.", async () => {
                // given
                const username = "username";
                const cancelToken = createCancelToken();
                const dispatch = jest.fn();
                const makeApiRequestMock = jest.fn();
                const thunk = checkUsernameAvailabilityAsync(username, cancelToken);
                const api = {
                    checkUsernameAvailabilityAsync: jest.fn(),
                };
                mocked(makeApiRequest).mockImplementation(makeApiRequestMock);

                // when
                await thunk(dispatch, () => ({} as RootState), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, checkUsernameAvailability.request());
                expect(makeApiRequestMock).toHaveBeenCalledWith(
                    api.checkUsernameAvailabilityAsync,
                    [mapObjectToQueryParameters({ username }), cancelToken],
                    checkUsernameAvailability.success,
                    checkUsernameAvailability.failure,
                    dispatch
                );
            });
        });
    });
});
