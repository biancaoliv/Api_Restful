#!/bin/sh

set -ex

export $(cat ./.env | xargs)

if [ $1 = "run" ]; then 
    ts-node ./node_modules/typeorm/cli.js migration:run -d ./src/shared/typeorm/data-source.ts
    exit 0
fi

if [ $# -ne 2 ]; then
    echo "invalid args"
    exit 1
fi

if [ $1 = "migration" ]; then
    ts-node ./node_modules/typeorm/cli.js migration:create ./src/shared/migrations/$2
else
    ts-node ./node_modules/typeorm/cli.js migration:generate -d ./src/shared/typeorm/data-source.ts ./src/shared/migrations/$2    
fi
