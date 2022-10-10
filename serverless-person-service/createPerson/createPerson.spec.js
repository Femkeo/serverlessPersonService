import {main} from "../createPerson/createPerson";

describe("#createPerson", () => {
    let sut = main;
    process.env.PERSON_TABLE = "fakeTableName";

    describe('when successful', () => {
    });
});
