import { z } from "zod";
import { IdSchema } from "./general.validation";
import { InvitationStatus } from "../models/invitation.model";

export const InvitationValidationSchema = z.object({
  squadId: IdSchema,
  inviteeId: IdSchema,
  inviterId: IdSchema,
});

export const InvitationUpdateSchema = z.object({
  squadId: IdSchema.optional(),
  inviteeId: IdSchema.optional(),
  inviterId: IdSchema.optional(),
  status: z.nativeEnum(InvitationStatus).optional(),
});
