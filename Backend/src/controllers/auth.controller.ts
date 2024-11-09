import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount } from "../services/auth.service";

const registerSchema = z
  .object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(8).max(30),
    confirmPassword: z.string().min(8).max(30),
    userAgent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerHandler = catchErrors(async (req, res) => {
  // Validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"] || "unknown", // Default if undefined
  });

  // Ensure `userAgent` is always a string
  const accountParams = {
    ...request,
    userAgent: request.userAgent || "unknown", // Just a safeguard
  };

  // Call service
  const { user, accessToken, refreshToken } = await createAccount(
    accountParams
  );

  // Return response
});
