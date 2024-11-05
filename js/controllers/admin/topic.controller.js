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
exports.deleteTopic = exports.editPatch = exports.edit = exports.detail = exports.createPost = exports.create = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/topics/index", {
        pageTitle: "Quản lý chủ đề",
        topics: topics
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/topics/create", {
        pageTitle: "Thêm mới chủ đề"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    const dataTopic = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        avatar: avatar
    };
    const topic = new topic_model_1.default(dataTopic);
    yield topic.save();
    res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics`);
});
exports.createPost = createPost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topicId = req.params.topicId;
    const topic = yield topic_model_1.default.findOne({
        _id: topicId,
        deleted: false,
    });
    res.render("admin/pages/topics/detail", {
        pageTitle: "Chi tiết chủ đề",
        topic: topic
    });
});
exports.detail = detail;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topicId = req.params.topicId;
    const topic = yield topic_model_1.default.findOne({
        _id: topicId,
        deleted: false,
    });
    res.render("admin/pages/topics/edit", {
        pageTitle: "Chỉnh sửa chủ đề",
        topic: topic
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topicId = req.params.topicId;
    try {
        const topic = yield topic_model_1.default.findOne({ _id: topicId }).select("avatar");
        req.body.avatar = req.body.avatar || topic.avatar;
        const dataTopic = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            avatar: req.body.avatar,
        };
        console.log(dataTopic);
        yield topic_model_1.default.updateOne({ _id: topicId }, dataTopic);
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (error) {
        console.error("Lỗi khi cập nhật topic:", error);
        res.status(500).send("Lỗi khi cập nhật topic.");
    }
});
exports.editPatch = editPatch;
const deleteTopic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topicId = req.params.topicId;
    try {
        yield topic_model_1.default.updateOne({
            _id: topicId
        }, {
            deleted: true
        });
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics`);
    }
    catch (err) {
        res.redirect(`/${config_1.systemConfig.prefixAdmin}/topics`);
    }
});
exports.deleteTopic = deleteTopic;
