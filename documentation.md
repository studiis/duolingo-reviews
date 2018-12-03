
DUOLINGO COURSE REVIEWS
---

Name: Sarit Eisen

Date: December 7th, 2018

Project Topic: Reviews of Duolingo language courses

URL: 

---


### 1. Data Format and Storage

####Review
Data point fields:
- `Field 1`: language `Type`: String
- `Field 2`: rating `Type`: Number
- `Field 3`: comment `Type`: String
- `Field 4`: experience_level `Type`:  Number
- `Field 5`: duolingo_username `Type:`: String

Schema:
```javascript
{
    language: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    comment: {
        type: String
    },
    experience_level: {
        type: Number,
        min: 1.0,
        max: 25.0,
        required: true
    },
    duolingo_username: {
        type: String,
        required: true
    }
}
```

### 2. Add New Data

HTML form route: ``/submit``

POST endpoint route: `/api/review`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'http://localhost:3000/api/review',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       language: 'French',
       rating: 4,
       comment: 'Great for learning vocab and reading French, but needs more listening comprehension practice',
       experience_level: 12,
       duolingo_username: 'user123'
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/review`

### 4. Search Data

Search Field: language

### 5. Navigation Pages

Navigation Filters
1. Spanish Reviews -> `/spanish`
2. French Reviews -> `/french`
3. Chinese Reviews -> `/chinese`
4. Positive Reviews -> `/positive`
5. Critical Reviews -> `/critical`

