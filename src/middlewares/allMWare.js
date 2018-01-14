
/**
 * Import npm module
 */

const ejs = require('ejs');
const bodyParser = require('body-parser');

class ClsMiddleware {

    static init(app) {

        return new Promise((resolve, reject) => {
            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({ extended: true }))
            app.set('view engine', 'ejs');
            // app.use((req,res,next)=>{
            //     console.log('restarted! ===============>');
            //     next();
                
            // })
            app.use((err, req, res, next) => {
              //  console.error(err.stack)pm2
                res.status(500).send('Something broke!')
            });
            app.get('/', (req, res, next) => {
                // TODO : Render home page or index page.
                res.render('main/index');

            });
            resolve();
        });
    }
}

module.exports = ClsMiddleware;
