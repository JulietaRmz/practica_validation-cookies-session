//----------* REQUIRE'S *----------//
const fs = require('fs');
const path = require('path');


//----------* VARIABLE'S *----------//
const usersFilePath = path.join(__dirname, '../database/users.json');


//----------* FUNCTIONS *----------//
const helperUsers = {
    getAllUsers: () => {
        return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));      
    },
    getNewId: () => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));  
        if (users.id==undefined)   {
          return 1;               
        } 
        return users.pop().id + 1;  
        
    },
    writeUsers: (array) => {
        const usersJson = JSON.stringify(array, null, " ");
	    fs.writeFileSync(usersFilePath, usersJson); 
    },
}

//----------* EXPORTS CONTROLLER *----------//
module.exports = helperUsers;