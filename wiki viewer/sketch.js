var url = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
var api;
var wiki;
var something;
var ids = [];
var button;

function setup() {
  noCanvas();
  button = select('#submit');
  // button.position(windowWidth/2 + 200, windowHeight/2);
  button.mousePressed(wikiUrl);
  
  input = select('#search');
  // input.position(windowWidth/2,windowHeight/2);
}


function wikiUrl() {
  api = url + input.value();
  console.log(api);
  loadJSON(api, gotData, 'jsonp');
}

function gotData(data) {
  wiki = data;
  // print(wiki);
  Object.keys(wiki.query.pages).forEach(function(key,index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
    if (index === 0) {
      console.log(wiki.query.pages[key]);
    }
    ids[index] = key;
    // print(ids[i]);
    
  });
}
  

function draw() {
  
  if (wiki) {
   
    for (var i = 0; i < ids.length; i++) {
      $('#result'+i).html(wiki.query.pages[ids[i]].title);
      $('#para'+i).html(wiki.query.pages[ids[i]].extract);
      document.getElementById("link"+i).href = "https://en.wikipedia.org/?curid=" + ids[i];
    }
    
    // something = createElement('h2', wiki.query.pages[ids[1]].title);
    // something.position(50,50);
    // print(wiki.query.pages[ids[0]].title);
    // print(ids[1]);
    
    // noLoop();
  }
}