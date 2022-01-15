# Patika & Gelecek Varlık Fullstack Bootcamp Graduation Project

## Apartment<small>(s)</small> Management System

System has 2 types of users. Admins and Users. (Admin is also a user.)

### Admin

Admin inserts apartments with / without residents and vice versa.

<!-- [ ADMIN INSERTING APARTMENT AND USER PICTURE ] -->

They're updatable / deletable.

<!-- [ ADMIN EDITING / DELETING APARTMENT PICTURE ] -->

After inserting apartments and residents, and/or updating their relationships, admin can create payments for apartments.

<!-- [ ADMIN INSERTING PAYMENTS FOR APARTMENTS PICTURE ] -->

Admin can view payments. And can edit or delete them **if** they're not **payed**.

<!-- [ ADMIN VIEWING / EDITING / DELETING PICTURE ] -->

### User

Users can view their payments.

<!-- [ USER VIEWING PAYMENTS PICTURE ] -->

Make their payments with credit card.

<!-- [ USER MAKING A PAYMENT - CREDIT CARD PAGE PICTURE ] -->

Users can view their messages and send messages to other residents.

<!-- [ USER MESSAGING PAGE - PICTURE ] -->

# Backend

## API Endpoints <small>(Swagger Docs)</small>

<!-- APARTMETNS -->
<details>

<summary> <b>Apartments </b> </summary>

<details>

<summary> Get </summary>

```json
"/api/Apartment": {
      "get": {
        "tags": ["Apartment"],
        "parameters": [
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "pageNumber",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              }
            }
          }
        }
      }
"/api/Apartment/{id}": {
      "get": {
        "tags": ["Apartment"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              }
            }
          }
        }
      }
```

</details>

<details>

<summary>Post</summary>

```json
"/api/Apartment": {
      "post": {
        "tags": ["Apartment"],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApartmentInsertModel"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ApartmentInsertModel"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ApartmentInsertModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              }
            }
          }
        }
      }
```

</details>

<details> 
<summary> Put </summary>

```json
"/api/Apartment/{id}": {
      "put": {
        "tags": ["Apartment"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/ApartmentInsertModel"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/ApartmentInsertModel"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/ApartmentInsertModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApartmentViewModelGeneral"
                }
              }
            }
          }
        }
      }
```

</details>

<details>

<summary> Delete</summary>

```json
"/api/Apartment/{id}": {
      "delete": {
        "tags": ["Apartment"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              }
            }
          }
        }
      }
```

</details>

</details>

</section>

<!-- USERS -->
<details>
<summary><b>Users</b></summary>

<details>

<summary> Get </summary>

```json
// USER GET LIST
"/api/User": {
      "get": {
        "tags": ["User"],
        "parameters": [
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "pageNumber",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              }
            }
          }
        }
      }
//GET BY ID
"/api/User/{id}": {
      "get": {
        "tags": ["User"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              }
            }
          }
        }
      }
```

</details>

<details>
<summary>Post</summary>

```json
"/api/User/register": {
      "post": {
        "tags": ["User"],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserInsertModel"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UserInsertModel"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UserInsertModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              }
            }
          }
        }
      }

"/api/User/login": {
      "post": {
        "tags": ["User"],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserLoginRequestModel"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UserLoginRequestModel"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UserLoginRequestModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserLoginResponseModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserLoginResponseModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserLoginResponseModelGeneral"
                }
              }
            }
          }
        }
      }

```

</details>

<details> 
<summary> Put </summary>

```json
"/api/User/{id}": {
      "put": {
        "tags": ["User"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UserInsertModel"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/UserInsertModel"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/UserInsertModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/UserViewModelGeneral"
                }
              }
            }
          }
        }
      }
```

</details>

<details>

<summary> Delete</summary>

```json
"/api/User/{id}": {
      "delete": {
        "tags": ["User"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              }
            }
          }
        }
      }
```

</details>

</details>

<!-- PAYMENTS -->
<details>

<summary><b>Payments</b></summary>

<details>

<summary> Get </summary>

```json
"/api/Payment": {
      "get": {
        "tags": ["Payment"],
        "parameters": [
          {
            "name": "pageSize",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "pageNumber",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "payerId",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "apartmentId",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "isPayed",
            "in": "query",
            "schema": {
              "type": "boolean"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/PaymentViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PaymentViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/PaymentViewModelGeneral"
                }
              }
            }
          }
        }
      }
"/api/Payment/{id}": {
      "get": {
        "tags": ["Payment"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/PaymentViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PaymentViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/PaymentViewModelGeneral"
                }
              }
            }
          }
        }
      }

```

</details>

<details>

<summary>Post</summary>

```json
"/api/Payment": {
      "post": {
        "tags": ["Payment"],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PaymentInsertModel"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/PaymentInsertModel"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/PaymentInsertModel"
              }
            }
          }
        }
```

</details>

<details> 
<summary> Put </summary>

```json
"/api/Payment/{id}": {
      "put": {
        "tags": ["Payment"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/PaymentInsertModel"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/PaymentInsertModel"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/PaymentInsertModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/PaymentViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/PaymentViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/PaymentViewModelGeneral"
                }
              }
            }
          }
        }
      }
```

</details>

<details>

<summary> Delete</summary>

```json
"/api/Payment/{id}": {
      "delete": {
        "tags": ["Payment"],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              }
            }
          }
        }
      }
```

</details>

</details>

<details>

<summary><b>Messages</b></summary>

<details>

<summary> Get </summary>

```json
"/api/Message": {
      "get": {
        "tags": ["Message"],
        "parameters": [
          {
            "name": "receiverId",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/MessageViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MessageViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/MessageViewModelGeneral"
                }
              }
            }
          }
        }
      }
    }
"/api/Message/detail": {
      "get": {
        "tags": ["Message"],
        "parameters": [
          {
            "name": "receiverId",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          },
          {
            "name": "senderId",
            "in": "query",
            "schema": {
              "type": "integer",
              "format": "int32"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/MessageViewModelGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MessageViewModelGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/MessageViewModelGeneral"
                }
              }
            }
          }
        }
      }
    }
```

</details>

<details>

<summary>Post</summary>

```json
"/api/Message": {
      "post": {
        "tags": ["Message"],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageInsertModel"
              }
            },
            "text/json": {
              "schema": {
                "$ref": "#/components/schemas/MessageInsertModel"
              }
            },
            "application/*+json": {
              "schema": {
                "$ref": "#/components/schemas/MessageInsertModel"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "text/plain": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              },
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              },
              "text/json": {
                "schema": {
                  "$ref": "#/components/schemas/BooleanGeneral"
                }
              }
            }
          }
        }
      }
```

</details>

</details>

## API Request and Response Schemas

<details>

<summary>Apartment</summary>

```json
{
  "ApartmentViewModel": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int32"
      },
      "block": {
        "type": "string",
        "nullable": true
      },
      "number": {
        "type": "integer",
        "format": "int32"
      },
      "floor": {
        "type": "integer",
        "format": "int32"
      },
      "residentId": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "type": {
        "type": "string",
        "nullable": true
      },
      "isEmpty": {
        "type": "boolean",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "ApartmentViewModelGeneral": {
    "type": "object",
    "properties": {
      "isSuccess": {
        "type": "boolean"
      },
      "entity": {
        "$ref": "#/components/schemas/ApartmentViewModel"
      },
      "list": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/ApartmentViewModel"
        },
        "nullable": true
      },
      "totalCount": {
        "type": "integer",
        "format": "int32"
      },
      "queries": {
        "type": "string",
        "nullable": true
      },
      "exceptionMessage": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "ApartmentInsertModel": {
    "required": ["block", "floor", "number", "type"],
    "type": "object",
    "properties": {
      "block": {
        "pattern": "^([A-Z]{1})$",
        "type": "string"
      },
      "number": {
        "pattern": "^0*(?:[1-9][0-9]?|100)$",
        "type": "integer",
        "format": "int32"
      },
      "floor": {
        "pattern": "^([1-99])$",
        "type": "integer",
        "format": "int32"
      },
      "residentId": {
        "maximum": 2147483647,
        "minimum": 1,
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "type": {
        "pattern": "^([0-9]{1})[+]([1-6]{1})$",
        "type": "string"
      },
      "isEmpty": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  }
}
```

</details>

<details>
<summary>User</summary>

```json
{
  "UserLoginRequestModel": {
    "required": ["email", "password"],
    "type": "object",
    "properties": {
      "email": {
        "type": "string"
      },
      "password": {
        "type": "string"
      }
    },
    "additionalProperties": false
  },
  "UserLoginResponseModel": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int32"
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      },
      "isAdmin": {
        "type": "boolean"
      },
      "apartmentId": {
        "type": "integer",
        "format": "int32"
      },
      "token": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "UserLoginResponseModelGeneral": {
    "type": "object",
    "properties": {
      "isSuccess": {
        "type": "boolean"
      },
      "entity": {
        "$ref": "#/components/schemas/UserLoginResponseModel"
      },
      "list": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UserLoginResponseModel"
        },
        "nullable": true
      },
      "totalCount": {
        "type": "integer",
        "format": "int32"
      },
      "queries": {
        "type": "string",
        "nullable": true
      },
      "exceptionMessage": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "UserViewModel": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int32"
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      },
      "phoneNum": {
        "type": "string",
        "nullable": true
      },
      "isAdmin": {
        "type": "boolean"
      },
      "identityNum": {
        "type": "string",
        "nullable": true
      },
      "carPlateNum": {
        "type": "string",
        "nullable": true
      },
      "apartmentId": {
        "type": "integer",
        "format": "int32"
      }
    },
    "additionalProperties": false
  },
  "UserViewModelGeneral": {
    "type": "object",
    "properties": {
      "isSuccess": {
        "type": "boolean"
      },
      "entity": {
        "$ref": "#/components/schemas/UserViewModel"
      },
      "list": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/UserViewModel"
        },
        "nullable": true
      },
      "totalCount": {
        "type": "integer",
        "format": "int32"
      },
      "queries": {
        "type": "string",
        "nullable": true
      },
      "exceptionMessage": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "UserInsertModel": {
    "required": ["email", "identityNum", "name", "phoneNum"],
    "type": "object",
    "properties": {
      "name": {
        "maxLength": 50,
        "minLength": 0,
        "type": "string"
      },
      "email": {
        "maxLength": 50,
        "minLength": 0,
        "type": "string",
        "format": "email"
      },
      "phoneNum": {
        "pattern": "^(53)([1-9]{1})?([0-9]{3})?([0-9]{2})?([0-9]{2})$",
        "type": "string"
      },
      "identityNum": {
        "pattern": "^[0-9]{11}$",
        "type": "string"
      },
      "carPlateNum": {
        "pattern": "^([0-9]{2})([A-Z]{1,3})([0-9]{2,4})$",
        "type": "string",
        "nullable": true
      },
      "apartmentId": {
        "maximum": 2147483647,
        "minimum": 1,
        "type": "integer",
        "format": "int32",
        "nullable": true
      }
    },
    "additionalProperties": false
  }
}
```

</details>

<details>
<summary>Payment</summary>

```json
{
  "PaymentViewModel": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int32"
      },
      "type": {
        "type": "string",
        "nullable": true
      },
      "amount": {
        "type": "number",
        "format": "double"
      },
      "apartmentId": {
        "type": "integer",
        "format": "int32"
      },
      "payerId": {
        "type": "integer",
        "format": "int32"
      },
      "isPayed": {
        "type": "boolean"
      },
      "paymentDueDate": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "payedDate": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "idatetime": {
        "type": "string",
        "format": "date-time"
      }
    },
    "additionalProperties": false
  },
  "PaymentViewModelGeneral": {
    "type": "object",
    "properties": {
      "isSuccess": {
        "type": "boolean"
      },
      "entity": {
        "$ref": "#/components/schemas/PaymentViewModel"
      },
      "list": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/PaymentViewModel"
        },
        "nullable": true
      },
      "totalCount": {
        "type": "integer",
        "format": "int32"
      },
      "queries": {
        "type": "string",
        "nullable": true
      },
      "exceptionMessage": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "PaymentInsertModel": {
    "required": ["amount", "apartmentId", "payerId", "paymentDueDate", "type"],
    "type": "object",
    "properties": {
      "type": {
        "maxLength": 50,
        "minLength": 0,
        "type": "string"
      },
      "amount": {
        "minimum": 1,
        "type": "number",
        "format": "double"
      },
      "apartmentId": {
        "maximum": 2147483647,
        "minimum": 1,
        "type": "integer",
        "format": "int32"
      },
      "payerId": {
        "maximum": 2147483647,
        "minimum": 1,
        "type": "integer",
        "format": "int32"
      },
      "paymentDueDate": {
        "type": "string",
        "format": "date"
      }
    },
    "additionalProperties": false
  }
}
```

</details>

<details>
<summary>Message</summary>

```json
{
  "MessageViewModel": {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int32"
      },
      "messageText": {
        "type": "string",
        "nullable": true
      },
      "senderId": {
        "type": "integer",
        "format": "int32"
      },
      "recieverId": {
        "type": "integer",
        "format": "int32"
      },
      "isRead": {
        "type": "boolean"
      },
      "idatetime": {
        "type": "string",
        "format": "date-time"
      }
    },
    "additionalProperties": false
  },
  "MessageViewModelGeneral": {
    "type": "object",
    "properties": {
      "isSuccess": {
        "type": "boolean"
      },
      "entity": {
        "$ref": "#/components/schemas/MessageViewModel"
      },
      "list": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/MessageViewModel"
        },
        "nullable": true
      },
      "totalCount": {
        "type": "integer",
        "format": "int32"
      },
      "queries": {
        "type": "string",
        "nullable": true
      },
      "exceptionMessage": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "MessageInsertModel": {
    "required": ["messageText", "recieverId", "senderId"],
    "type": "object",
    "properties": {
      "messageText": {
        "maxLength": 100,
        "minLength": 0,
        "type": "string"
      },
      "senderId": {
        "maximum": 2147483647,
        "minimum": 1,
        "type": "integer",
        "format": "int32"
      },
      "recieverId": {
        "maximum": 2147483647,
        "minimum": 1,
        "type": "integer",
        "format": "int32"
      }
    },
    "additionalProperties": false
  }
}
```

</details>

## Houser

Using .Net Core for backend, MS SQL Server for database.

There's a middleware checks API requests for authorization **JWT** tokens.

### Action Filters

There's 3 action filters

> [Authorize] - [AllowAnonymous] - [Admin]

**[Authorize]** is a global filter for controllers. Checks if user exists in the token. But there's requests like _login_ where user is not known. So we use **[AllowAnonymous]** tag for this request. There's also third type **[Admin]** of filter that we use for processes like update and delete where user must be _admin_.

## Houser.Pay

Using .Net Core for backend, Mongo DB for database.

### Database

I used [MongoDb Atlas](https://cloud.mongodb.com/) for database solution. There's a free version that very easy to setup and use. It provides an connection string where you insert in the project. And you can use [MongoDb Compass](https://www.mongodb.com/products/compass) for editing your data.

#### Database Validation

I used theese validation rules for my collection. There's something you might not know about. When you set up your project in Atlass platform you set up users. If you do not edit your user as Db Admin you can not create validation rules. Just a little info.(You can find these configirations under Project -> Security -> Database Access -> Edit User)

<hr>

You can go to your collection in Compass, under the Validation tab you can set up your validation rules

```json
{
  "$jsonSchema": {
    "bsonType": "object",
    "required": [
      "amount",
      "userId",
      "paymentId",
      "paymentDate",
      "cardCvc",
      "cardDate",
      "cardHolderName",
      "cardNumber"
    ],
    "properties": {
      "amount": {
        "bsonType": "decimal",
        "description": "must be decimal and required"
      },
      "userId": {
        "bsonType": "int",
        "description": "must be int and required"
      },
      "paymentId": {
        "bsonType": "int",
        "description": "must be int and required"
      },
      "paymentDate": {
        "bsonType": "date",
        "description": "must be date and required"
      },
      "cardCvc": {
        "bsonType": "string",
        "description": "must be string and required"
      },
      "cardDate": {
        "bsonType": "string",
        "description": "must be string and required"
      },
      "cardHolderName": {
        "bsonType": "string",
        "description": "must be string and required"
      },
      "cardNumber": {
        "bsonType": "string",
        "description": "must be string and required"
      }
    }
  }
}
```

#### Database Connection

As I mentioned above, Atlas UI provides you with connection string to use in your applications, in my case it was for C#, it is very easy to connect. But if you do not have static IP like I do, you might encounter error:

> _Why the heck this is not connecting :(_

So to overcome this, you need to configure your network access. (use 0.0.0.0/0 only for development purposes).

<sub>Thank you mongodb free editon❤️ </sub>

# Frontend

Using React for frontend. Basically there's a AuthContext for user management. And rest is tables and forms using API endpoints from backend. I tried my best for user experience, like showing [Tooltip](https://chakra-ui.com/docs/overlay/tooltip) to user for hints about the UI.

[INSERT TOOLTIP PICTURE HERE]

## Packages used for this project

_UI_

- [Chakra UI](https://chakra-ui.com/) - (Dead simple ui for beginners)
- [Ant Design](https://ant.design/) - (A _lot_ more advanced than chakra , love it.)
- [React-Credit-Cards](https://yarnpkg.com/package/react-credit-cards) <small>(by [AMARO](https://github.com/amaroteam))</small> - (These legends just saved me a lot of time and effort.)
- [react-icons](https://react-icons.github.io/react-icons/) - ( Great icons library.)
-

_Misc_

- [Formik](https://formik.org/) - ( Makes form handling much easier.)
- [yup](https://yarnpkg.com/package/yup) - ( Really simple schema builder for validation.)
- [moment](https://yarnpkg.com/package/moment) - (Great date formatter.)
- [axios](https://yarnpkg.com/package/axios) - (Promise based HTTP client for the browser and node.js)
- [react-query](https://yarnpkg.com/package/react-query) - (Hooks for managing, caching and syncing asynchronous and remote data)
- [react-router-dom](https://yarnpkg.com/package/react-router-dom) - (Declarative routing for React web applications)
