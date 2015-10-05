'use strict';

function initiateAJAX(url, callback) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if(xmlhttp.status == 200){
               callback(xmlhttp.responseText);
           }
           else if(xmlhttp.status == 400) {
              console.log('There was an error 400')
           }
           else {
               console.log('something else other than 200 was returned')
           }
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

var hackerAPI = 'https://hacker-news.firebaseio.com/v0/topstories.json';
var itemAPI = ' https://hacker-news.firebaseio.com/v0/item/';
var template = document.getElementById('template');

function callback(response) {
	response = JSON.parse(response);
	var outputHtml = '', templateHtml = '';
	for(var i = 0; i < response.length && i < 20; i++) {
		initiateAJAX(itemAPI + response[i]+'.json', function(story) {
			story = JSON.parse(story);
			templateHtml = template.innerHTML;
			templateHtml = templateHtml.replace('{{title}}', story.title);
			templateHtml = templateHtml.replace('{{url}}', story.url);
			outputHtml += templateHtml;
			document.getElementById('response').innerHTML = outputHtml;
		});
	}
}

initiateAJAX(hackerAPI, callback);