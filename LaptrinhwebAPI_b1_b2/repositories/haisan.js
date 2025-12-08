import { pool } from "../services/myapi.js";

export const haisanRepo = {
    // lay tat ca hai san
    gethaisan: async () => {
        const [rows] =  await pool.query("SELECT * FROM SANPHAM");
        return rows;
    },
    // lay hai san theo ID
    gethaisanbyID: async (MaSP) => {
        const [rows] =  await pool.query("SELECT * FROM SANPHAM WHERE MaSP = ?", [MaSP]);
        return rows;
    },
    addhaisan: async (newHS) => {
        const db = await pool;
        const [exists] = await db.query(
            "SELECT * FROM SANPHAM WHERE MaSP = ?", 
            [newHS.MaSP]
        );
        if (exists.length > 0) throw new Error("Hải sản đã tồn tại");
        await db.query(
            "INSERT INTO SANPHAM (MaSP, TenSP, MoTa, Gia, SoLuong) VALUES (?, ?, ?, ?, ?)",
            [newHS.MaSP, newHS.TenSP, newHS.MoTa, newHS.Gia, newHS.SoLuong]
        );
        const [allHS] = await db.query("SELECT * FROM SANPHAM");
        return allHS;
    },
};