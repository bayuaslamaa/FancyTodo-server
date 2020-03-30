# FancyTodo-server


**1. Create Todo**
----
    Creating a new data and returning json created data.

* **URL**

  /todos

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
 
   `title=[string]`, 
   `description=[string]`,
      `status=[boolean]`,
         `due_date=[date(string)]`

    **Example:** `{ title: making apps, description: making todos app, status:false, due_date}`


* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{id: 1, title: making apps, description: making todos app, status:true, due_date:2020-01-01}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** ` {errors: 
        [
            message: the description must be not empty,
            type: Validation error,
            path: description,
            .....
        ]}`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: Internal server errror }`

* **Sample Call:**

  ```javascript
    let settings = {
  "url": "http://localhost:3000/todos",
  "method": "POST",
  "timeout": 0,
  "data": {
    "title": "making apps",
    "description": "making todo apps",
    "status": "true",
    "due_date": "2020-01-01"
  }};   
    $.ajax(settings).done(function (response) {
    console.log(response);
    });
  ```


**2. Show Todos**
----
  Returns json data about all todos.

* **URL**

  /todos

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "success getting all data",
    "todo": [
        {
            "id": 9,
            "title": "Makan malam",
            "description": "Makan",
            "status": true,
            "due_date": "2020-05-09T00:00:00.000Z",
            "createdAt": "2020-03-30T13:50:30.082Z",
            "updatedAt": "2020-03-30T13:50:30.082Z"
        }
    ]
}
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: Internal server errror }`

* **Sample Call:**

  ```javascript
   let settings = {
  "url": "http://localhost:3000/todos",
  "method": "GET",
  "timeout": 0,}; 
    $.ajax(settings).done(function (response) {
     console.log(response);
    });
  ```


**3. Show Todo**
----
  Returns json data about a single todo.

* **URL**

  /todos/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "success getting data with id: 9",
    "todo": {
        "id": 9,
        "title": "Makan malam",
        "description": "Makan",
        "status": true,
        "due_date": "2020-05-09T00:00:00.000Z",
        "createdAt": "2020-03-30T13:50:30.082Z",
        "updatedAt": "2020-03-30T13:50:30.082Z"
    }
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "not found" }`

  

* **Sample Call:**

  ```javascript
     let settings = {
    "url": "http://localhost:3000/todos/3",
    "method": "GET",
    "timeout": 0,
      };
    $.ajax(settings).done(function (response) {
     console.log(response);
    });
  ```

**4. Update User**
----
  Returns json data about a updated single user.

* **URL**

  /todos/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  **Required:**
 
   `title=[string]`, 
   `description=[string]`,
      `status=[boolean]`,
         `due_date=[date(string)]`

    **Example:** `{ title: making apps, description: making todos app, status:false, due_date}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "success updating data with id: 8",
    "todo": {
        "id": 8,
        "title": "making apps",
        "description": "making todos app",
        "status": false,
        "due_date": "2020-03-30T00:00:00.000Z",
        "createdAt": "2020-03-30T12:53:34.948Z",
        "updatedAt": "2020-03-30T12:54:09.332Z"
    }
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "not found" }`

  OR

 * **Code:** 400 BAD REQUEST <br />
    **Content:** ` {errors: 
        [
            message: the description must be not empty,
            type: Validation error,
            path: description,
            .....
        ]}`

     OR

     * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: Internal server errror }`

* **Sample Call:**

  ```javascript
      let settings = {
      "url": "http://localhost:3000/todos/5",
     "method": "PUT",
     "timeout": 0,
     "data": {
       "title": "mandi",
       "description": "mandi malam",
        "status": "true",
        "due_date": "2020-03-30"
     }
    };

      $.ajax(settings).done(function (response) {
      console.log(response);
    });
  ```

**5. Delete User**
----
  Returns json data about a updated single user.

* **URL**

  /todos/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "message": "success deleting data with id: 8",
    "todo": {
        "id": 8,
        "title": "making apps",
        "description": "making todos app",
        "status": false,
        "due_date": "2020-03-30T00:00:00.000Z",
        "createdAt": "2020-03-30T12:53:34.948Z",
        "updatedAt": "2020-03-30T12:54:09.332Z"
    }
}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "not found" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ message: Internal server errror }`

* **Sample Call:**

  ```javascript
      let settings = {
       "url": "http://localhost:3000/todos/1",
       "method": "DELETE",
       "timeout": 0,
      };

      $.ajax(settings).done(function (response) {
       console.log(response);
      });
  ```