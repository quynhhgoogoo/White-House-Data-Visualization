var potus;
var counts = {};
var ignore = {
    "the": 'true',
    "that": 'true',
    "this": 'true',
    "what": 'true',
    "to": 'true',
    "we": 'true',
    "of": 'true',
    "and": 'true',
    "a": 'true',
    "http": 'true',
    "https": 'true',
    "our": 'true',
    "will": 'true',
    "with": 'true',
    "have": 'true',
}

function preload() {
    potus = loadJSON('potus.json');
    //potus = loadJSON('flotus.json');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textAlign(LEFT);

    var tweets = potus.tweets;
    for (var i = 0; i < tweets.length; i++) {
        //createP(tweets[i].timestamp);
        var date = new Date(tweets[i].timestamp);
        var month = date.getMonth();
        var year = date.getFullYear();
        var key = month + '/' + year;

        //Count how many time a tweet has the same month and year
        if (counts.hasOwnProperty(key)) {
            counts[key].total++;
        } else {
            counts[key] = {
                total: 1,
                words: {

                }
            };
        }
        var txt = tweets[i].text;
        //split the text into an array
        var words = txt.split(/\W+/); //chop any character that is not words

        for (var j = 0; j < words.length; j++) {
            var word = words[j].toLowerCase();

            if (word.length > 0) {
                if (counts[key].words.hasOwnProperty(word)) {
                    counts[key].words[word]++;
                } else {
                    counts[key].words[word] = 1;
                }
            }
        }
    }
    background('#FA8072');
    console.log(counts);

    var months = Object.keys(counts);
    var w = width / months.length;
    var maxtweets = 0;

    for (var i = 0; i < months.length; i++) {
        var month = months[i];
        var num = counts[month].total;

        if (num > maxtweets) {
            maxtweets = num;
        }
    }

    for (var i = 0; i < months.length; i++) {
        var month = months[i];
        var num = counts[month].total;
        var h = map(num, 0, maxtweets, 0, height - 50);
        fill('#8B0000');
        rect(i * w, height - h, w - 3, h);

        var wordCounts = counts[month].words;
        var words = Object.keys(wordCounts);
        var biggest = 0;
        var biggestWord = '';

        for (var j = 0; j < words.length; j++) {
            var word = words[j];
            if (wordCounts[word] > biggest && !ignore[word] && word.length > 3) {
                biggest = wordCounts[word];
                biggestWord = word;
            }
        }

        fill(255);
        text(biggestWord, i * w, height - h - 5);
    }
}