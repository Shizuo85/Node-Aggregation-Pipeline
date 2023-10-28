const validator = require("validator");
const mongoose = require("mongoose");

const Person = require("../models/persons");
const { persons } = require("../Persons");
const catchAsync = require("./services/catchAsync");

exports.test = catchAsync(async (req, res, next) => {
    let result = await Person.aggregate([
        {
            $project: {
                _id: 0,
                random: 0
            },
        },
        {
            $out: "newCollection"
        }
        
    ]);
    res.status(200).json({
        message: "success",
        result,
    });
});

exports.populateDb = catchAsync(async (req, res, next) => {
    let result = await Person.insertMany(persons);
    res.status(200).json({
        message: "success",
        result,
    });
});

exports.match = catchAsync(async (req, res, next) => {
    let result = await Person.aggregate([
        {
            $match: {
                age: {
                    $gt: 25,
                },
                isActive: true,
                $expr: { $gt: [{ $size: "$tags" }, 2] },
            },
        },
    ]);
    res.status(200).json({
        message: "success",
        result,
    });
});

exports.group = catchAsync(async (req, res, next) => {
    let result = await Person.aggregate([
        {
            $match: {
                age: {
                    $gt: 25,
                },
                isActive: true,
                $expr: { $gt: [{ $size: "$tags" }, 2] },
            },
        },
        {
            $group: {
                _id: "$company.location.country",
            },
        },
    ]);
    res.status(200).json({
        message: "success",
        result,
    });
});

exports.count = catchAsync(async (req, res, next) => {
    let result = await Person.aggregate([
        {
            $match: {
                age: {
                    $gt: 25,
                },
                isActive: true,
                $expr: { $gt: [{ $size: "$tags" }, 2] },
            },
        },
        {
            $group: {
                _id: "$company.location.country",
            },
        },
        {
            $facet: {
                result: [],
                count: [
                    {
                        $count: "count",
                    },
                ],
            },
        },
    ]);
    res.status(200).json({
        message: "success",
        result,
    });
});

exports.sort = catchAsync(async (req, res, next) => {
    let result = await Person.aggregate([
        {
            $match: {
                age: {
                    $gt: 25,
                },
                isActive: true,
                $expr: { $gt: [{ $size: "$tags" }, 2] },
            },
        },
        {
            $sort: {
                age: 1,
                name: -1,
            },
        },
    ]);
    res.status(200).json({
        message: "success",
        result,
    });
});

exports.project = catchAsync(async (req, res, next) => {
    let result = await Person.aggregate([
        {
            $match: {
                age: {
                    $gt: 25,
                },
                isActive: true,
                $expr: { $gt: [{ $size: "$tags" }, 2] },
            },
        },
        {
            $project: {
                _id: 0,
                name: 1,
                isActive: 1,
                registered: 1,
                info: {
                    age: "$age",
                    title: "$company.title",
                    email: "$company.email",
                    phone: "$company.phone",
                },
            },
        },
        {
            $sort: {
                age: 1,
                name: -1,
            },
        },
    ]);
    res.status(200).json({
        message: "success",
        result,
    });
});

exports.unwind = catchAsync(async (req, res, next) => {
    let result = await Person.aggregate([
        {
            $unwind: "$tags",
        },
        {
            $unwind: "$random",
        },
        {
            $group: {
                _id: "$tags",
            },
        },
        {
            $count: "total"
        }
    ]);
    res.status(200).json({
        message: "success",
        result,
    });
});

exports.limitSumAvg = catchAsync(async (req, res, next) => {
    let result = await Person.aggregate([
        {
            $group: {
                _id: "$age",
                count: {$sum: 1},
                total: {$sum: "$age"},
                avgAge: {
                    $avg: "$age"
                }
            },
        },
        {
            $limit: 10
        }
    ]);
    res.status(200).json({
        message: "success",
        result,
    });
});

exports.out = catchAsync(async (req, res, next) => {
    let result = await Person.aggregate([
        {
            $project: {
                _id: 0,
                random: 0
            },
        },
        {
            $out: "newCollection"
        }
        
    ]);
    res.status(200).json({
        message: "success",
        result,
    });
});