

const fs = require('fs');
const dir = 'data';
const async = require('async');

class ClsJsonOperation {

    /**
     * 
     * @param {*JSON} data 
     * @param {*return} callback 
     */
    static setJsonData(data, callback) {

        //var fs = require('fs');
        async.waterfall([


            // Task1 : create directory where we need to write json
            (callback) => {

                if (!fs.existsSync(__dirname + './../' + dir)) {
                    fs.mkdirSync(__dirname + './../' + dir)
                    callback(undefined, { dir: dir });
                } else {
                    callback(undefined, { dir: 'exist' });
                }

            },
            //Task2 : write 
            (dir) => {
                fs.writeFile(__dirname + './../data/data.json', JSON.stringify(data), 'utf8', (error) => {
                    if (!error) {
                        console.log("The file was saved!");
                        callback(undefined, { status: 'success' });
                    } else {
                        callback(error, undefined)
                    }
                });
            }
        ], (error, finalResult) => {
            callback(error, finalResult);
        });
    }

    /**
    * 
    * @param {*JSON} data 
    * @param {*return} callback 
    */
    static setJsonDatadb(collectionName, callback) {

        //var fs = require('fs');
        async.waterfall([

            // Task1 : create directory where we need to write json
            (callback) => {

                if (!fs.existsSync(__dirname + './../data/' + collectionName)) {
                    fs.mkdirSync(__dirname + './../data/' + collectionName)
                    callback(undefined, { dir: collectionName });
                } else {
                    callback(undefined, { dir: 'exist' });
                }

            },
            //Task2 : read data from database 
            (data, callback) => {
                let db = global['db'];
                let collection = db.collection(collectionName);
                collection.find({}).toArray((error, results) => {
                    if (!error) {
                        callback(undefined, results);
                    } else {
                        callback(error, undefined);
                    }
                });
            },
            //Task3 : write data in file
            (data, callback) => {
                fs.writeFile(__dirname + `./../data/${collectionName}/data.json`, JSON.stringify(data), 'utf8', (error) => {
                    if (!error) {
                        console.log("The file was saved!");
                        callback(undefined, { status: 'success' });
                    } else {
                        callback(error, undefined)
                    }
                });
            }
        ], (error, finalResult) => {
            callback(error, finalResult);
        });
    }

    /**
    * 
    * @param {*JSON} data 
    * @param {*return} callback 
    */
    static getJsonData(collectionName, callback) {

        //var fs = require('fs');
        async.waterfall([
            //Task1 : read data in file
            (callback) => {
                fs.readFile(__dirname + `./../data/${collectionName}/data.json`, 'utf8', (error, data) => {
                    if (!error) {
                        console.log("fetch data successfully!");
                        callback(undefined, data);
                    } else {
                        callback(error, undefined)
                    }
                });

            }
        ], callback
        )
    }
    /**
   * 
   * @param {*JSON} data 
   * @param {*return} callback 
   */
    static getDatadb(collectionName, callback) {

        let products = [];
        async.waterfall([
            //Task1 : read data in file

            (callback) => {
                let limit = 300;
                let skip = 0;
                let allDocsFetched = true;
                let db = global['db'];
                let collection = db.collection(collectionName);
                /**
                 * async.doWhilst( (callback)=>{
                 * },
                 * ()=>{ condition},
                 * (error,nth)=>
                 * {final call back})
                 */
                async.doWhilst((callback) => {

                    collection.find({}).sort({ "_id": 1 }).skip(skip).limit(limit).toArray((error, results) => {
                        if (error) {
                            callback(error);
                        } else {
                            if (results && results.length > 0) {
                                skip += limit;
                                products = products.concat(results);
                                callback(undefined);

                            } else {

                                allDocsFetched = false;
                                callback(undefined);
                            }
                        }
                    });
                },
                    () => {
                        return allDocsFetched;
                    }, (error) => {
                        if (!error) {
                            callback(undefined, products);
                        } else {
                            console.log(error);
                            callback(error);
                        }

                    });
            }
        ], callback
        )
    }

    static getDatadbTest(collectionName, callback) {

        let products = [];
        async.waterfall([
            //Task1 : read data in file

            (callback) => {
                let limit = 300;
                let skip = 0;
                let allDocsFetched = true;
                let db = global['db'];
                let collection = db.collection(collectionName);
                /**
                 * async.doUntil( (callback)=>{
                 * },
                 * ()=>{ condition},
                 * (error,nth)=>
                 * {final call back})
                 */

                async.doUntil((callback) => {

                    collection.find({}).sort({ "_id": 1 }).skip(skip).limit(limit).toArray((error, results) => {
                        if (error) {
                            callback(error);
                        } else {
                            if (results && results.length > 0) {
                                skip += limit;
                                products = products.concat(results);
                                callback(undefined);

                            } else {

                                allDocsFetched = false;
                                callback(undefined);
                            }
                        }
                    });
                },
                    () => {
                        return !allDocsFetched;
                    }, (error) => {
                        if (!error) {
                            callback(undefined, products);
                        } else {
                            console.log(error);
                            callback(error);
                        }

                    });
            }
        ], callback
        )
    }


}

module.exports = ClsJsonOperation;