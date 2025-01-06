const catchErrorHandler = (res, error) => {
    console.error(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
};

module.exports = { catchErrorHandler };
