import { Request } from '../deps/index.ts';
import { products } from '../config/database.ts';
import { ProductSchema } from '../types/types.ts';

// @route GET api/products
const getProducts = async ( request: Request, response: any ) => {

  try {

    const productsDB = await products.find().toArray();
    
    response.status = 200;
    return await response.json({
      ok: true,
      products: productsDB
    });
    
  } catch (err) {

    response.status = 500;
    return await response.json({
      ok: false,
      error: true,
      message: err ? err : "an unexpected error has occurred",
    });
    
  }

}

// @route GET api/products/:id
const getProduct = async ( request: Request, response: any ) => {

  try {

    const product = await products.findOne({ _id: request.params.id });

    if ( product ) {
  
      response.status = 200;
      return await response.json({
        ok: true,
        product
      });
  
    } else {
  
      response.status = 404;
      return await response.json({
        ok: false,
        error: true,
        message: "No product found",
      });
        
    }
    
  } catch (err) {

    response.status = 500;
    return await response.json({
      ok: false,
      error: true,
      message: err ? err : "an unexpected error has occurred",
    });
    
  }

}

// @route POST api/products
const addProduct = async ( request: Request, response: any) => {

  if ( request.data ) {

      const { name, description, price } = request.data;

      if ( name && description && price ) {  
            
            const product: ProductSchema = { _id: globalThis.crypto.randomUUID(), name, description, price };

            try {

              await products.insertOne(product);

              response.status = 201;
              return await response.json({
                ok: true,
                message: 'the product has been created successfully'
              });
              
            } catch (err) {

              response.status = 500;
              return await response.json({
                ok: false,
                error: true,
                message: err ? err : "an unexpected error has occurred",
              });
              
            }

      } else {

          response.status = 400;
          return await response.json({
            ok: false,
            error: true,
            message: "verify that all the required fields are present 'name description price'",
          });

      }

  } else {

        response.status = 400;
        return await response.json({
          ok: false,
          error: true,
          message: "verify that all the required fields are present 'name description price'",
        });

  }

}

// @route PUT api/products/:id
const updateProduct = async ( request: Request, response: any ) => {

  const idProduct = request.params.id;
  const { name, description, price } = request.data;

  if ( name && description && price ) {

    try {

      const { matchedCount } = await products.updateOne(
        { _id: idProduct },
        { $set: { name, description, price } }
      );

      if ( matchedCount > 0 ) {

          response.status = 200;
          return await response.json({
            ok: true,
            message: `Product with id: ${ idProduct } updated successful`
          });

      } else {

        response.status = 404;
        return await response.json({
          ok: true,
          message: `Product with id: ${ idProduct } not found`
        });

      }
      
    } catch (err) {

      response.status = 500;
      return await response.json({
        ok: false,
        error: true,
        message: err ? err : "an unexpected error has occurred",
      });
      
    }

  } else {

      response.status = 400;
      return await response.json({
        ok: false,
        error: true,
        message: "verify that all the required fields are present 'name description price'",
      });

  }

}

// @route DELETE api/products/:id
const deleteProduct = async ( request: Request, response: any ) => {

  const idProduct = request.params.id

  try {

    const deleteCount = await products.deleteOne({ _id: idProduct });
    console.log(deleteCount);

    if ( deleteCount > 0 ) {

        response.status = 200;
        return await response.json({
          ok: true,
          message: `Product with id: '${ idProduct }' deleted successfully`
        })

    } else { 

      response.status = 404;
      return await response.json({
        ok: false,
        message: 'Product not found'
      });

    }
    
  } catch (err) {

      response.status = 500;
      return await response.json({
        ok: false,
        message: err ? err : "an unexpected error has occurred"
      });
    
  }

}

export { 
  getProducts, 
  getProduct, 
  addProduct,
  updateProduct,
  deleteProduct 
}