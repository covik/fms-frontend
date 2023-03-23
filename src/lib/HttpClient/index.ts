import { request } from './HttpClient';
import {
  ClientException,
  NetworkException,
  ServerException,
} from './Exception';

export const Http = {
  request,
  ClientException,
  NetworkException,
  ServerException,
};
