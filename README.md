# Errors

The JavaScript client library for Errors with Cardinal.

## Installation

[TODO]

## Usage

Initialize with the init function:

```javascript
Errors.init({env: "production", /* additional configuration */});
```

For configuration details, see the Errors web application.

The Errors library will detect your runtime environment and initialize it accordingly.

## Things We Capture

- window related stuff like size, browser string
- configured environment

## Environment Variables

- `ERRORS_SECRET` - the secret to use for authenticating with the server when sending errors.