import { request } from './HttpClient';
import {
  ClientException,
  NetworkException,
  ServerException,
} from './Exceptions';

export const Http = {
  request,
  ClientException,
  NetworkException,
  ServerException,
};
