import {Column, Entity, OneToMany} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Rent} from "./Rent";

export enum RentableType {
    CAR = "car",
    HOUSE = "house",
    MONEY = "money",
    EQUIPMENT = "equipment",
    FURNITURE = "furniture",
    OTHER = "other",
}

@Entity()
export class Rentable extends BaseEntity {
    @Column()
    name!: string;
    @Column({type: "text"})
    description!: string;
    @Column({
        type: "enum",
        enum: RentableType,
    })
    type!: RentableType;
    @Column("decimal", {precision: 10, scale: 2})
    pricePerDay!: number;
    @Column({default: true})
    available!: boolean;
    @Column({type: "jsonb", nullable: true})
    specifications?: Record<string, any>;

    @OneToMany(() => Rent, (rent) => rent.rentable)
    rents!: Rent[];
}
