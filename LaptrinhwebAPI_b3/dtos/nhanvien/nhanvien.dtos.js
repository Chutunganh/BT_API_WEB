export class NhanvienDTO {
  constructor({ MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB }) {
    this.MANV = MANV;
    this.HOTEN = HOTEN;
    this.NGAYSINH = NGAYSINH;
    this.PHAI = PHAI;
    this.DIACHI = DIACHI;
    this.MAPB = MAPB;
  }
};

export class PhongBanDTO {
    constructor({ MAPB, TENPB }) {
        this.MAPB = MAPB;
        this.TENPB = TENPB;
    }
};
export class CongTrinhDTO {
    constructor({ MACT, TENCT, DIADIEM, NGAYCAPGP, NGAYKC }) {
        this.MACT = MACT;
        this.TENCT = TENCT;
        this.DIADIEM = DIADIEM;
        this.NGAYCAPGP = NGAYCAPGP;
        this.NGAYKC = NGAYKC;
    }
};
