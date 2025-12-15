import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { hanghoaController } from "../controllers/hanghoa.controller.js";
import { danhmucController } from "../controllers/danhmuc.controller.js";
import { sanphamController } from "../controllers/sanpham.controller.js";

const router = Router();

// ----------------------- USERS -------------------------------------
router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

// ----------------------- HANGHOAS -------------------------------------
router.get("/hanghoas", hanghoaController.getAll);
router.get("/hanghoas/:MaLoai", hanghoaController.getByMaLoai);
//------------------------sanpham&danhmuc------------------------------
router.get("/danhmuc",danhmucController.getAll);
router.get("/sanpham",sanphamController.getAll);
router.get("/sanpham/:ma",sanphamController.getByMa);
router.post("/sanpham",sanphamController.Addsanpham);
router.put("/sanpham/:ma",sanphamController.Updatesanpham);
router.delete("/sanpham/:ma",sanphamController.deletesanpham);
router.get("/timkiem",sanphamController.searchByTen);
router.get("/paginate", sanphamController.paginateAndSort);
router.get("/countbydanhmuc", sanphamController.countByDanhMuc);

export default router;
