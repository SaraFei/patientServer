export const errorHandling = (err, req, res, next) => {

        if (!res==null){
        let statusCode = res.statusCode || 500;
        let message = err.message || 'sorry error uccor in server';
        res.status(statusCode).send(message);}
    }