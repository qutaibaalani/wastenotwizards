## https://waste-not-wizards.onrender.com

**Token Authentication System**
* Djoser
* Docs: https://djoser.readthedocs.io/en/latest/introduction.html
  
## Deployment
* Render
* Main Webservice Address: https://waste-not-wizards.onrender.com
* Database: Postgresql@14
* Docs: https://render.com/docs/deploy-django



## Create User
> https://waste-not-wizards.onrender.com/auth/users

*request*
```json
POST auth/users

{
    "username": "admin",
    "password": "apassword"
}
```

*response*
```json
HTTP_201_created
    {
    "username": "admin",
    "password": "apassword",
    "id": 1
    }
```


## LOGIN
> https://waste-not-wizards.onrender.com/auth/token/login

*request*
```json
POST auth/token/login/
    {
    "username": "admin",
    "password": "apassword"
    }
```

*response*
```json
HTTP_200_OK
    {
    "auth_token": "TokenHere"
    }
```
## LOGOUT
> https://waste-not-wizards.onrender.com/auth/token/logout

*request*
```json
POST auth/token/logout/
```

*response*
```json
HTTP_204_NO_CONTENT
```

## PROFILE
> https://waste-not-wizards.onrender.com/api/profile/username/

*request*
```json
GET api/profile/<username>/
```

*response*
```json
    {
	"id": 1,
	"password": "pbkdf2_sha256$600000$9RZMOQvUWwFqmF3DyP0Nz7$tmojz/lYSK+d6qpk/0BRQUyZT1a6eRGnIMAU2mgruzs=",
	"last_login": "2023-07-19T19:19:50.805471Z",
	"is_superuser": true,
	"username": "superuser",
	"first_name": "",
	"last_name": "",
	"is_staff": true,
	"is_active": true,
	"date_joined": "2023-07-18T19:32:14.930573Z",
	"user_type": null,
	"email": "",
	"phone_number": null,
	"address": null,
	"groups": [],
	"user_permissions": []
}
```
*request*

**PATCH  api/profile/<username>/**

*response*
> Any changes made to profile:
```json
{
	"id": 1,
	"password": "pbkdf2_sha256$600000$9RZMOQvUWwFqmF3DyP0Nz7$tmojz/lYSK+d6qpk/0BRQUyZT1a6eRGnIMAU2mgruzs=",
	"last_login": "2023-07-19T19:19:50.805471Z",
	"is_superuser": true,
	"username": "superuser",
	"first_name": "",
	"last_name": "",
	"is_staff": true,
	"is_active": true,
	"date_joined": "2023-07-18T19:32:14.930573Z",
	"user_type": null,
	"email": "",
	"phone_number": null,
	"address": null,
	"groups": [],
	"user_permissions": []
}
```

*request*

**DELETE  api/profile/<username>/**


**response**
```json
204_NO_CONTENT
```

## POSTS
> https://waste-not-wizards.onrender.com/api/posts

*request*
```json
GET api/posts
```

*response*
```json
    [
	{
		"id": 6,
		"posted_by_user": "superprovider",
		"food_list": "daf",
		"monetary_value": 1,
		"location": "afda"
	},
	{
		"id": 7,
		"posted_by_user": "superuser",
		"food_list": "dafa",
		"monetary_value": 1,
		"location": "d"
	}
]
```
*request*

**PATCH  /api/posts/<pk>**

*response*
> Any changes made to profile:
```json
{
	"id": 1,
	"password": "pbkdf2_sha256$600000$9RZMOQvUWwFqmF3DyP0Nz7$tmojz/lYSK+d6qpk/0BRQUyZT1a6eRGnIMAU2mgruzs=",
	"last_login": "2023-07-19T19:19:50.805471Z",
	"is_superuser": true,
	"username": "superuser",
	"first_name": "",
	"last_name": "",
	"is_staff": true,
	"is_active": true,
	"date_joined": "2023-07-18T19:32:14.930573Z",
	"user_type": null,
	"email": "",
	"phone_number": null,
	"address": null,
	"groups": [],
	"user_permissions": []
}
```

*request*

**DELETE  api/posts/<pk>**


**response**
```json
204_NO_CONTENT
```


## PROVIDER POSTS
> https://waste-not-wizards.onrender.com/api/profile/<username>/posts/

*request*
```json
GET api/profile/<username>/posts/
```

*response*
```json
[
    {
        "id": 7,
        "posted_by_user": "superuser",
        "food_list": "dafa",
        "monetary_value": 1,
        "location": "d"
    },
    {
        "id": 8,
        "posted_by_user": "superuser",
        "food_list": "dafa",
        "monetary_value": 1,
        "location": "dasfa"
    }
]
```
*request*

