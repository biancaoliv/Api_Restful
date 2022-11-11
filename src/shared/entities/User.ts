import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Table } from './Table'


@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    email: string

    @Column()
    name: string

    @ManyToMany(() => Table, table => table.users)
    tables: Table[]

    @OneToMany(() => Table, table => table.tablePayer)
    tablePayments: Table[] 

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}