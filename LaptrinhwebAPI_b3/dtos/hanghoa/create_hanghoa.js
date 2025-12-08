import{z} from"zod";

export const CreateHangHoaDTO=z.object({
    Mathang:z.number().optional(),
    Maloai:z.int(),
    TenHang:z.string({required_error:"TenHang is required"}).max(100),
    SoLuong:z.int()>0,
    SoLuongCon:z.int()>0,
});
export function validateCreateHangHoa(data){
    return CreateHangHoaDTO.parse(data);
};