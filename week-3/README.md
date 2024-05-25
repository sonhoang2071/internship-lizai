# GUIDE

# 1. How to run project

- build image mysql

```jsx
docker build -t mysql_db .
```

- run image to container

```jsx
docker run -d -p 2071:3306 mysql_db
```

- run application node js

```jsx
node app.js
```

# 2. API

## 2.1 Api for basic-api project

- get all post : GET

```jsx
http://localhost:3000/basic-api/posts
```

- get a post : GET

```jsx
http://localhost:3000/basic-api/posts/:id
```

- create post : POST

```jsx
http://localhost:3000/basic-api/posts
// {
// 	title : ...,
// 	content : ...
// }
```

- update post : PUT

```jsx
http://localhost:3000/basic-api/posts/:id
// {
// 	title : ...,
// 	content : ...
// }
```

- delete post : DELETE

```jsx
http://localhost:3000/basic-api/posts/:id
```

## 2.2 Api for exercises

- ex1 : POST

```jsx
http://localhost:3000/exercise/ex1
// {
// 	url : ...
// }
```

- ex2 : POST

```jsx
http://localhost:3000/exercise/ex2
// {
// 	url : ...
// }
```