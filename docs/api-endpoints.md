# API Documentation

## Change Password

**Endpoint**: `/api/profile/change-password`

**Method**: POST

**Request Body**:
```json
{
    "oldPassword": "string",
    "newPassword": "string",
    "confirmPassword": "string"
}
```

## Update user profile
**Endpoint**: `/api/profile`

**Method**: PATCH

**Request Body**:
```json
{
    "name": "string",
    "email": "string",
    "phone": "string",
}
```

## Forgot Password
**Endpoint**: `/api/forgot-password`

**Method**: POST

**Request Body**:
