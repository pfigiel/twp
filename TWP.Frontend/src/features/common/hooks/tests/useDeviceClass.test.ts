import { renderHook } from "@testing-library/react-hooks";
import config from "config";
import { DeviceClass } from "features/common/types";
import each from "jest-each";
import { fireHookWindowResizeEvent, overrideImmutableProperty } from "tests/utils";
import { useDeviceClass } from "..";

describe("common", () => {
    describe("hooks", () => {
        describe("useDeviceClass", () => {
            each([
                ["smartphone", config.deviceBreakpoints.smartphone - 1],
                ["tablet", config.deviceBreakpoints.tablet - 1],
                ["desktop", config.deviceBreakpoints.tablet],
            ]).it(
                "Should initially return %p device class when viewport width is %p.",
                (deviceClass: DeviceClass, viewportWidth: number) => {
                    // given
                    overrideImmutableProperty(window, "innerWidth", viewportWidth);

                    // when
                    const { result } = renderHook(() => useDeviceClass());

                    // then
                    expect(result.current).toBe(deviceClass);
                }
            );

            each([
                ["smartphone", "tablet", config.deviceBreakpoints.smartphone - 1, config.deviceBreakpoints.smartphone],
                ["smartphone", "desktop", config.deviceBreakpoints.smartphone - 1, config.deviceBreakpoints.tablet],
                ["tablet", "smartphone", config.deviceBreakpoints.tablet - 1, config.deviceBreakpoints.smartphone - 1],
                ["tablet", "desktop", config.deviceBreakpoints.tablet - 1, config.deviceBreakpoints.tablet],
                ["desktop", "smartphone", config.deviceBreakpoints.tablet, config.deviceBreakpoints.smartphone - 1],
                ["desktop", "tablet", config.deviceBreakpoints.tablet, config.deviceBreakpoints.tablet - 1],
            ]).it(
                "Should change returned device class from %p to %p when viewport width changes from %p to %p.",
                (_: DeviceClass, newDeviceClass: DeviceClass, oldViewportWidth: number, newViewportWidth: number) => {
                    // given
                    overrideImmutableProperty(window, "innerWidth", oldViewportWidth);
                    const { result, rerender } = renderHook(() => useDeviceClass());

                    // when
                    overrideImmutableProperty(window, "innerWidth", newViewportWidth);
                    fireHookWindowResizeEvent();
                    rerender();

                    // then
                    expect(result.current).toBe(newDeviceClass);
                }
            );
        });
    });
});
