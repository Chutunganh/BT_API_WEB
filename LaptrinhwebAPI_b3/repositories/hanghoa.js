import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const hanghoaRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all hanghoa");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM hanghoa");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getByMaHang: async (MaHang) => {
    logger.info(`Repository: Fetching hanghoa with MaHang ${MaHang}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM hanghoa WHERE MaHang = ?", [MaHang]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaHang failed for MaHang ${MaHang}`, err);
      throw err;
    }
  },
    getBySoLuongCon: async (SoLuongCon) => {
    logger.info(`Repository: Fetching HangHoa with SoLuongCon ${SoLuongCon}`);
    try {
        const db = await pool;
        const [rows] = await db.query(
        `SELECT h.* 
        FROM HangHoa h 
        INNER JOIN LoaiHang l ON h.MaLoai = l.MaLoai 
        WHERE h.SoLuongCon < ?`,
        [SoLuongCon]
        );
        return rows; // trả về tất cả hàng hóa
    } catch (err) {
        logger.error(`Repository Error: getBySoLuongCon failed for SoLuongCon ${SoLuongCon}`, err);
        throw err;
    }
    },
    getGiaBanHienTai: async (MaHang) => {
    logger.info(`Repository: Fetching current price for MaHang ${MaHang}`);
    try {
      const db = await pool;
      const [rows] = await db.query(
        `SELECT g.Gia,g.DVTinh
         FROM GiaBan g
         WHERE g.MaHang = ?
         AND CURDATE() BETWEEN g.NgayBD AND g.NgayKT
         LIMIT 1`,
        [MaHang]
      );
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getGiaBanHienTai failed for MaHang ${MaHang}`, err);
      throw err;
    }
  },
  getHangHoaTheoKhoangGia: async (minPrice, maxPrice) => {
    try {
      const db = await pool;
      const [rows] = await db.query(
        `SELECT h.MaHang,h.SoLuongCon, g.Gia, g.DVTinh
        FROM HangHoa h
        JOIN GiaBan g ON h.MaHang = g.MaHang
        WHERE CURDATE() BETWEEN g.NgayBD AND g.NgayKT
        AND g.Gia BETWEEN ? AND ?`,
        [minPrice, maxPrice]
      );
      return rows;
    } catch (err) {
      throw err;
    }
  },

  getGiaBanTheoMaHang: async (MaHang) => {
    try {
      const db = await pool;
      const [rows] = await db.query(
        `SELECT h.MaHang, g.Gia AS GiaBan, g.DVTinh, g.NgayBD, g.NgayKT
        FROM HangHoa h
        JOIN GiaBan g ON h.MaHang = g.MaHang
        WHERE h.MaHang = ?`,
        [MaHang]
      );
      return rows; // trả về mảng JSON trực tiếp
    } catch (err) {
      throw err;
    }
  },

  Addgiaban: async (MaHang, Gia, DVTinh, NgayBD, NgayKT) => {
    const db = await pool;
    const [result] = await db.query(
      "INSERT INTO GiaBan (MaHang, Gia, DVTinh, NgayBD, NgayKT) VALUES (?, ?, ?, ?, ?)",
      [MaHang, Gia, DVTinh, NgayBD, NgayKT]
    );
    return result;
  },

  UpdateGiaBan: async ({ MaGB, Gia, DVTinh, NgayBD, NgayKT }) => {
    const db = await pool;
    const [result] = await db.query(
      `UPDATE GiaBan
       SET Gia = ?, DVTinh = ?, NgayBD = ?, NgayKT = ?
       WHERE MaGB = ?`,
      [Gia, DVTinh, NgayBD, NgayKT, MaGB]
    );
    return result;
  },

  DeleteGiaBan: async (MaGB) => {
    const db = await pool;
    const [result] = await db.query(
      `DELETE FROM GiaBan WHERE MaGB = ?`,
      [MaGB]
    );
    return result;
  },
};
