import { NhanvienRepository } from "../repositories/nhanvien.js";
import { NhanvienDTO } from "../dtos/nhanvien/nhanvien.dtos.js";
import {CongDTO} from "../dtos/cong/cong.dtos.js";
import { logger } from "../config/logger.js";
export const NhanvienService = {
    getAllNhanvien: async () => {
        const nhanvien= await NhanvienRepository.getAll();
        return nhanvien.map((u) => new NhanvienDTO(u));
    },
    getNhanvienByMANV: async (MANV) => {
        const nhanvien= await NhanvienRepository.getByMANV(MANV);
        if (!nhanvien) {
            logger.warn(`Service Warning: Nhanvien ${MANV} not found`);
            throw new Error("Nhanvien not found");
        }
        return new NhanvienDTO(nhanvien);
    },
        getNhanvienByTenPhongBan: async (TENPB) => {
        const list = await NhanvienRepository.getByTenPhongBan(TENPB);

        if (!list || list.length === 0) {
            logger.warn(`Service Warning: No NhanVien found for TENPB ${TENPB}`);
            throw new Error("Không tìm thấy nhân viên nào của phòng ban này");
        }
        return list.map(u => new NhanvienDTO(u));
    },
        getCongByMACT: async (MACT) => {
        const list = await NhanvienRepository.getByMACT(MACT);

        if (!list || list.length === 0) {
            logger.warn(`Service Warning: No data found for MACT ${MACT}`);
            throw new Error("Không có dữ liệu công cho công trình này");
        }

        return list.map(row => new CongDTO(row));
    }
};