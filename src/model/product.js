
const shortid = require('shortid');

class ClsProduct {

    constructor() {

    }
    static insertProduct(pdata) {

        return new Promise((resolve, reject) => {
            let db = global['db'];
            let collection = db.collection('Products');
            pdata['_id'] = shortid.generate();
            collection.save(pdata, (error, result) => {

                (!error) ? resolve(result) : reject(error);
            });
        });
    }

    // get Product List 
    static getProudctList(req) {

        let perPage = 9
        let page = req.params.page || 1
        return new Promise((resolve, reject) => {

            let db = global['db'];
            let collection = db.collection('Products');
            collection.find({}).count((error,count)=>{

                collection.find({})
                .skip((perPage * page) - perPage)
                .limit(perPage).toArray((error, result) => {

                    if (!error) {
                        resolve({ products: result, current: page, pages: Math.ceil(count / perPage), newArrivalList: 'From Mumbai and Delhi' });
                    } else {
                        reject(error);
                    }
                });
            })
            
        });
    }

    static saveDummayProuduct() {

        let promises = [];

        for (let i = 0; i <= 1000; i++) {
            let product = {

                category: `category_${i}`,
                name: `name_${i}`,
                price: `${Math.floor(Math.random() * (1000 - 1 + 1)) + 1}`,
                cover:``
            }
            promises.push(this.insertProduct(product))
        }
        return Promise.all(promises).then(() => {
            return (true)
        })
    }
}

module.exports = ClsProduct;