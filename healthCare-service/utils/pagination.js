exports.getPagination = (page = 1, limit = 10) => {
    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    
    return {
      skip: (parsedPage - 1) * parsedLimit,
      take: parsedLimit
    };
  };