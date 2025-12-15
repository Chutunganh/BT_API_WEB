import { hanghoaRepository } from "../repositories/hanghoa.repository.js";
import { HangHoaDTO } from "../dtos/hanghoas/hanghoa.dto.js";
import { logger } from "../config/logger.js";

export const hanghoaService = {
  getAllhanghoas: async () => {
    logger.info("Service: Getting all hanghoas");
    const hanghoas = await hanghoaRepository.getAll();
    return hanghoas.map((u) => new HangHoaDTO(u));
  },

  gethanghoaByMaLoai: async (MaLoai) => {
    logger.info(`Service: Getting hanghoa by MaLoai ${MaLoai}`);
    const hanghoa = await hanghoaRepository.getByMaLoai(MaLoai);

    if (!hanghoa) {
      logger.warn(`Service Warning: hanghoa ${MaLoai} not found`);
      throw new Error("hanghoa not found");
    }

    return new HangHoaDTO(hanghoa);
  }
};
