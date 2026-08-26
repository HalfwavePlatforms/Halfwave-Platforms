export declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test"
}
export declare class EnvironmentVariables {
    NODE_ENV: Environment;
    PORT: number;
    DATABASE_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    RESEND_API_KEY: string;
    EMAIL_FROM: string;
    ADMIN_EMAIL: string;
    APP_URL: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
