import { createRequire } from 'module';
const require = createRequire(import.meta.url) //dirección del archivo actual
export const readJSON = (path) => require(path)