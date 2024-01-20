import { config } from "dotenv";

export default () => {
    config({path: 'etc/secrets/.env'})
};