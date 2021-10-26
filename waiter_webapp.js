module.exports = function waiter_webapp (pool) {

async function setDay(){
    var data = await pool.query(`select* from  where reg_string = $1`)

    

}
async function getDay(){
    
}

    return{
        setDay,
        getDay


    }
}