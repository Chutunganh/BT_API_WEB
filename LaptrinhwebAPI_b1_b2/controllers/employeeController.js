import { employeeRepo } from "../repositories/employee.js";
// lay tat ca nhan vien
export const getemployee = async (req, res) => {
  try {
    const employee = await employeeRepo.getemployee();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// loc nhan vien theo gioi tinh
export const getemployeeSEX = async (req, res) => {
  try {
    const gioitinh = req.params.gioitinh;

    // Hàm chuẩn hóa: bỏ dấu + lowercase
    const normalize = str => str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const employees = await employeeRepo.getemployee();

    const result = employees.filter(emp => 
      normalize(emp.GioiTinh) === normalize(gioitinh)
    );

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// them nhan vien moi 

export const addemployee = async (req, res) => {
  try {
    const { maNV, TenNV, GioiTinh, NgaySinh, email, SDT } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!maNV || !TenNV || !GioiTinh || !NgaySinh || !email) {
      return res.status(400).json({ status: 400, message: "Vui lòng điền đầy đủ thông tin nhân viên" });
    }

    const allEmployees = await employeeRepo.addemployee({ maNV, TenNV, GioiTinh, NgaySinh, email, SDT });
    res.status(201).json({ status: 201, message: "Thêm nhân viên thành công", data: allEmployees });
  } catch (err) {
    console.error(err);
    res.status(400).json({ status: 400, message: err.message });
  }
};
//sưa thong tin nhan vien
export const updateemployee = async (req, res) => {
  try {
    const maNV = req.params.maNV;
    const { TenNV, GioiTinh, NgaySinh, email, SDT } = req.body;

    if (!TenNV || !GioiTinh || !NgaySinh || !email) {
      return res.status(400).json({status: 400,message: "Vui lòng điền đầy đủ thông tin"});
    }
    const updated = await employeeRepo.updateemployee(maNV,{TenNV,GioiTinh,NgaySinh,email,SDT});
    res.status(200).json({status: 200,message: "Cập nhật nhân viên thành công",data: updated});
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message
    });
  }
};

// xoa nhan vien
export const deleteemployee = async (req, res) => {
  try {
    const maNV = req.params.maNV;
    if (!maNV) {
      return res.status(400).json({status: 400,message: "Thiếu mã nhân viên (maNV)"});
    }
    await employeeRepo.deleteemployee(maNV);
    res.status(200).json({status: 200,message: "Xoá nhân viên thành công"});
  } catch (err) {
    res.status(400).json({status: 400,message: err.message});
  }
};

