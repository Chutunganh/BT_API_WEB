
import {z} from "zod";
export const UpdateNhanVienDTO = z.object({
    MANV: z.string().int().optional(),
    HOTEN: z.string().max(100).optional(),
    NGAYSINH: z.string().optional(),
    PHAI: z.enum(["Nam", "Nu"]).optional(),
    DIACHI: z.string().max(100).optional(),
    MAPB: z.string().max(10).optional(),
});
export function validateUpdateNhanVien(data){
    return UpdateNhanVienDTO.parse(data);
}

//--------------------------------

export const UpdatePhongBanDTO = z.object({
  MAPB: z.string().max(10).optional(),
  TENPB: z.string().max(100).optional(),
});

export function validateUpdatePhongBan(data) {
  return UpdatePhongBanDTO.parse(data);
}

//--------------------------------

export const UpdateCongTrinhDTO = z.object({
  MACT: z.string().max(10).optional(),
  TENCT: z.string().max(100).optional(),
  DIADIEM: z.string().max(100).optional(),
  NGAYCAPGP: z.date().optional(),
  NGAYKC: z.date().optional(),
});

export function validateUpdateCongTrinh(data) {
  return UpdateCongTrinhDTO.parse(data);
}

//--------------------------------
