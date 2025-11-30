import {ObjectLiteral, Repository} from "typeorm";
import {IRepository} from "../interfaces/IRepository";
import {AppDataSource} from "../config/database";
import {NotFoundError} from "../errors/NotFoundError";

export abstract class BaseRepository<
    T extends ObjectLiteral,
> implements IRepository<T> {
    protected repository: Repository<T>;

    protected constructor(entityClass: new () => T) {
        this.repository = AppDataSource.getRepository(entityClass);
    }

    async findOne(id: string): Promise<T | null> {
        return await this.repository.findOne({where: {id} as any});
    }

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async create(entity: Partial<T>): Promise<T> {
        const newEntity = this.repository.create(entity as T);
        return await this.repository.save(newEntity);
    }

    async update(id: string, entity: Partial<T>): Promise<T> {
        const existingEntity = await this.findOne(id);
        if (!existingEntity) {
            throw new NotFoundError("Entity");
        }

        await this.repository.update(id, entity as any);
        const updatedEntity = await this.findOne(id);
        if (!updatedEntity) {
            throw new NotFoundError("Entity");
        }
        return updatedEntity;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected !== 0;
    }
}
