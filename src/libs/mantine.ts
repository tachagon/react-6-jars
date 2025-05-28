import { type AxiosError } from "axios";
import { type UseFormReturnType } from "@mantine/form";

interface StrapiError {
    path?: string[];
    message: string;
}

export const handleStrapiFieldErrors = (
  errorResponse: AxiosError<{
    error: {
      details: {
        errors: Array<StrapiError>;
      };
    };
  }>,
  form: UseFormReturnType<any>
) => {
  const errors = errorResponse?.response?.data?.error?.details?.errors

  if (Array.isArray(errors)) {
    errors.forEach((err: StrapiError) => {
      const field = err.path?.[0]
      const message = err.message
      if (field && message) {
        form.setFieldError(field, message)
      } else {
        console.error("Unexpected error format:", err)
      }
    })
  }
}
