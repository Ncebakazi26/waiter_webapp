module.exports = function waiter_webapp(pool) {

    async function getDay() {
        try {
            var data = await pool.query(`select * from shifts`)
            return data.rows

        } catch (error) {
            console.log(error)
        }

    }
    async function setName(name) {
        try {
            const nameExist = await pool.query(`select waiter_name from  waiter where waiter_name = $1 `,[name])
            if (nameExist.rowCount===0 ){
                await pool.query(`insert into waiter(waiter_name) values($1)`,[name])
            }
            
            
        } catch (error) {
            console.log(error)
            
        }

    }
    async function setNameDay(name, day){
        try {
            var  data = await pool.query(`insert into manager (waiter_id,day_id )values($1,$2)`,[name,day])
            
        } catch (error) {
            console.log(error)
            
        }
    }
    async function joinTables(name, day) {
        try {
        await pool.query(`insert into manager (waiter_id,day_id) values($1,$2)`[name,day])    
        var data = await pool.query(`select  waiter_name , shift_days 
        from waiter inner join manager
        on waiter.waiter_id = manager.waiter_id
        inner join shifts
        on shifts.day_id = manager.day_id  `)

            return data.rows


        } catch (error) {
            console.log(error)
        }


    }

    return {
        joinTables,
        getDay,
        setName,
        setNameDay


    }
}