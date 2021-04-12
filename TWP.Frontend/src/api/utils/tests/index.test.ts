import { ApiError } from "api/types";
import { createApiError } from "tests/utils";
import { createAsyncAction } from "typesafe-actions";
import { makeApiRequest } from "..";

describe("api", () => {
    describe("utils", () => {
        describe("makeApiRequest", () => {
            const createTestAction = () =>
                createAsyncAction("TEST_REQUEST", "TEST_SUCCESS", "TEST_FAILURE")<void, void, ApiError>();

            it("Should call api method with provided arguments.", async () => {
                // given
                const action = createTestAction();
                const argumentOne = 1;
                const argumentTwo = "two";
                const dispatch = jest.fn();
                const method = jest.fn();

                // when
                await makeApiRequest(method, [argumentOne, argumentTwo], action.success, action.failure, dispatch);

                // then
                expect(method).toHaveBeenCalledWith(argumentOne, argumentTwo);
            });

            it("Should dispatch success action when api succeeds.", async () => {
                // given
                const action = createTestAction();
                const dispatch = jest.fn();
                const method = jest.fn();

                // when
                await makeApiRequest(method, [], action.success, action.failure, dispatch);

                // then
                expect(dispatch).toHaveBeenCalledWith(action.success());
            });

            it("Should dispatch failure action when api succeeds.", async () => {
                // given
                const error = createApiError();
                const action = createTestAction();
                const dispatch = jest.fn();
                const method = jest.fn().mockImplementation(() => {
                    throw error;
                });

                // when
                await makeApiRequest(method, [], action.success, action.failure, dispatch);

                // then
                expect(dispatch).toHaveBeenCalledWith(action.failure(error));
            });
        });
    });
});
