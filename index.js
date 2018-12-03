var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require('underscore');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var Review = require('./models/Review');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5 
 * endpoints for the API, and 5 others.
 */
dotenv.load();

// Connect to MongoDB
console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

app.post('/api/review', function(req, res) {
    // Create new movie
    var review = new Review({
        language: req.body.language,
        rating: parseInt(req.body.rating),
        comment: req.body.comment,
        experience_level: parseInt(req.body.experience_level),
        duolingo_username: req.body.duolingo_username
    });

    // Save movie to database
    review.save(function(err) {
        if (err) throw err;
        return res.send('Successfully inserted review.');
    });
});

app.get('/', function(req, res) {
    Review.find({}, function(err, reviews) {
        if (err) throw err;
        res.render('allreviews', {
            title: "Duolingo Course Reviews",
            all_reviews: reviews,
            helpers: {
                times: function (n, block) {
                    var accum = '';
                    for(var i = 0; i < n; ++i)
                        accum += block.fn(i);
                    return accum;
                }
            }
        });
    });
});

app.get('/api/review', function(req, res) {
    Review.find({}, function(err, reviews) {
        if (err) throw err;
        res.send(reviews);
    });
});

app.get('/submit', function(req, res) {
    Review.find({}, function(err, reviews) {
        if (err) throw err;
        res.render('submit', {
            title: "Submit Review"
        })
    });
});

app.get('/spanish', function(req, res) {
    Review.find({}, function(err, reviews) {
        if (err) throw err;
        var spanish_reviews = [];
        console.log(reviews.length)
        for (var i = 0; i < reviews.length; i++) {
             if (reviews[i].language.toLowerCase() === "spanish") {
                spanish_reviews.push(reviews[i]);
             }
        }
        res.render('allreviews', {
            title: "Spanish Reviews",
            all_reviews: spanish_reviews,
            helpers: {
                times: function (n, block) {
                    var accum = '';
                    for(var i = 0; i < n; ++i)
                        accum += block.fn(i);
                    return accum;
                }
            }
        })
    });
});

app.get('/french', function(req, res) {
    Review.find({}, function(err, reviews) {
        if (err) throw err;
        var french_reviews = [];
        console.log(reviews.length)
        for (var i = 0; i < reviews.length; i++) {
            if (reviews[i].language.toLowerCase() === "french") {
                french_reviews.push(reviews[i]);
            }
        }
        res.render('allreviews', {
            title: "French Reviews",
            all_reviews: french_reviews,
            helpers: {
                times: function (n, block) {
                    var accum = '';
                    for(var i = 0; i < n; ++i)
                        accum += block.fn(i);
                    return accum;
                }
            }
        })
    });
});

app.get('/chinese', function(req, res) {
    Review.find({}, function(err, reviews) {
        if (err) throw err;
        var chinese_reviews = [];
        console.log(reviews.length)
        for (var i = 0; i < reviews.length; i++) {
            if (reviews[i].language.toLowerCase() === "chinese") {
                chinese_reviews.push(reviews[i]);
            }
        }
        res.render('allreviews', {
            title: "Chinese Reviews",
            all_reviews: chinese_reviews,
            helpers: {
                times: function (n, block) {
                    var accum = '';
                    for(var i = 0; i < n; ++i)
                        accum += block.fn(i);
                    return accum;
                }
            }
        })
    });
});

app.get('/positive', function(req, res) {
    Review.find({}, function(err, reviews) {
        if (err) throw err;
        var positive_reviews = [];
        console.log(reviews.length)
        for (var i = 0; i < reviews.length; i++) {
            if (reviews[i].rating === 4 || reviews[i].rating === 5) {
                positive_reviews.push(reviews[i]);
            }
        }
        res.render('allreviews', {
            title: "Positive Reviews",
            all_reviews: positive_reviews,
            helpers: {
                times: function (n, block) {
                    var accum = '';
                    for(var i = 0; i < n; ++i)
                        accum += block.fn(i);
                    return accum;
                }
            }
        })
    });
});

app.get('/critical', function(req, res) {
    Review.find({}, function(err, reviews) {
        if (err) throw err;
        var negative_reviews = [];
        console.log(reviews.length)
        for (var i = 0; i < reviews.length; i++) {
            if (reviews[i].rating === 1 || reviews[i].rating === 2) {
                negative_reviews.push(reviews[i]);
            }
        }
        res.render('allreviews', {
            title: "Critical Reviews",
            all_reviews: negative_reviews,
            helpers: {
                times: function (n, block) {
                    var accum = '';
                    for(var i = 0; i < n; ++i)
                        accum += block.fn(i);
                    return accum;
                }
            }
        })
    });
});

app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
