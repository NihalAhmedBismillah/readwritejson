/**
 * Import npm modules
 */

const product = require('../model/product');
const JsonOperation = require('./../lib/JsonOperation');

class ClsJsonreadwriteController {

    static init(app) {

        return new Promise((resolve, reject) => {


            app.post('/createjson', (req, res, next) => {

                //res.render('main/addproduct');
                JsonOperation.setJsonData({ name: 'nihal', address: 'pune' }, (error, result) => {
                    if (!error) {
                        res.send('file save successfull');
                    } else {
                        res.send('file not save!');
                    }
                });

            });
            app.post('/productcache', (req, res, next) => {

                //res.render('main/addproduct');
                JsonOperation.setJsonDatadb('Products', (error, result) => {
                    if (!error) {
                        res.send('file save successfull');
                    } else {
                        res.send('file not save!');
                    }
                });

            });
            app.get('/productcache', (req, res, next) => {

                JsonOperation.getJsonData('Products', (error, results) => {

                    res.setHeader('Content-disposition', 'attachment; filename= Products.json');
                    res.setHeader('Content-type', 'application/json');
                    res.write(results, (err) => {
                        res.end();
                    });
                });

            });
            app.get('/productchunk', (req, res, next) => {

                JsonOperation.getDatadbTest('Products', (error, results) => {
                    if (!error) {
                        res.send(results);
                    } else {
                        res.send('fail!');
                    }
                });

            });

            resolve(true);
        });
    }
}

module.exports = ClsJsonreadwriteController;