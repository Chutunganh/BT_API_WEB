import{date, z} from"zod";

export const CreateNhanVienDTO=z.object({
    MANV:z.string().int(),
    HOTEN:z.string({required_error:"HO TEN is required"}).max(100),
    NGAYSINH:z.string().date(),
    PHAI:z.enum("Nam","Nu",),
    DIACHI:z.string().max(100),
    MAPB:z.string().max(10),
});
export function validateCreateNhanVien(data){
    return CreateNhanVienDTO.parse(data);
};
//--------------------------------
export const CreateCongDTO = z.object({
  MACT: z.string().max(5),
  MANV: z.string().max(5),
  SLNGAYCONG: z.number().int().nonnegative()
});

export const validateCreateCong = (data) =>
  CreateCongDTO.parse(data);

//--------------------------------

export const CreateCongTrinhDTO = z.object({
  MACT: z.string().max(5),
  TENCT: z.string().max(100),
  DIADIEM: z.string().max(100),
  NGAYCAPGP: z.string().date(),
  NGAYKC: z.string().date()
});

export const validateCreateCongTrinh = (data) =>
  CreateCongTrinhDTO.parse(data);

//--------------------------------
