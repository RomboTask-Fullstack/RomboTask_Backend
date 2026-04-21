import { CorsOptions } from 'cors'

// export const corsConfig: CorsOptions = {
//     origin: function (origin, callback) {
//         const whitelist = [process.env.FRONTEND_URL, undefined]

//         if(whitelist.includes(origin) || !origin){
//             callback(null, true)
//         }
//         else {
//             callback(new Error('Error de CORS'));
//         }
//     }
// }
export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        // Obtenemos la URL de la variable y eliminamos espacios en blanco por si acaso
        const frontendUrl = process.env.FRONTEND_URL?.trim();
        
        console.log('--- CORS Check ---');
        console.log('Origin de la petición:', origin);
        console.log('Variable FRONTEND_URL:', frontendUrl);

        // Permitimos si no hay origen (Postman/Server-side) o si coincide
        if (!origin || origin === frontendUrl) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS: Origen no permitido'));
        }
    }
}
