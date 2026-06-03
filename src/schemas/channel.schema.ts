import { Provider } from "@/generated/prisma/enums";
import { z } from "zod";

export const channelSchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "Channel must have at least 3 characters")
    .max(20, "Channel must have less than 20 characters"),
  link: z
    .string()
    .trim()
    .toLowerCase()
    .transform((value) => value.replaceAll("acestream://", ""))
    .pipe(z.string().length(40, "Invalid Acestream Id")),
  provider: z.enum(Provider),
});
