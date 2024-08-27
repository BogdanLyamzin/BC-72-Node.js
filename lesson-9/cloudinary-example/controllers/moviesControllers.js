import * as fs from "node:fs/promises";

import * as moviesServices from "../services/moviesServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";
import cloudinary from "../helpers/cloudinary.js";

const getAll = async (req, res) => {
    const {_id: owner} = req.user;
    const {page = 1, limit = 10} = req.query;
    const skip = (page - 1) * limit;
    const result = await moviesServices.getMovies({owner}, {skip, limit});

    res.json(result);
}

const getById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await moviesServices.getOneMovie({_id: id, owner});

    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const add = async (req, res) => {
    const {_id: owner} = req.user;
    const {url: cover} = await cloudinary.uploader.upload(req.file.path, {
        folder: "covers",
    });
    await fs.unlink(req.file.path);
    const result = await moviesServices.addMovie({...req.body, cover, owner});

    res.status(201).json(result);
}

const updateById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;
    const result = await moviesServices.updateOneMovie({_id: id, owner}, req.body);
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    res.json(result);
}

const deleteById = async (req, res) => {
    const { id } = req.params;
    const {_id: owner} = req.user;

    const result = await moviesServices.deleteOneMovie({_id: id, owner});
    if (!result) {
        throw HttpError(404, `Movie with id=${id} not found`);
    }

    // res.status(204).send();

    res.json({
        message: "Delete success"
    })
}

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}