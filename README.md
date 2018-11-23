### CLI

| Command  | Flag     | Argument                         | Description                                                |
|----------|----------|----------------------------------|------------------------------------------------------------|
| menu     | -none-   | -none-                           | Returns list of products available in db                   |
| order    | --id     | string - id of requested order   | Returns Order                                              |
| order    | --latest | -none-                           | Returns all Order that were created less then 24 hours ago |
| user     | --email  | string - email of requested user | Returns user with given email address                      |
| user     | --latest | -none-                           | Returns all users that were created less then 24 hours ago |
| man/help | -none-   | -none-                           | List all possible commands                                 |
| exit     | -none-   | -none-                           | Stops server and exit                                      |
### USER

| Method   | Description               | Payload                                                            | Headers | Queryparam  | Outcome            | Authorization      |
|----------|---------------------------|--------------------------------------------------------------------|---------|-------------|--------------------|--------------------|
| POST     | Add a new user            | name (string), email (string) address (string) password (string)   | None    | -none-      | user (JSON)        | :x:                |
| GET      | Get user information      | -none-                                                             | token   | id          | user (JSON)        | :heavy_check_mark: |
| PUT      | Modify user information   | id (string) name (string), email (string) address (string)         | token   | -none-      | user (JSON)        | :heavy_check_mark: |
| DELETE   | Remove user from database | id (string)                                                        | token   | -none-      | -none-             | :heavy_check_mark: |


### TOKEN

| Method   | Description                     | Payload                                                            | Headers | Queryparam  | Outcome            | Authorization      |
|----------|---------------------------------|--------------------------------------------------------------------|---------|-------------|--------------------|--------------------|
| POST     | Creates token for user          | id (string) password (string)                                      | -none-  | -none-      | token (JSON)       | :x:                |
| GET      | Returns token for user          | -none-                                                             | -none-  | id          | token (JSON)       | :x:                |
| PUT      | Update expiration date of token | id (string)                                                        | -none-  | -none-      | token (JSON)       | :x:                |
| DELETE   | Removes token from user         | id (string)                                                        | -none-  | -none-      | -none-             | :x:                |


### CART

| Method   | Description                | Payload                                                            | Headers | Queryparam  | Outcome            | Authorization      |
|----------|----------------------------|--------------------------------------------------------------------|---------|-------------|--------------------|--------------------|
| POST     | Creates cart for user      | id (string)                                                        | token   | -none-      | cart (JSON)        | :heavy_check_mark: |
| GET      | Returns existing user cart | -none-                                                             | token   | id          | cart (JSON)        | :heavy_check_mark: |
| PUT      | Modify user cart content   | id (string) items ([{ "id": string, "quantity": number }])         | token   | -none-      | cart (JSON)        | :heavy_check_mark: |
| DELETE   | Remove cart                | id (string)                                                        | token   | -none-      | -none-             | :heavy_check_mark: |

### ORDER

| Method   | Description                 | Payload                                                            | Headers | Queryparam  | Outcome            | Authorization      |
|----------|-----------------------------|--------------------------------------------------------------------|---------|-------------|--------------------|--------------------|
| POST     | Creates cart for user       | id (string)                                                        | token   | -none-      | order (JSON)       | :heavy_check_mark: |
| GET      | Returns existing user order | -none-                                                             | token   | id          | order (JSON)       | :heavy_check_mark: |
| DELETE   | Remove cart                 | id (string)                                                        | token   | -none-      | -none-             | :heavy_check_mark: |

### PAYMENT

| Method   | Description                 | Payload                                                            | Headers | Queryparam  | Outcome            | Authorization      |
|----------|-----------------------------|--------------------------------------------------------------------|---------|-------------|--------------------|--------------------|
| POST     | Pays for user order         | id (string) orderId (string) token (string)                        | token   | -none-      | success (JSON)     | :heavy_check_mark: |

### MENU

| Method   | Description                           | Payload                                                            | Headers | Queryparam  | Outcome            | Authorization      |
|----------|---------------------------------------|--------------------------------------------------------------------|---------|-------------|--------------------|--------------------|
| GET      | Returns fixed list of available items | -none-                                                             | token   | id          | menu (JSON)        | :heavy_check_mark: |
