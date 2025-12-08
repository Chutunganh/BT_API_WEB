import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { hanghoaController } from "../controllers/hanghoaController.js";
import { NhanvienController } from "../controllers/nhanvienController.js";
const router = Router();
//---------------------user--------------------------
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

//---------------------hanghoa------------------------
router.get("/hanghoa",hanghoaController.getAll);
router.get("/hanghoa/:MaHang", hanghoaController.getByMaHang);
router.get("/hanghoa/tenloai/:tenLoai", hanghoaController.getByTenLoai);
router.get("/hanghoa/soluong/:SoLuongCon", hanghoaController.getBySoLuongCon);
router.get("/hanghoa/giaban/:MaHang", hanghoaController.getGiaBanHienTai);
router.get("/hanghoa/khoanggia/:minPrice/:maxPrice", hanghoaController.getHangHoaTheoKhoangGia);
router.get("/hanghoa/giaban/all/:mahang", hanghoaController.getGiaBanTheoMaHang);
//---------------------giaban------------------------
router.post("/giaban", hanghoaController.AddGiaBan);
router.put("/giaban", hanghoaController.UpdateGiaBan);
router.delete("/giaban/:MaGB", hanghoaController.DeleteGiaBan);

//---------------------nhanvien------------------------
router.get("/nhanvien", NhanvienController.getAll);
router.get("/nhanvien/:MANV", NhanvienController.getByMANV);
router.get("/phongban/:TENPB",NhanvienController.getByTenPhongBan)
router.get("/cong/:MACT",NhanvienController.getByMACT)
export default router;
