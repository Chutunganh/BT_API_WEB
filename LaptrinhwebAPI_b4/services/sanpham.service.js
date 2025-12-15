import { sanphamRepository } from "../repositories/sanpham.repository.js";
import { sanphamDTO } from "../dtos/sanpham/sanpham.dtos.js";
import { logger } from "../config/logger.js";

export const sanphamService = {
  getAllsanpham: async () => {
    logger.info("Service: Getting all sanpham");
    const rows = await sanphamRepository.getAll();
    return rows.map((u) => new sanphamDTO(u));
  },

 getsanphamByMa: async (ma) => {
        logger.info(`Service: Getting sanpham by ma ${ma}`);
        const sanpham = await sanphamRepository.getByMa(ma);
        if (!sanpham) {
            logger.warn(`Service Warning: sanpham ${ma} not found`);
            throw new Error("sanpham not found");
        }
        return new sanphamDTO(sanpham);
    },
    Addsanpham: async (data) => {
    const rows = await sanphamRepository.Addsanpham(data);
    return new sanphamDTO(rows)
  },
    Updatesanpham: async (ma, data) => {
    logger.info(`Service: Updating sanpham ${ma}`);
    return await sanphamRepository.Updatesanpham(ma, data);
  },
  deletesanpham:async(ma)=>{
    return await sanphamRepository.deletesanpham(ma);
  },
searchsanphamByTen: async (keyword) => {
  if (!keyword || keyword.trim() === "") {
    return [];
  }
  const rows = await sanphamRepository.searchsanpham(keyword.trim());

  if (!rows || rows.length === 0) {
    return [];
  }
  return rows.map(sp => new SanPhamDTO(sp));
},


    paginateAndSort: async (page, size, sort, order) => {
    return await sanphamRepository.paginateAndSort(page, size, sort, order);
  },

  countByDanhMuc: async () => {
    return await sanphamRepository.countByDanhMuc();
  }
};
