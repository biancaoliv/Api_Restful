import { Table } from "@shared/entities/table.entity"
import { User } from "@shared/entities/user.entity"
import { CannotFinishTableWithoutPayer, CannotRemoveUserFromEmptyTable, CannotRemoveUserIfNotInTableUsers, CannotSetPayerForEmptyTable, CannotSetUserAsPayerIfNotInTableUsers, InvalidTableId, InvalidUserId, UserAlreadyExistsInTheTable } from "@shared/errors/InternalErrors"
import { AppDataSource } from "@shared/typeorm/data-source"
import { Repository } from "typeorm"


export class TableService {
    private repository: Repository<Table>
    private userRepository: Repository<User>
    
    constructor() {
        this.repository = AppDataSource.getRepository('Table')
        this.userRepository = AppDataSource.getRepository('User')
    }

    async addUserToTable(tableId: string, userId: string) {
        try {
            const table = await this.repository.findOneBy({ id: tableId, finished: false })
            
            if (!table) {
                throw new InvalidTableId()
            }

            const user = await this.userRepository.findOneBy({ id: userId })

            if (!user) {
                throw new InvalidUserId()
            }

            if (!table.users) {
                table.users = [user]
                await table.save()

                return
            }

            const foundUser = !table.users.find(user => user.id === userId)

            if (foundUser) {
                throw new UserAlreadyExistsInTheTable()
            }

            table.users = [...table.users, user]
            await table.save()      
        } catch(error) {
            console.error(error)
        }
    }

    async removeUserFromTable(tableId: string, userId: string) {
        try {
            const table = await this.repository.findOneBy({ id: tableId, finished: false })
            
            if (!table) {
                throw new InvalidTableId()
            }

            if (!table.users) {
                throw new CannotRemoveUserFromEmptyTable()
            }

            const foundUser = table.users.find(user => user.id === userId)

            if (!foundUser) {
                throw new CannotRemoveUserIfNotInTableUsers()
            }

            table.users = table.users.filter(user => user.id !== foundUser.id)
            await table.save()      
        } catch(error) {
            console.error(error)
        }
    }

    async setTablePayer(tableId: string, userId: string) {
        try {
            const table = await this.repository.findOneBy({ id: tableId, finished: false })
            
            if (!table) {
                throw new InvalidTableId()
            }

            if (!table.users) {
                throw new CannotSetPayerForEmptyTable()
            }

            const foundUser = table.users.find(user => user.id === userId)

            if (!foundUser) {
                throw new CannotSetUserAsPayerIfNotInTableUsers()
            }

            table.tablePayer = foundUser
            await table.save()            
        } catch(error) {
            console.log(error)
        }
    }

    async finishTable(tableId: string) {
        try {
            const table = await this.repository.findOne({
                where: { id: tableId, finished: false },
                relations: { tablePayer: true },
            })
            
            if (!table) {
                throw new InvalidTableId()
            }

            if (!table.users) {
                throw new CannotSetPayerForEmptyTable()
            }

            if (!table.tablePayer) {
                throw new CannotFinishTableWithoutPayer()
            }

            table.finished = true
            await table.save()            
        } catch(error) {
            console.log(error)
        }
    }
}