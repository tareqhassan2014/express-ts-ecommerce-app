import { cleanEnv, port, str } from 'envalid';

function validEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production', 'test'],
            default: 'development',
        }),
        MONGO_CONNECTION_URI: str(),
        PORT: port({ default: 3333 }),
    });
}

export default validEnv;
