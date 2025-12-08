import express from "express";
import { getUsers } from "../controllers/userController.js";
import { getAllAccounts,getAccountByTenTK,getAccountByMoTa,checkaccounts,addaccounts,addindextoaccounts,
updateaccounts,deleteaccounts} from "../controllers/taikhoanController.js";
import { addemployee, deleteemployee, getemployee , getemployeeSEX ,updateemployee} from "../controllers/employeeController.js";
import { getbookbyid, getbooks,addbook,updatebook, deletebook} from "../controllers/bookController.js";
import { getsv,getsvTren40,addsinhvien,updatesinhvien,deletesinhvien} from "../controllers/sinhvienController.js";
import { gethaisan,gethaisanbyID} from "../controllers/haisanController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to API route" });
});

// users
router.get("/users/", getUsers);

// accounts
router.get("/accounts/", getAllAccounts);
router.get("/accounts/:tentk", getAccountByTenTK);
router.get("/accounts/mota/:mota", getAccountByMoTa);
router.post("/accounts/check", checkaccounts);
router.post("/accounts", addaccounts);
router.post("/accounts/:index", addindextoaccounts);
router.put("/accounts/:tentk", updateaccounts);
router.delete("/accounts/:tentk", deleteaccounts);

// -----------------------NHANVIEN---------------------------
// ten nhan vien 
router.get("/employee/", getemployee);
// gioi tinh nhan vien
router.get("/employee/sex/:gioitinh", getemployeeSEX);
// them nhan vien moi
router.post("/employee/addemployee", addemployee);
// sua thong tin nhan vien
router.put("/employee/:maNV", updateemployee);
// xoa nhan vien
router.delete("/employee/:maNV", deleteemployee);


//-----------------------SACH---------------------------
// Lay tat ca sach
router.get("/books/", getbooks);
//lay sach theo id sach
router.get("/books/:mash", getbookbyid);
//them sach moi 
router.post("/books/addbook", addbook);
//sua thong tin sach
router.put("/books/:mash", updatebook);
// xoa sach
router.delete("/books/:mash",deletebook);
export default router;

// -----------------------SINHVIEN---------------------------
router.get("/sinhvien/", getsv);
//lay sinh vien tren 40 tuoi
router.get("/sinhvien/up40", getsvTren40);
//them sinh vien moi
router .post("/sinhvien/addsinhvien", addsinhvien);
///sua thong tin sinh vien
router.put("/sinhvien/:maSV", updatesinhvien);
//xoa sinh vien
router.delete("/sinhvien/:maSV",deletesinhvien);

//-----------------------HAISAN---------------------------
router.get("/haisan/",gethaisan);
router.get("/haisan/:masp",gethaisanbyID);
router.get("/haisan/:masp",gethaisanbyID);