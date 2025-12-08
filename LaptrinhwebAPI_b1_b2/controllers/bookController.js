import { bookRepo } from "../repositories/book.js";
// lay tat ca sach
export const getbooks = async (req, res) => {
    try {
        const books = await bookRepo.getbooks();
        res.status(200).json(books);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// lay sach theo id sach
export const getbookbyid = async (req, res) => {
    try {
        const mash = req.params.mash;
        const books = await bookRepo.getbookbyid(mash);
        if (books.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy sách" });
        }
        res.status(200).json(books);    
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server" });
    }
};
//them sach moi
export const addbook = async (req, res) => {
    try {
        const {MASH , TENSACH, TACGIA, NHAXB , NAMXB }= req.body;
    if (!MASH || !TENSACH || !TACGIA || !NHAXB || !NAMXB) {
        return res.status(400).json({message: "Vui lòng điền đầy đủ thông tin sách"});
    }
    const allbooks = await bookRepo.addbook({MASH , TENSACH, TACGIA, NHAXB , NAMXB });
    res.status(201).json({message: "Thêm sách thành công", data: allbooks});
    } catch (err) {
        console.error(err);
        res.status(400).json({message: err.message});
    }
};

//sua thong tin sach
export const updatebook = async (req, res) => {
    try {
        const mash = req.params.mash;
        const { TENSACH, TACGIA, NHAXB , NAMXB }= req.body;
        if (!TENSACH || !TACGIA || !NHAXB || !NAMXB) {
            return res.status(400).json({message: "Vui lòng điền đầy đủ thông tin sách"});
        }
        const updatedbook = await bookRepo.updatebook(mash, { TENSACH, TACGIA, NHAXB , NAMXB });
        res.status(200).json({message: "Cập nhật sách thành công", data: updatedbook});
    } catch (err) {
        console.error(err);
        res.status(400).json({message: err.message});
    }
};
// xoa sach
    export const deletebook = async (req, res) => {
    try {
        const mash = req.params.mash;
        if (!mash) {
            return res.status(400).json({message: "Thiếu mã sách (MASH)"});
        }
        await bookRepo.deletebook(mash);
        res.status(200).json({message: "Xoá sách thành công"});
    } catch (err) {
        console.error(err);
        res.status(400).json({message: err.message});
    }
};
