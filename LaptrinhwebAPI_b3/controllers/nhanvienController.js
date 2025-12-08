import { NhanvienService } from "../services/nhanvien.service.js";

import { logger } from "../config/logger.js";

export const NhanvienController = {
    getAll: async (req, res) => {
        try {
            logger.info("Controller: GET /nhanvien");
            const nhanvien = await NhanvienService.getAllNhanvien();
            res.json(nhanvien);
        } catch (err) {
            logger.error("Controller Error: getAll Nhanvien failed", err);
            res.status(500).json({ message: err.message });
        }
    },
    getByMANV: async (req, res) => {
        const MANV = req.params.MANV;
        logger.info(`Controller: GET /nhanvien/${MANV}`);
        if (!MANV || MANV.trim() === "") {
            return res.status(400).json({ message: "MANV không hợp lệ" });
        }
        try {
            const nhanvien = await NhanvienService.getNhanvienByMANV(MANV);
            res.json(nhanvien);
        } catch (err) {
            logger.error(`Controller Error: getByMANV failed for MANV ${MANV}`, err);
            res.status(404).json({ message: err.message });
        }
    },
    getByTenPhongBan: async (req, res) => {
            const TENPB = req.params.TENPB;
            logger.info(`Controller: GET /nhanvien/phongban/${TENPB}`);

            try {
                const data = await NhanvienService.getNhanvienByTenPhongBan(TENPB);
                res.json(data);
            } catch (err) {
                logger.error(`Controller Error: getByTenPhongBan failed for TENPB ${TENPB}`, err);
                res.status(404).json({ message: err.message });
            }
        },
         getByMACT: async (req, res) => {
        const MACT = req.params.MACT;

        logger.info(`Controller: GET /cong/${MACT}`);

        try {
            const data = await NhanvienService.getCongByMACT(MACT);
            res.json(data);
        } catch (err) {
            logger.error(`Controller Error: getByMACT failed for MACT ${MACT}`, err);
            res.status(404).json({ message: err.message });
        }
    }
};