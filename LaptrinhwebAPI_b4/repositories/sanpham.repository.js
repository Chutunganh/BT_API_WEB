import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const sanphamRepository={
    getAll:async() =>{
        try{
            logger.info(" Repository: Fetching all sanpham");
            const db =await pool;
            const [rows]=await db.query("SELECT*FROM SanPham");
            return rows;
        }catch (err){
        logger.error("Repository Error: getAll failed", err);
        throw err;
        }
    },
    getByMa: async (Ma) => {
    try {
        const db = await pool;
        const [rows] = await db.query("SELECT * FROM SanPham WHERE Ma = ?", [Ma]);
        return rows[0];
    } catch (err) {
        logger.error("Repository Error: getByMa failed", err);
        throw err;
    }
    },

    Addsanpham: async ({ Ten, DonGia, MaDanhMuc }) => {
    try {
      const db = await pool;
      const [result] = await db.query(
        "INSERT INTO SanPham (Ten, DonGia, MaDanhMuc) VALUES ( ?, ?,?)",
        [Ten, DonGia, MaDanhMuc || null]
      );
      return {Ma: result.insertId, Ten, DonGia, MaDanhMuc };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },
      Updatesanpham: async (ma, sanpham) => {
    try {
    const { Ten, DonGia, MaDanhMuc } = sanpham;
      const db = await pool;
    const [result] = await db.query(
      "UPDATE SanPham SET Ten = ?, DonGia = ?, MaDanhMuc = ? WHERE Ma = ?",
      [Ten, DonGia, MaDanhMuc || null, Ma]
    );
      return { Ma: ma, Ten, DonGia, MaDanhMuc };
    } catch (err) {
      logger.error("Repository Error: update failed", err);
      throw err;
    }
  },
    deletesanpham: async (ma) => {
    await pool.execute('DELETE FROM SanPham WHERE Ma = ?', [ma]);
    return true;
  },
    searchsanpham: async (keyword) => {
    try {
        const db = await pool;
        const [rows] = await db.query(
        `SELECT Ma, Ten, DonGia, MaDanhMuc 
        FROM SanPham
        WHERE Ten LIKE ?`,
        [`%${keyword}%`]
        );
        return rows; // trả về mảng sản phẩm
    } catch (err) {
        logger.error("Repository Error: searchByName failed", err);
        throw err;
    }
    },

    paginateAndSort: async (page = 1, size = 10, sort = "DonGia", order = "ASC") => {
    try {
      const db = await pool;
      const offset = (page - 1) * size;
      const [rows] = await db.query(
        `SELECT Ma, Ten, DonGia, MaDanhMuc
         FROM SanPham
         ORDER BY ${sort} ${order}
         LIMIT ? OFFSET ?`,
        [Number(size), Number(offset)]
      );
      return rows;
    } catch (err) {
      logger.error("Repository Error: paginateAndSort failed", err);
      throw err;
    }
  },

  // 10. Thống kê sản phẩm theo danh mục (chỉ dựa trên MaDanhMuc trong SanPham)
  countByDanhMuc: async () => {
    try {
      const db = await pool;
      const [rows] = await db.query(
        `SELECT MaDanhMuc, COUNT(*) AS SoLuongSanPham
         FROM SanPham
         GROUP BY MaDanhMuc`
      );
      return rows;
    } catch (err) {
      logger.error("Repository Error: countByDanhMuc failed", err);
      throw err;
    }
  }
};
