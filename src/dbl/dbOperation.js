
/**
 * Import npm module
 */

const config = require('../config.json')
const MongoClient = require('mongodb').MongoClient;

class ClsMongodb{

      // connect monogodb data base
       static dbConnect(){
   
          return new Promise((resolve,reject)=>{

            if (global['db'] === undefined) {
                
                    MongoClient.connect(config['dbConnectionUrl'] + config['dbName'], (error, db) => {
                      if (error) {
                        console.log('Database connection error occur!', JSON.stringify(error));
                        reject(error)
                      }
                      else {
                        global['db'] = db;
                        resolve(true);
                      }
                    });
                  } else {
                    resolve(true)
                  }
          });   
       }
    
       // save data in to data base
    static insert(){
           
          return new Promise((resolve,reject)=>{
              // TODO some async operation 
              resolve();
          })

    }



}
module.exports = ClsMongodb;


