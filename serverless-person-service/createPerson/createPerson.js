import {success} from "../libs/response-lib";

export const main = async event => {
    const tableName = process.env.PERSON_TABLE;

    console.log(event);
    console.log(tableName);
    return success();
};
