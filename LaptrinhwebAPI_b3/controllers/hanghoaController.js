
import { hanghoaService } from "../services/hanghoa.service.js";
import { logger } from "../config/logger.js";

export const hanghoaController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /hanghoa");
      const hanghoa = await hanghoaService.getAllhanghoa();
      res.json(hanghoa);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMaHang: async (req, res) => {
    const MaHang = Number(req.params.MaHang); 
    logger.info(`Controller: GET /hanghoa/${req.params.MaHang}`);

    try {
      const hanghoa = await hanghoaService.gethanghoaByMaHang(MaHang);
      res.json(hanghoa);
    if (!hanghoa) {
      return res.status(404).json({ message: "Không tìm thấy hàng hóa" });
    }

    } catch (err) {
      logger.error(`Controller Error: getById failed (${MaHang})`, err);
      res.status(404).json({ message: err.message });
    }
  },

    getByTenLoai: async (req, res) => {
    const TenLoai = req.params.tenLoai;
    if (!TenLoai) return res.status(400).json({ message: "TenLoai không được để trống" });

    try {
        const hanghoaList = await hanghoaService.gethanghoaByTenLoai(TenLoai);
        if (!hanghoaList.length) return res.status(404).json({ message: "Không tìm thấy hàng hóa" });
        res.json(hanghoaList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    },

    getBySoLuongCon: async (req, res) => {
    try {
      const SoLuongCon = Number(req.params.SoLuongCon)
      if (isNaN(SoLuongCon)) {
        return res.status(400).json({ message: "SoLuongCon phải là một số hợp lệ" });
      }
        const hanghoaList = await hanghoaService.gethanghoaBySoLuongCon(SoLuongCon);
        if (!hanghoaList.length) return res.status(404).json({ message: "Không tìm thấy hàng hóa" });
        res.json(hanghoaList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    },

    getGiaBanHienTai: async (req, res) => {
      try {
        const Mahang = req.params.MaHang;
        if (!Mahang) {
          return res.status(400).json({ message: "MaHang không được để trống" });
        }
        const result = await hanghoaService.getGiaBanHienTai(Mahang);
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

    getHangHoaTheoKhoangGia: async (req, res) => {
      try {
        const minPrice = parseFloat(req.params.minPrice);
        const maxPrice = parseFloat(req.params.maxPrice);
        if (isNaN(minPrice) || isNaN(maxPrice)) {
          return res.status(400).json({ message: "Giá trị minPrice và maxPrice phải là số hợp lệ" });
        }
        const hanghoa = await hanghoaService.getHangHoaTheoKhoangGia(minPrice, maxPrice);
        res.json(hanghoa);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    },

  getGiaBanTheoMaHang: async (req, res) => {
    try {
      const { mahang } = req.params;

      const result = await hanghoaService.getGiaBanTheoMaHang(mahang);

      res.json(result); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
 AddGiaBan: async (req, res) => {
    try {
      const result = await giaBanService.AddGiaBan(req.body);
      res.status(201).json({ message: "Thêm giá bán thành công", result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Sửa
  UpdateGiaBan: async (req, res) => {
    try {
      const result = await giaBanService.UpdateGiaBan(req.body);
      res.json({ message: "Sửa giá bán thành công", result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // Xóa
  DeleteGiaBan: async (req, res) => {
    try {
      const { MaGB } = req.params;
      const result = await giaBanService.DeleteGiaBan(MaGB);
      res.json({ message: "Xóa giá bán thành công", result });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
};
