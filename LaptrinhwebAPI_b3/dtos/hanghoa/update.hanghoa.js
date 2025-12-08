import {z} from "zod";
export const UpdateHangHoaDTO = z.object({
    Maloai: z.int().optional(),
    TenHang: z.string().max(100).optional(),
    SoLuong: z.int().gt(0).optional(),
    SoLuongCon: z.int().gt(0).optional(),
});

export function validateUpdateHangHoa(data){
    return UpdateHangHoaDTO.parse(data);
};
