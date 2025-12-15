import { z } from "zod";

export const updateDanhMucSchema = z.object({
  MaDanhMuc: z.int(),
  TenDanhMuc: z.string({required_error: "TenHang is required" }).max(100),
});

export function validateUpdateDanhMuc(data) {
  return updateDanhMucSchema.parse(data);
}
