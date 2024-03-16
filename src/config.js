import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 4001;
export const company_name = process.env.NODE_APP_NAME;
export const secretKey = process.env.secretKey;
