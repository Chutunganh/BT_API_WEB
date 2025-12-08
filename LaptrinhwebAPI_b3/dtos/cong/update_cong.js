export const UpdateCongDTO = z.object({
  MACT: z.string().max(10).optional(),
  MANV: z.string().max(10).optional(),
  SLNGAYCONG: z.number().int().optional(),
});

export function validateUpdateCong(data) {
  return UpdateCongDTO.parse(data);
}