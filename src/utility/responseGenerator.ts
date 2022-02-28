const createResponse = (
    data: any,
    message: string | null = null,
    error: boolean = false,
    token: string | null = null
) => {
    return {
        error,
        data,
        message,
        token,
    };
};

export default createResponse;
