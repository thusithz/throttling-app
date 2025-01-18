import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
// import axios from 'axios';

// configure({ testIdAttributeName: 'id' });

// jest.mock('axios');

// Mock MaterialUI's useMediaQuery
jest.mock('@material-ui/core/useMediaQuery', () => ({
  __esModule: true,
  default: () => true,
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
) as jest.Mock;
