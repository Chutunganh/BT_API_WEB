import {pool} from "../config/database.js";
import {logger} from "../config/logger.js";

export const NhanvienRepository = {
    getAll: async () => {
        try {
            const db = await pool;
            const [rows] = await db.query("SELECT * FROM NhanVien");
            return rows;
        } catch (err) {
            logger.error("Repository Error: getAll NhanVien failed", err);
            throw err;
        }
    },
    getByMANV: async (MANV) => {
        try {
            const db = await pool;
            const [rows] = await db.query("SELECT * FROM NhanVien WHERE MANV = ?", [MANV]);
            return rows[0];
        } catch (err) {
            logger.error(`Repository Error: getByMANV failed for MANV ${MANV}`, err);
            throw err;
        }
    },
     getByTenPhongBan: async (TENPB) => {
        try {
            const db = await pool;
            const [rows] = await db.query(
                `
                SELECT nv.*
                FROM NhanVien nv
                JOIN PhongBan pb ON nv.MAPB = pb.MAPB
                WHERE pb.TENPB = ?
                `,
                [TENPB]
            );
            return rows;
        } catch (err) {
            logger.error(`Repository Error: getByTenPhongBan failed for TENPB ${TENPB}`, err);
            throw err;
        }
    },
    getByMACT: async (MACT) => {
        try {
            const db = await pool;
            const [rows] = await db.query(
                `
                SELECT nv.MANV, nv.HOTEN, c.SLNGAYCONG
                FROM Cong c
                JOIN NhanVien nv ON c.MANV = nv.MANV
                WHERE c.MACT = ?
                `,
                [MACT]
            );
            return rows;
        } catch (err) {
            logger.error(`Repository Error: getByMACT failed for MACT ${MACT}`, err);
            throw err;
        }
    }
};