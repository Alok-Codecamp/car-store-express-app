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
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQury, query) {
        this.modelQuery = modelQury;
        this.query = query;
    }
    search(searchAbleFields) {
        const search = this.query.search;
        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchAbleFields.map((field) => ({
                    [field]: { $regex: search, $options: 'i' }
                }))
            });
        }
        return this;
    }
    filter() {
        const queryObj = Object.assign({}, this.query);
        const excludeFildes = ['search', 'sort', 'limit', 'page', 'field'];
        excludeFildes.forEach((field) => {
            delete queryObj[field];
        });
        if (queryObj.minPrice && queryObj.maxPrice) {
            console.log('after parse:', queryObj);
            const min = queryObj.minPrice;
            const max = queryObj.maxPrice;
            delete queryObj['minPrice'];
            delete queryObj['maxPrice'];
            this.modelQuery = this.modelQuery.find({
                $and: [
                    { price: { $gte: min, $lte: max } },
                    queryObj
                ]
            });
        }
        else {
            console.log(queryObj);
            this.modelQuery = this.modelQuery.find(queryObj);
        }
        // queryObj as FilterQuery<T>
        return this;
    }
    sort() {
        const sort = this.query.sort || 'createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a;
        const page = Number((_a = this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a;
        const field = ((_a = this.query.field) === null || _a === void 0 ? void 0 : _a.split(',').join(' ')) || '-__V';
        this.modelQuery = this.modelQuery.select(field);
        return this;
    }
    countTotal() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const filter = this.modelQuery.getFilter();
            const total = yield this.modelQuery.model.countDocuments(filter);
            const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
            const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
            const totalPage = Math.ceil(total / limit);
            return {
                total,
                page,
                limit,
                totalPage
            };
        });
    }
}
exports.default = QueryBuilder;
