import { pool } from "../services/mysql.js";
  // Lấy tất cả nhân viên
export const employeeRepo = {
  getemployee: async () => {
    const db = await pool;
    const [rows] = await db.query("SELECT * FROM NHANVIEN");
    return rows;
  },

  // Thêm nhân viên mới
  addemployee: async (newEmployee) => {
    const db = await pool;
    const [exists] = await db.query(
      "SELECT * FROM NHANVIEN WHERE maNV = ?", 
      [newEmployee.maNV]
    );
    if (exists.length > 0) throw new Error("Nhân viên đã tồn tại");
    await db.query(
      "INSERT INTO NHANVIEN (maNV, TenNV, GioiTinh, NgaySinh, email, SDT) VALUES (?, ?, ?, ?, ?, ?)",
      [newEmployee.maNV, newEmployee.TenNV, newEmployee.GioiTinh, newEmployee.NgaySinh, newEmployee.email, newEmployee.SDT || ""]
    );
    const [allEmployees] = await db.query("SELECT * FROM NHANVIEN");
    return allEmployees;
  },


  // Cập nhật thông tin nhân viên
    updateemployee: async (maNV, data) => {
    const db = await pool;
    const [exists] = await db.query(
      "SELECT * FROM NHANVIEN WHERE maNV = ?",
      [maNV]
    );
    if (exists.length === 0) throw new Error("Không tìm thấy nhân viên");
    await db.query(
      `UPDATE NHANVIEN
       SET TenNV = ?, GioiTinh = ?, NgaySinh = ?, email = ?, SDT = ?
       WHERE maNV = ?`,
      [
        data.TenNV,
        data.GioiTinh,
        data.NgaySinh,
        data.email,
        data.SDT,
        maNV
      ]
    );
    const [updated] = await db.query(
      "SELECT * FROM NHANVIEN WHERE maNV = ?",
      [maNV]
    );
    return updated[0];
  },
//xoa nhân viên
  deleteemployee: async (maNV) => {
    const db = await pool;
    const [exists] = await db.query(
      "SELECT * FROM NHANVIEN WHERE maNV = ?", [maNV]
    );
    if (exists.length === 0) {
      throw new Error("Không tìm thấy nhân viên để xoá");
    }
    await db.query("DELETE FROM NHANVIEN WHERE maNV = ?", [maNV]);
    return true;
}
};

