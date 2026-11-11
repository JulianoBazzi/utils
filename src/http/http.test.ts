import { describe, expect, it, vi } from 'vitest';
import { applyValidationErrors } from './applyValidationErrors.js';
import { getErrorMessage } from './getErrorMessage.js';
import { getHttpStatus } from './getHttpStatus.js';
import { getValidationErrors } from './getValidationErrors.js';

const axiosError = (status: number, data: unknown) =>
  Object.assign(new Error(`Request failed with status code ${status}`), {
    response: { status, data },
  });

describe('getHttpStatus', () => {
  it('reads response.status, status or statusCode', () => {
    expect(getHttpStatus(axiosError(422, {}))).toBe(422);
    expect(getHttpStatus({ status: 404 })).toBe(404);
    expect(getHttpStatus({ statusCode: 500 })).toBe(500);
  });

  it('returns undefined without a numeric status', () => {
    expect(getHttpStatus(new Error('offline'))).toBeUndefined();
    expect(getHttpStatus({ status: '404' })).toBeUndefined();
    expect(getHttpStatus(null)).toBeUndefined();
  });
});

describe('getErrorMessage', () => {
  it('prefers the API message, then the error message', () => {
    expect(getErrorMessage(axiosError(422, { message: 'E-mail em uso' }))).toBe('E-mail em uso');
    expect(getErrorMessage(axiosError(500, ''))).toBe('Request failed with status code 500');
    expect(getErrorMessage(new Error('Timeout'))).toBe('Timeout');
    expect(getErrorMessage('plain')).toBe('plain');
  });

  it('returns the fallback without a message', () => {
    expect(getErrorMessage(null, { fallback: 'Erro inesperado' })).toBe('Erro inesperado');
    expect(getErrorMessage({ message: ' ' })).toBe('');
  });
});

describe('getValidationErrors', () => {
  it('normalizes a Laravel 422 body', () => {
    const error = axiosError(422, {
      message: 'Dados inválidos',
      errors: { email: ['Em uso', 42], name: 'Obrigatório', empty: [], blank: [''] },
    });
    expect(getValidationErrors(error)).toEqual({
      message: 'Dados inválidos',
      errors: { email: ['Em uso'], name: ['Obrigatório'] },
    });
  });

  it('reads `data` and tolerates a missing body', () => {
    expect(getValidationErrors({ status: 422, data: { errors: { a: ['x'] } } })).toEqual({
      message: undefined,
      errors: { a: ['x'] },
    });
    expect(getValidationErrors({ status: 422 })).toEqual({ message: undefined, errors: {} });
  });

  it('returns null for other statuses', () => {
    expect(getValidationErrors(axiosError(500, {}))).toBeNull();
    expect(getValidationErrors(axiosError(400, { errors: {} }), { status: 400 })).not.toBeNull();
  });
});

describe('applyValidationErrors', () => {
  const errors = {
    message: 'Dados inválidos',
    errors: { zip_code: ['CEP inválido'], hidden: ['x'] },
  };

  it('sets the first message of each known field', () => {
    const setError = vi.fn();
    const result = applyValidationErrors(errors, setError, {
      fieldMap: { zip_code: 'zipcode' },
      fields: ['zipcode', 'name'],
    });
    expect(setError).toHaveBeenCalledWith('zipcode', { type: 'server', message: 'CEP inválido' });
    expect(setError).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ handled: true, message: 'Dados inválidos', unhandled: ['hidden'] });
  });

  it('accepts every field without `fields` and a custom type', () => {
    const setError = vi.fn();
    applyValidationErrors(errors, setError, { type: 'api' });
    expect(setError).toHaveBeenCalledWith('zip_code', { type: 'api', message: 'CEP inválido' });
    expect(setError).toHaveBeenCalledWith('hidden', { type: 'api', message: 'x' });
  });

  it('reports nothing handled when no field matches or errors are missing', () => {
    const setError = vi.fn();
    expect(applyValidationErrors(errors, setError, { fields: ['name'] }).handled).toBe(false);
    expect(applyValidationErrors(null, setError)).toEqual({
      handled: false,
      message: undefined,
      unhandled: [],
    });
    expect(applyValidationErrors({ errors: { a: [] } }, setError).handled).toBe(false);
  });
});
