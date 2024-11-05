"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPatch = exports.edit = exports.detail = exports.deleteSinger = exports.createPost = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singer_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/singers/index", {
        pageTitle: "Danh sách các ca sĩ",
        singers: singers
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/singers/create", {
        pageTitle: "Thêm ca sĩ mới"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar;
    }
    const dataSinger = {
        fullName: req.body.fullName,
        avatar: avatar,
        status: req.body.status
    };
    const singer = new singer_model_1.default(dataSinger);
    yield singer.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
});
exports.createPost = createPost;
const deleteSinger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singerId = req.params.singerId;
    yield singer_model_1.default.updateOne({
        _id: singerId
    }, {
        deleted: true
    });
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
});
exports.deleteSinger = deleteSinger;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singerId = req.params.singerId;
    try {
        const singers = yield singer_model_1.default.findOne({
            _id: singerId,
            deleted: false
        }).select("-slug -deleted");
        console.log(singers);
        const songs = yield song_model_1.default.find({
            singerId: singerId
        });
        res.render("admin/pages/singers/detail", {
            pageTitle: "Chi tiết ca sĩ",
            singers: singers,
            songs: songs
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singerId = req.params.singerId;
    const singers = yield singer_model_1.default.findOne({
        _id: singerId,
        deleted: false
    }).select("-slug -deleted");
    res.render("admin/pages/singers/edit", {
        pageTitle: "Chỉnh sửa ca sĩ",
        singers: singers
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singerId = req.params.singerId;
    try {
        const singer = yield singer_model_1.default.findOne({
            _id: singerId
        }).select("avatar");
        req.body.avatar = req.body.avatar || singer.avatar;
        const dataSinger = {
            fullName: req.body.fullName,
            avatar: req.body.avatar,
            status: req.body.status
        };
        yield singer_model_1.default.updateOne({
            _id: singer
        }, dataSinger);
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/singers`);
    }
    catch (error) {
        console.error("Lỗi khi cập nhật topic:", error);
        res.status(500).send("Lỗi khi cập nhật ca sĩ.");
    }
});
exports.editPatch = editPatch;
