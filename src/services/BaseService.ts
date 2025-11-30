import {IRepository} from "../interfaces/IRepository";
import {NotFoundError} from "../errors/NotFoundError";

export abstract class BaseService<T> {
    protected repository: IRepository<T>;

    protected constructor(repository: IRepository<T>) {
        this.repository = repository;
    }

    async getById(id: string): Promise<T> {
        const entity = await this.repository.findOne(id);
        if (!entity) {
            throw new NotFoundError("Entity");
        }
        return entity;
    }

    async getAll(): Promise<T[]> {
        return await this.repository.findAll();
    }

    async create(data: Partial<T>): Promise<T> {
        return await this.repository.create(data);
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        return await this.repository.update(id, data);
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }
}
