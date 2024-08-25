import * as Sentry from "@sentry/react";

export const handleResponse = async (response: Response) => {
  const result = await response.json();

  if (!response.ok) {
    const status = response.status;
    const message = result.message || "An unknown error occurred";

    if (!(status >= 400 && status < 500)) {
      Sentry.captureException(new Error(message), {
        extra: { result },
      });
    }

    throw new Error(message);
  }

  return result.data;
};
