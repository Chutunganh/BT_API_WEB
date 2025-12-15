import { z } from "zod";

export const updateSanPhamSchema = z.object({
  Ma: z.number({ required_error: "Ma is required" }),
  Ten: z.string({required_error: "Ten is required" }).max(100),
  DonGia:z.int()>0,
  MaDanhMuc:z.number({ required_error: "MaDanhMuc is required" })
});

export function validateCreateSanPham(data) {
  return updateSanPhamSchema.parse(data);
}
