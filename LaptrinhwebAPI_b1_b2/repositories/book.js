
import { pool } from "../services/mysql.js";

export const bookRepo = {

    // Lấy toàn bộ sách
    getbooks: async () => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM SACH");
        return rows;
    },

    // Lấy sách theo MASH
    getbookbyid: async (mash) => {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM SACH WHERE MASH = ?", [mash]);
        return rows;
    },
    //them sach moi
    addbook: async (newBook) => {
        const db = await pool;
        const [exists] = await db.query(
            "SELECT * FROM SACH WHERE MASH = ?",
            [newBook.MASH]
        );
        if (exists.length > 0) throw new Error("Sách đã tồn tại");
        await db.query("INSERT INTO SACH (MASH, TENSACH, TACGIA, NHAXB, NAMXB) VALUES (?, ?, ?, ?, ?)",
            [newBook.MASH, newBook.TENSACH, newBook.TACGIA, newBook.NHAXB, newBook.NAMXB]
        );
        const [allbooks] = await db.query("SELECT * FROM SACH");
        return allbooks;
    },
    //sua thong tin sach
    updatebook: async (mash, data) => {
        const db = await pool;
        const [exists] = await db.query(
            "SELECT * FROM SACH WHERE MASH = ?",
            [mash]
        );
        if (exists.length === 0) throw new Error("Không tìm thấy sách");
        await db.query(
          ` UPDATE SACH
        SET TENSACH = ?, TACGIA = ?, NHAXB = ?, NAMXB = ?
        WHERE MASH = ?`,
            [data.TENSACH, data.TACGIA, data.NHAXB, data.NAMXB, mash]
        );
        return await bookRepo.getbookbyid(mash);
    },
    //xoa sach
    deletebook: async (mash) => {
        const db = await pool;
        const [exists] = await db.query(
            "SELECT * FROM SACH WHERE MASH = ?", [mash]
        );
        if (exists.length === 0) {
            throw new Error("Không tìm thấy sách");
        }
        await db.query("DELETE FROM SACH WHERE MASH = ?", [mash]);
        return true;
    }
};



