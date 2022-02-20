import { App, simpleLog, bodyParser } from './deps/index.ts';
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from './controllers/product.ts';
import { connectDatabase } from './config/database.ts';
import { PORT } from './config/environments.ts';

const initServer = async () => {

    const app: App = new App();

    // middlewares
    app.use(simpleLog());
    app.use(bodyParser.json());

    // routes
    app.get('/api/v1/products',         getProducts);
    app.get('/api/v1/products/{id}',    getProduct);
    app.post('/api/v1/products',        addProduct);
    app.put('/api/v1/products/{id}',    updateProduct);
    app.delete('/api/v1/products/{id}', deleteProduct);

    await connectDatabase();
    await app.listen(+PORT);
    console.log(`Server running on port: ${ PORT }`);

}

await initServer();


