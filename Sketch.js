var potus;
var counts = {};

function preload() {
    potus = loadJSON('potus.json');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    var tweets = potus.tweets;
    for (var i = 0; i < tweets.length; i++) {
        //createP(tweets[i].timestamp);
        var date = new Date(tweets[i].timestamp);
        var month = date.getMonth();
        var year = date.getFullYear();
        var key = month + '/' + year;

        //Count how many time a tweet has the same month and year
        if (counts.hasOwnProperty(key)) {
            counts[key]++;
        } else {
            counts[key] = 1;
        }
    }
    background('#FA8072');
    console.log(counts);

    var months = Object.keys(counts);
    var w = width / months.length;
    var maxtweets = 0;

    for (var i = 0; i < months.length; i++) {
        var month = months[i];
        var num = counts[month];

        if (num > maxtweets) {
            maxtweets = num;
        }
    }

    for (var i = 0; i < months.length; i++) {
        var month = months[i];
        var num = counts[month];
        var h = map(num, 0, maxtweets, 0, height - 50);
        fill('#8B0000');
        rect(i * w, height - h, w - 3, h);
    }
}