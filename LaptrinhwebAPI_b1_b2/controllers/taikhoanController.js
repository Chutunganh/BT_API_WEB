// import { successResponse, errorResponse } from "../helpers/response.js";

// src/controllers/taikhoanController.js
import { accounts } from "../model/taikhoan.js";

// Lấy tất cả tai khoan
export const getAllAccounts = (req, res) => {
  res.status(200).json(accounts);
};

// Lấy tai khoan theo ten tai khoan
export const getAccountByTenTK = (req, res) => {
  const tentk = req.params.tentk;
  const account = accounts.find((u) => u.TenTK === tentk);

  if (!account) {
    res.status(404).json({
      status: 404,
      message: `Account by ${tentk} not found!`,
    });
  }

  res.status(200).json(account);
};
// lay tai khoan theo noi dung mo ta
export const getAccountByMoTa = (req, res) => {
  const mota = req.params.mota;
  const result = accounts.filter(u => u.Mota?.includes(mota));
  res.status(200).json({ status: 200, message: "Success", data: result });
};

// kiem tra tai khoan va mat khau co hop le 
export const checkaccounts = (req, res) => {
  const { tentk, matkhau } = req.body;
  const account = accounts.find((u)=> u.TenTK === tentk && u.MatKhau === matkhau);
  if(!account){
  return res.status(401).json({ status: 401, message: 'Invalid credentials' });
}
res.status(200).json({ status: 200, message: "Login successful", data: account });

};
// them tai khoan vao cuoi danh sach

export const addaccounts = (req, res) => {
  const newaccounts = req.body;
  if(accounts.find(acc => acc.TenTK === newaccounts.TenTK)){
    return res.status(400).json({ status: 400, message: 'Account already exists' });
  }
  accounts.push(newaccounts);
  res.status(201).json({ status: 201, message: "Account added at the end", data: accounts });
};


//them tai khoan vao index

export const addindextoaccounts = (req, res) => {
  const idx = parseInt(req.params.index);
  const newaccounts = req.body;
  if(accounts.find(acc => acc.TenTK ===newaccounts.TenTK)){
    return res.status(400).json({ status: 400, message: 'Account already exists' });
  }
    if (idx < 0 || idx > accounts.length) {
    return res.status(400).json({ status: 400, message: "Invalid index" });
  }
  accounts.splice(idx, 0, newaccounts);
  res.status(201).json({ status: 201, message: `Account added at index ${idx}`, data: accounts });
};


// sua thong tin tai khoan theo ten tk 

export const updateaccounts = (req, res) => {
  const tentk = req.params.tentk;
  const matkhau = req.body.MatKhau;
  const mota = req.body.MoTa;
  const idx = accounts.findIndex((u) => u.TenTK === tentk);
  if(idx ===-1){
    return res.status(404).json({ status: 404, message: `Account by ${tentk} not found!` });
  }
  if(matkhau!== undefined) accounts[idx].MatKhau = matkhau;
  if(mota!== undefined) accounts[idx].MoTa = mota;
  res.status(200).json({ status: 200, message: "Account updated", data: accounts[idx] });
};

// xoa tai khoan theo ten tk

export const deleteaccounts = (req,res) => {
  const tentk = req.params.tentk;
  const idx = accounts.findIndex((u) => u.TenTK === tentk);
if(idx === -1){
    return res.status(404).json({ status: 404, message: `Account by ${tentk} not found!` });
  }
  accounts.splice(idx, 1);
  res.status(200).json({ status: 200, message: "Account deleted", data: accounts });
};


