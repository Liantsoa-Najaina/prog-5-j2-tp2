import {Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import {BaseEntity} from "./BaseEntity";
import {Renter} from "./Renter";
import {Rentable} from "./Rentable";

export enum RentStatus {
    PENDING = "pending",
    ACTIVE = "active",
    COMPLETED = "completed",
    CANCELED = "cancelled",
}

@Entity()
export class Rent extends BaseEntity {
    @ManyToOne(() => Renter, (renter) => renter.rents)
    @JoinColumn()
    renter!: Renter;

    @Column()
    renterId!: string;

    @ManyToOne(() => Rentable, (rentable) => rentable.rents)
    @JoinColumn()
    rentable!: Rentable;
    @Column()
    rentableId!: string;

    @Column()
    endDate!: Date;

    @Column("decimal", {precision: 10, scale: 2})
    totalAmount!: number;

    @Column({
        type: "enum",
        enum: RentStatus,
        default: RentStatus.PENDING,
    })
    status!: RentStatus;

    @Column({
        type: "text",
        nullable: true,
    })
    notes?: string;

    @Column({
        type: "jsonb",
        nullable: true,
    })
    metadata?: Record<string, any>;
}
