import { config } from '../deps/index.ts';
config({ export: true });

const ENV = Deno.env.toObject();
const PORT = ENV.PORT || 4000;
const DATABASE = ENV.DATABASE;

export {
    PORT,
    DATABASE
}