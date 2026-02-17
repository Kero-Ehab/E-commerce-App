export function getpagination(page?: number, limit?: number) {
    if(page === undefined || page < 1){
        page = 1;
    }
    if(limit === undefined || limit < 1){
        limit = 10;
    }
    const skip = (page - 1) * limit;
    return { skip};
}