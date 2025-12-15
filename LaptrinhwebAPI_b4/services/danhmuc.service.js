import { danhmucRepository } from "../repositories/danhmuc.repository.js";
import { danhmucDTO } from "../dtos/danhmuc/danhmuc.dtos.js";
import { logger } from "../config/logger.js";

export const danhmucService = {
  getAlldanhmuc: async () => {
    logger.info("Service: Getting all danhmuc");
    const rows = await danhmucRepository.getAll();
    return rows.map((u) => new danhmucDTO(u));
  },

  gethanghoaByMaLoai: async (MaLoai) => {
    logger.info(`Service: Getting hanghoa by MaLoai ${MaLoai}`);
    const hanghoa = await danhmucRepository.getByMaLoai(MaLoai);

    if (!hanghoa) {
      logger.warn(`Service Warning: hanghoa ${MaLoai} not found`);
      throw new Error("hanghoa not found");
    }

    return new danhmucDTO(hanghoa);
  }
};
