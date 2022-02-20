import { MongoClient, Bson, Collection } from '../deps/index.ts';
import { ProductSchema } from '../types/types.ts';

import { DATABASE } from '../config/environments.ts';

let products: Collection<ProductSchema>;

const connectDatabase = async (): Promise<MongoClient> => {

    const client = new MongoClient();
    await client.connect(DATABASE);
    console.log('connection established to database');
    createProductSchema( client );
    return client;

}

const createProductSchema = ( clientDatabase: MongoClient ) => {

    const db = clientDatabase.database('deno-land');
    products = db.collection<ProductSchema>('products'); 

}


export { 
    connectDatabase, 
    products 
}