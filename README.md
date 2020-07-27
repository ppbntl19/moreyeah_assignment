
# More Yeah Assignment

Tech Stack

Node- "v12.10.0" with Express Framework
MongoDB - Latest with mongoose ORM


API - 


# Create user availability
http://localhost:8080/api/user/availability

Type POST

Body : 
```
{
"startTime":  "Mon Jul 27 2020 12:19:06 GMT+0530 (India Standard Time)",
"endTime": "Mon Jul 27 2020 14:19:06 GMT+0530 (India Standard Time)",
"userName":  "test123",
"firstName":  "Test",
"lastName" :"Test"
}


Response :

{
    "data": {
        "_id": "5f1e5fc2c5f81405814303d8",
        "startTime": "2020-07-27T06:49:06.000Z",
        "endTime": "2020-07-27T08:49:06.000Z",
        "userId": "5f1e5f47c5f81405814303d3",
        "__v": 0
    }
}
```



# Get user availability
http://localhost:8080/api/user/availability:userID

Type GET

```

Response :

{
    "data": {
        "2020-07-27T00:00:00+05:30": [
            {
                "_id": "5f1e5f47c5f81405814303d4",
                "startTime": "2020-07-27T04:49:06.000Z",
                "endTime": "2020-07-27T05:49:06.000Z",
                "userId": "5f1e5f47c5f81405814303d3",
                "__v": 0
            },
            {
                "_id": "5f1e5f66c5f81405814303d5",
                "startTime": "2020-07-27T05:49:06.000Z",
                "endTime": "2020-07-27T06:49:06.000Z",
                "userId": "5f1e5f47c5f81405814303d3",
                "__v": 0
            },
            {
                "_id": "5f1e5fc2c5f81405814303d8",
                "startTime": "2020-07-27T06:49:06.000Z",
                "endTime": "2020-07-27T08:49:06.000Z",
                "userId": "5f1e5f47c5f81405814303d3",
                "__v": 0
            }
        ],
        "2020-07-29T00:00:00+05:30": [
            {
                "_id": "5f1e5f7dc5f81405814303d6",
                "startTime": "2020-07-29T05:49:06.000Z",
                "endTime": "2020-07-29T06:49:06.000Z",
                "userId": "5f1e5f47c5f81405814303d3",
                "__v": 0
            }
        ],
        "2020-07-30T00:00:00+05:30": [
            {
                "_id": "5f1e5f93c5f81405814303d7",
                "startTime": "2020-07-30T05:49:06.000Z",
                "endTime": "2020-07-30T06:49:06.000Z",
                "userId": "5f1e5f47c5f81405814303d3",
                "__v": 0
            }
        ]
    }
}
```

# TODO

Return data based on usertime zone --  Or better do this on client side