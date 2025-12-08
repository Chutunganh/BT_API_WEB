import { pool } from "../services/mysql.js";

export const SVRepo = {

    // Lấy toàn bộ sách
    getsv: async () => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM SINHVIEN");
        return rows;
    },
    // Lay sinh vien tren 40 tuoi
    getsvTren40: async () => {
    const db = await pool;
    const [rows] = await db.query(`
        SELECT *, YEAR(CURDATE()) - YEAR(NgaySinh) AS Tuoi
        FROM SINHVIEN
        WHERE YEAR(CURDATE()) - YEAR(NgaySinh) > 40;
    `);
    return rows;
    },
    //them sinh vien moi
    addsinhvien: async (newSV) => {
        const db = await pool;
        const [exists] = await db.query(
            "SELECT * FROM SINHVIEN WHERE maSV = ?", 
            [newSV.maSV]
        );
        if (exists.length > 0) throw new Error("Sinh viên đã tồn tại");
        await db.query(
            "INSERT INTO SINHVIEN (maSV, TenSV, GioiTinh, DiaChi,NgaySinh) VALUES (?, ?, ?, ?, ?)",
            [newSV.maSV, newSV.TenSV, newSV.GioiTinh, newSV.DiaChi,newSV.NgaySinh]
        );
        const [allSV] = await db.query("SELECT * FROM SINHVIEN");
        return allSV;
    },
    // Cập nhật thông tin sinh vien
    updatesinhvien: async (maSV, data) => {
        const db = await pool;
        const [exists] = await db.query(
            "SELECT * FROM SINHVIEN WHERE maSV = ?",[maSV]
        );
        if (exists.length === 0) throw new Error("Không tìm thấy sinh viên");
        await db.query(`UPDATE SINHVIEN
           SET TenSV = ?, GioiTinh = ?, DiaChi = ?, NgaySinh = ?
           WHERE maSV = ?`, [
            data.TenSV,
            data.GioiTinh,
            data.DiaChi,
            data.NgaySinh,
            maSV
            ]
        );
        const [updated] = await db.query(
            "SELECT * FROM SINHVIEN WHERE maSV = ?",
            [maSV]
        );
        return updated[0];
    },
    //xoa sinh vien
    deletesinhvien: async (maSV) => {
        const db = await pool;
        const [exists] = await db.query(
            "SELECT * FROM SINHVIEN WHERE maSV = ?", [maSV]
        );
        if (exists.length === 0) {
            throw new Error("Không tìm thấy sinh viên để xoá");
        }
        await db.query("DELETE FROM SINHVIEN WHERE maSV = ?", [maSV]);
        return true;
    }
};