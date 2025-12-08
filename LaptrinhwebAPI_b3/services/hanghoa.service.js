import { hanghoaRepository } from "../repositories/hanghoa.js";
import { hanghoaDTO } from "../dtos/hanghoa/hanghoa.dtos.js";
import { giaBanDTO } from '../dtos/giaban/giaBan.dtos.js';
import { logger } from "../config/logger.js";

export const hanghoaService = {
  getAllhanghoa: async () => {
    logger.info("Service: Getting all hanghoa");
    const hanghoa = await hanghoaRepository.getAll();
    return hanghoa.map((u) => new hanghoaDTO(u));
  },

  gethanghoaByMaHang: async (MaHang) => {
    logger.info(`Service: Getting hanghoa by MaHang ${MaHang}`);
    const hanghoa = await hanghoaRepository.getByMaHang(MaHang);

    if (!hanghoa) {
      logger.warn(`Service Warning: hanghoa ${MaHang} not found`);
      throw new Error("hanghoa not found");
    }

    return new hanghoaDTO(hanghoa);
  },
  gethanghoaByTenLoai: async (TenLoai) => {
    logger.info(`Service: Getting hanghoa by MaHang ${TenLoai}`);
    const hanghoa = await hanghoaRepository.getByTenLoai(TenLoai);

    if (!hanghoa) {
      logger.warn(`Service Warning: hanghoa ${TenLoai} not found`);
      throw new Error("hanghoa not found");
    }
    return hanghoa.map((u)=>new hanghoaDTO(u)) ;
  },

    gethanghoaBySoLuongCon: async (SoLuongCon) => {
    logger.info(`Service: Getting hanghoa by SoLuongCon ${SoLuongCon}`);
    const hanghoa = await hanghoaRepository.getBySoLuongCon(SoLuongCon);

    if (!hanghoa || hanghoa.length === 0) {
      logger.warn(`Service Warning: SoLuongCon ${SoLuongCon} not found`);
      throw new Error("hanghoa not found");
    }
    return hanghoa.map((u)=>new hanghoaDTO(u)) ;
  },

  getGiaBanHienTai: async (MaHang) => {
    return await hanghoaRepository.getGiaBanHienTai(MaHang);
  },


  getHangHoaTheoKhoangGia: async (minPrice, maxPrice) => {
    const rows= await hanghoaRepository.getHangHoaTheoKhoangGia(minPrice, maxPrice);
    return rows;
  },

  getGiaBanTheoMaHang: async (MaHang) => {
    const hanghoa = await hanghoaRepository.getGiaBanTheoMaHang(MaHang);

    // chắc chắn hanghoa là mảng
    if (!Array.isArray(hanghoa)) return [];

    return hanghoa.map(u => new giaBanDTO(u));
      },
    
    AddGiaBan: async (data) => {
    const result = await giaBanRepository.AddGiaBan(data);
    return result;
  },

  UpdateGiaBan: async (data) => {
    const result = await giaBanRepository.UpdateGiaBan(data);
    return result;
  },

  DeleteGiaBan: async (MaGB) => {
    const result = await giaBanRepository.DeleteGiaBan(MaGB);
    return result;
  },
};
