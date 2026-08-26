declare const _default: () => {
    nodeEnv: string;
    port: number;
    database: {
        url: string | undefined;
    };
    jwt: {
        accessSecret: string | undefined;
        refreshSecret: string | undefined;
    };
    redis: {
        host: string;
        port: number;
    };
    cloudinary: {
        cloudName: string | undefined;
        apiKey: string | undefined;
        apiSecret: string | undefined;
    };
    resend: {
        apiKey: string | undefined;
        from: string | undefined;
        adminEmail: string;
        appUrl: string;
    };
};
export default _default;
