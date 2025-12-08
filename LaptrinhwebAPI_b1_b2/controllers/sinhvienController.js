import e from "express";
import { SVRepo } from "../repositories/sinhvien.js";
// lay tat ca sach
export const getsv = async (req, res) => {
    try {
        const sinhvien = await SVRepo.getsv();
        res.status(200).json(sinhvien);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// lay sinh vien tren 40 tuoi
export const getsvTren40 = async (req, res) => {
    try {
        const sinhvien = await SVRepo.getsvTren40();
        if (sinhvien.length === 0) {
            return res.status(404).json({ message: "Không có sinh viên nào trên 40 tuổi" });
        }
        res.status(200).json(sinhvien);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Them sinh vien moi
export const addsinhvien = async (req, res) => {
    try {
        const { maSV, TenSV, GioiTinh, DiaChi, NgaySinh } = req.body;
        if (!maSV || !TenSV || !GioiTinh || !DiaChi || !NgaySinh) {
            return res.status(400).json({ status: 400, message: "Vui lòng điền đầy đủ thông tin sinh viên" });
        }
        const allSV = await SVRepo.addsinhvien({ maSV, TenSV, GioiTinh, DiaChi, NgaySinh });
        res.status(201).json({ status: 201, message: "Thêm sinh viên thành công", data: allSV });
    } catch (err) {
        console.error(err);
        res.status(400).json({ status: 400, message: err.message });
    }   
};
// sua thong tin sinh vien
export const updatesinhvien = async (req, res) => {
    try {
        const maSV = req.params.maSV;
        const { TenSV, GioiTinh, DiaChi, NgaySinh } = req.body;
        if (!TenSV || !GioiTinh || !DiaChi || !NgaySinh) {
            return res.status(400).json({status: 400,message: "Vui lòng điền đầy đủ thông tin"});
        }
        const updated = await SVRepo.updatesinhvien(maSV,{TenSV,GioiTinh,DiaChi,NgaySinh});
        res.status(200).json({status: 200,message: "Cập nhật sinh viên thành công",data: updated});
    } catch (err) {
        res.status(400).json({
            status: 400,
            message: err.message
        });
    }   
};
// xoa sinh vien
export const deletesinhvien = async (req, res) => { 
    try {
    const maSV = req.params.maSV;
    if (!maSV) {
      return res.status(400).json({status: 400,message: "Thiếu mã sinh viên (maSV)"});
    }   
    await SVRepo.deletesinhvien(maSV);
    res.status(200).json({status: 200,message: "Xoá sinh viên thành công"});
  } catch (err) {
    res.status(400).json({status: 400,message: err.message});
  } 
};
