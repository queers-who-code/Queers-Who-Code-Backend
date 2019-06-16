import { error as _error } from './logger';
import { respondWith } from './clientResponse';

/* eslint-disable-next-line func-names */
const asyncHandler = fn =>
  function(req, res, next) {
    try {
      /** Call original function with arguments */
      return fn(req, res, next);
    } catch (error) {
      _error(`An unexpected error has occured: ${error}`);
      return respondWith(res, 500);
    }
  };

export default {
  asyncHandler,
};
