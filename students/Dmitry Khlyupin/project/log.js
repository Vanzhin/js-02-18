const fs = require('fs').promises;
console.log('Запись статистики...')
async function log (type, id) {
    try{
        const data = await fs.readFile('./stats.json', 'utf-8');
        const logData = JSON.parse(data);
        console.log(logData);
        const actionObj = {
            type,
            id,
            time: (new Date()).toISOString()
        };
        logData.push(actionObj);
        
        await fs.writeFile('./stats.json', JSON.stringify(logData));
    }
    catch(err){
        console.log('Error file logging',err);
    };
}; 

module.exports = log;