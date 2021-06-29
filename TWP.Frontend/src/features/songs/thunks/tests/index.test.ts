import { makeApiRequest } from "api/utils";
import { getSong, getSongs } from "features/songs/actions";
import { createCancelToken } from "tests/utils";
import { mocked } from "ts-jest/utils";
import { getSongAsync, getSongsAsync } from "..";

jest.mock("api/utils", () => ({ ...(jest.requireActual("api/utils") as object), makeApiRequest: jest.fn() }));

describe("songs", () => {
    describe("thunks", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        describe("getSongAsync", () => {
            it("Should dispatch request action and call makeApiRequest on request action.", async () => {
                // given
                const songId = 1;
                const cancelToken = createCancelToken();
                const dispatch = jest.fn();
                const getSongAsyncMock = jest.fn();
                const makeApiRequestMock = jest.fn();
                const api = { getSongAsync: getSongAsyncMock };
                const thunk = getSongAsync(songId, cancelToken);
                mocked(makeApiRequest).mockImplementation(makeApiRequestMock);

                // when
                await thunk(dispatch, jest.fn(), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, getSong.request());
                expect(makeApiRequestMock).toHaveBeenCalledWith(
                    api.getSongAsync,
                    [songId, cancelToken],
                    getSong.success,
                    getSong.failure,
                    dispatch
                );
            });
        });

        describe("getSongsAsync", () => {
            it("Should dispatch request action and call makeApiRequest on request action.", async () => {
                // given
                const cancelToken = createCancelToken();
                const dispatch = jest.fn();
                const getSongsAsyncMock = jest.fn();
                const makeApiRequestMock = jest.fn();
                const api = { getSongsAsync: getSongsAsyncMock };
                const thunk = getSongsAsync(cancelToken);
                mocked(makeApiRequest).mockImplementation(makeApiRequestMock);

                // when
                await thunk(dispatch, jest.fn(), api);

                // then
                expect(dispatch).toHaveBeenNthCalledWith(1, getSongs.request());
                expect(makeApiRequestMock).toHaveBeenCalledWith(
                    api.getSongsAsync,
                    [cancelToken],
                    getSongs.success,
                    getSongs.failure,
                    dispatch
                );
            });
        });
    });
});
