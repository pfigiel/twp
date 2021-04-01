export type NotificationType = "success" | "error";

export interface AppNotification {
    type: NotificationType;
    message: string;
}
