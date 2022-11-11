import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './User'


@Entity({ name: 'tables' })
export class Table extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @ManyToMany(() => User, user => user.tables)
    @JoinTable()
    users: User[]

    @ManyToOne(() => User, user => user.tablePayments)
    tablePayer: User

    @Column()
    finished: boolean
}