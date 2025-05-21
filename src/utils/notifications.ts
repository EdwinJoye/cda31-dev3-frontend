import { notifications } from "@mantine/notifications";

interface NotificationOptions {
  title?: string;
  message?: string;
  autoClose?: number;
  withCloseButton?: boolean;
}

export const notifyError = ({
  title = "error",
  message = "",
  autoClose = 5000,
  withCloseButton = true,
}: NotificationOptions) => {
  notifications.show({
    title: title,
    message: message,
    color: "red",
    autoClose,
    withCloseButton,
  });
};

export const notifySuccess = ({
  title = "success",
  message = "",
  autoClose = 4000,
  withCloseButton = true,
}: NotificationOptions) => {
  notifications.show({
    title: title,
    message: message,
    color: "green",
    autoClose,
    withCloseButton,
  });
};

export const notifyInfo = ({
  title = "info",
  message = "",
  autoClose = 3000,
  withCloseButton = true,
}: NotificationOptions) => {
  notifications.show({
    title: title,
    message: message,
    color: "blue",
    autoClose,
    withCloseButton,
  });
};
