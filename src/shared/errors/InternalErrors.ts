class InternalError extends Error {
    code: number

    constructor(message: string, code?: number) {
        super(message)
        this.code = code || 500
    }
}

export class InvalidUserId extends InternalError {
    constructor() {
        super('Invalid user id')
    }
}

export class InvalidTableId extends InternalError {
    constructor() {
        super('Invalid user id')
    }
}

export class CannotSetPayerForEmptyTable extends InternalError {
    constructor() {
        super('Its impossible to set payer for a table without users')
    }
}

export class CannotRemoveUserFromEmptyTable extends InternalError {
    constructor() {
        super('Its impossible to remove user from empty table')
    }
}

export class CannotRemoveUserIfNotInTableUsers extends InternalError {
    constructor() {
        super('Its impossible to remove user if not present in table users')
    }
}

export class CannotFinishTableWithoutPayer extends InternalError {
    constructor() {
        super('Its impossible to remove user if not present in table users')
    }
}

export class CannotSetUserAsPayerIfNotInTableUsers extends InternalError {
    constructor() {
        super('Its impossible to set users as payer if not in table users')
    }
}

export class UserAlreadyExistsInTheTable extends InternalError {
    constructor() {
        super('User already exists in the table')
    }
}