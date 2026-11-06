import dotenv from 'dotenv';

dotenv.config();

const apiKey: string | undefined = process.env.API_KEY;
const PORT: string | undefined = process.env.PORT;

console.log('API_KEY:', apiKey);
console.log('PORT:', PORT);

export { apiKey, PORT };
