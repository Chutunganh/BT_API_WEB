
export const CreatePhongBanDTO = z.object({
  MAPB: z.string().max(5),
  TENPB: z.string().max(100)
});

export const validateCreatePhongBan = (data) =>
  CreatePhongBanDTO.parse(data);

