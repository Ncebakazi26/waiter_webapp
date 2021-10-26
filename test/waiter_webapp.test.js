const assert = require('assert');
const waiter_webapp = require('../waiter_webapp');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registration_numbers1_test';

const pool = new Pool({
    connectionString
});
// eslint-disable-next-line no-undefwaiter_webapp
describe('The regstration numbers web app', function () {
    let waiter = waiter_webapp(pool);
    // eslint-disable-next-line no-undef
    beforeEach(async function () {
        await pool.query("delete from registrationnumbers");
    });
    it('should ', async function () {
        await reg.setReg({
            registration_Num: 'CA 123 123'
        });
        let regs = await reg.getReglist()
        assert.equal(1, regs.length)
    });
    after(function () {
        pool.end();
    })
});