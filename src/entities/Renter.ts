import {Column, Entity, OneToMany} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Rent} from "./Rent";

export enum RenterType {
    INDIVIDUAL = "individual",
    COMPANY = "company",
    ASSOCIATION = "association",
    CHURCH = "church",
    SCHOOL = "school",
    COMMUNITY = "community",
}

@Entity()
export class Renter extends BaseEntity {
    @Column()
    name!: string;
    @Column()
    email!: string;
    @Column()
    phone!: string;
    @Column({type: "text", nullable: true})
    address?: string;
    @Column({type: "enum", enum: RenterType, default: RenterType.INDIVIDUAL})
    type!: RenterType;
    @Column({type: "jsonb", nullable: true})
    metadata?: Record<string, any>;

    @OneToMany(() => Rent, (rent) => rent.renter)
    rents: Rent[];
}
