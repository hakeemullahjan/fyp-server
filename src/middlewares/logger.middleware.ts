import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: Function) {
    try {
      const header = req.headers['authorization'];
      if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        let decode = jwt.verify(token, 'my_secret');
        req.body.decodeToken = decode;
        next();
      } else {
        res.status(403).send({
          responseCode: 403,
          responseMessage: 'Forbidden',
          result: 'Provide token in headers',
        });
      }
    } catch (error) {
      res.status(403).send({
        responseCode: 403,
        responseMessage: 'Forbidden',
        result: 'Session Expired',
      });
    }
  }
}
