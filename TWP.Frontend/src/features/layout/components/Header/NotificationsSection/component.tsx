import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { usePrevious } from "features/common/hooks";
import { createBemGenerator } from "features/common/utils";
import { AppNotification, NotificationType } from "features/layout/types";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const notificationTimeoutMs = 3000;
const maxNotificationsToShow = 5;

export interface Props {
    notifications: AppNotification[];
    removeNotification: (index: number) => void;
    removeLastNotification: () => void;
}

const NotificationsSection = ({ notifications, removeNotification, removeLastNotification }: Props) => {
    const bem = createBemGenerator("notifications-section");

    const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);
    const [lastNotificationType, setLastNotificationType] = useState<NotificationType>();

    const previousLocationsCount = usePrevious(notifications.length);

    const notificationsToShow = notifications.slice(
        Math.max(0, notifications.length - maxNotificationsToShow),
        notifications.length
    );

    const onNotificationClose = (index: number) => {
        clearTimeout(timeouts[index]);

        const newTimeouts = [...timeouts];
        newTimeouts.splice(index, 1);
        setTimeouts(newTimeouts);

        removeNotification(index);
    };

    useEffect(() => {
        if (notifications.length > (previousLocationsCount ?? 0)) {
            setTimeouts((prev) => [...prev, setTimeout(() => removeLastNotification(), notificationTimeoutMs)]);
        }
    }, [notifications.length, previousLocationsCount, removeLastNotification]);

    useEffect(() => {
        if (notificationsToShow.length) {
            setLastNotificationType(notificationsToShow[notificationsToShow.length - 1].type);
        }
    }, [notificationsToShow]);

    return (
        <>
            <div
                className={classNames(
                    styles[bem()],
                    {
                        [styles[bem(undefined, "error")]]: lastNotificationType === "error",
                    },
                    {
                        [styles[bem(undefined, "success")]]: lastNotificationType === "success",
                    }
                )}
                style={{ height: `${2 * notificationsToShow.length}rem` }}>
                {notificationsToShow.map((notification, index) => (
                    <div
                        key={`${notification}${index}`}
                        className={classNames(
                            styles[bem("notification")],
                            {
                                [styles[bem("notification", "error")]]: notification.type === "error",
                            },
                            {
                                [styles[bem("notification", "success")]]: notification.type === "success",
                            }
                        )}>
                        <div className={styles[bem("notification-text")]}>{notification.message}</div>
                        <div className={styles[bem("close-button")]} onClick={() => onNotificationClose(index)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NotificationsSection;
