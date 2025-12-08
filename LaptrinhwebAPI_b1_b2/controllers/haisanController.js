import { haisanRepo } from "../repositories/haisan.js";
const SANPHAM = function (chitiet) {
    this.MaSP = chitiet.MaSP;
    this.TenSP = chitiet.TenSP;
    this.MaLoai = chitiet.MaLoai;
    this.DonGia = chitiet.DonGia;
    this.DonViTinh = chitiet.DonViTinh;
    this.SoLuongTon = chitiet.SoLuongTon;
    this.NgayNhap = chitiet.NgayNhap;
};
export const gethaisan = async (req, res) => {
    try {
        const haisan = await haisanRepo.gethaisan();
        res.status(200).json(haisan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
};
export const gethaisanbyID = async (req, res) => {
    try {
        const masp = req.params.masp;
        const haisan = await haisanRepo.gethaisanbyID(masp);
        if (haisan.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy hải sản với mã sản phẩm đã cho" });
        }
        res.status(200).json(haisan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const addhaisan = async (req, res) => {
    try {
        const { MaSP, TenSP, MaLoai, DonGia,DonViTinh, SoLuongTon } = req.body;
        if (!MaSP || !TenSP || !MaLoai || !DonGia || !DonViTinh|| !SoLuongTon) {
            return res.status(400).json({ status: 400, message: "Vui lòng điền đầy đủ thông tin hải sản" });
        }
        const allHS = await haisanRepo.addhaisan({ MaSP, TenSP, MoTa, Gia, SoLuong });
        res.status(201).json({ status: 201, message: "Thêm hải sản thành công", data: allHS });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ status: 400, message: err.message });
    }
};
