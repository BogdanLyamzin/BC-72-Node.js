import Movie from "../models/Movie.js";

export const getMovies = (filter, settings) => {
    return Movie.find(filter, "-createdAt -updatedAt", settings).populate("owner", "username email");
};

export const getOneMovie = filter => Movie.findOne(filter)

export const addMovie = (data) => Movie.create(data);

export const updateOneMovie = async (filter, data) => Movie.findOneAndUpdate(filter, data);

export const deleteOneMovie = filter => Movie.findOneAndDelete(filter);