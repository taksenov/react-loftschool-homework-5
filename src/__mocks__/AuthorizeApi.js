let mockFn = (email, password) => email === 'e' && password === 'p';

export const setMockFn = fn => {
  mockFn = fn;
};

export const authorizeUser = (email, password) => mockFn(email, password);
export const isAuthorized = false;
