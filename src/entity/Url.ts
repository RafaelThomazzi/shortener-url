import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique} from "typeorm";

@Entity()
@Unique(["short_url"])
export class Url {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    short_url: string;

    @Column()
    expires_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}
