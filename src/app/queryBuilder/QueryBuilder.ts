import { json } from "express";
import { FilterQuery, Query } from "mongoose";
import { object } from "zod";


class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public query: Record<string, unknown>

    constructor(modelQury: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQury;
        this.query = query;
    }

    search(searchAbleFields: string[]) {
        const search = this.query.search as string;

        if (search) {
            this.modelQuery = this.modelQuery.find({
                $or: searchAbleFields.map((field) => ({
                    [field]: { $regex: search, $option: 'i' }
                }) as FilterQuery<T>)
            })
        }
        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludeFildes = ['search', 'sort', 'limit', 'page', 'field']

        excludeFildes.forEach((field) => {
            delete queryObj[field]
        })
        let min;
        let max;
        if (queryObj.price) {
            const parsedPrice = JSON.parse(queryObj.price as string) as Record<string, string>;

            min = Number(parsedPrice.$gte);
            max = Number(parsedPrice.$lte);

            delete queryObj['price'];
        }
        console.log(queryObj)
        this.modelQuery = this.modelQuery.find({
            $and: [
                { price: { $gte: min, $lte: max } },
                { ...queryObj }
            ]
        })
        // queryObj as FilterQuery<T>
        return this;
    }


    sort() {
        const sort = this.query.sort || 'createdAt';

        this.modelQuery = this.modelQuery.sort(sort as string);

        return this;
    }

    paginate() {
        const page = Number(this.query?.page) || 1;
        const limit = Number(this.query.limit) || 10;
        let skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }

    fields() {
        const field = (this.query.field as string)?.split(',').join(' ') || '-__V';

        this.modelQuery = this.modelQuery.select(field);
        return this;

    }

    async countTotal() {
        const filter = this.modelQuery.getFilter();
        const total = await this.modelQuery.model.countDocuments(filter);
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const totalPage = Math.ceil(total / limit)
        return {
            total,
            page,
            limit,
            totalPage
        }
    }
}


export default QueryBuilder;