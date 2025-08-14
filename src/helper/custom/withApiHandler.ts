import { sendApiError } from "./sendApiError";
import { ApiError } from "./apiError";

export function withApiHandler(handler: Function) {
  return async (...args: any) => {
    try {
      return await handler(...args);
    } catch (err: any) {
      if (err instanceof ApiError) {
        return sendApiError(err.data ?? null, err.message, err.status);
      }
      return sendApiError(err, "Unexpected error", 500);
    }
  };
}
