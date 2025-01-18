
# Backend API Service

A robust Express.js API service with IP-based request throttling and JWT authentication.

## Features

- IP-based request throttling using Redis
- JWT authentication
- TypeScript implementation
- Comprehensive test coverage
- Structured logging with Morgan
- Security headers with Helmet

## Prerequisites

- Node.js
- MongoDB
- Redis

## Setup

1. Install dependencies:
```bash
yarn install
```

2. Create `.env` file with required environment variables.

## Available Scripts

- `yarn start` - Start development server
- `yarn build` - Build production bundle
- `yarn test` - Run test suite
- `yarn lint` - Run ESLint checks

## API Documentation

API endpoints are versioned under `/api/v1` with JWT authentication middleware.

### Core Endpoints:
- Authentication routes
- User management
- System health checks

## Security

- Implements rate limiting
- JWT token validation
- Secure HTTP headers
- Input validation
