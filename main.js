$(document).ready(function() {
  $("form").submit(function(e) {
   e.preventDefault();
   $("#display").empty();
   let name =  e.currentTarget.name.value;
   if(!name){
    alert("Enter name");
    return;
   }
   getCountryFlag(name).then(result =>{
    console.log(result[0].flag);
    result.forEach(element => {
    var card = $('<div>', {class: "card"}).appendTo('#display');
    var country = $('<div>', {class: "country-info"}).appendTo(card);

    var img = $('<a id="img-link" href="#" onClick="showInfo()"><div>',
      {class: "img"}).appendTo(country);
    $('<img>', {src: element.flag}).appendTo(img);
    var text = $('<div>', {class: "right-text"}).appendTo(country);
    $('<p>', {text: "Name: " + element.name}).appendTo(text);
    $('<p>', {text: "Top Level Domain: " +
    element.topLevelDomain}).appendTo(text);
    $('<p>', {text: "Capital: " + element.capital}).appendTo(text);
    $('<h4>', {text: 'Currencies:'}).appendTo(text);
    element.currencies.forEach(element =>{
      var currencies = $('<div>', {
        class: "currencies"
      }).appendTo(text);
      $('<span>', {text: element.code + " "}).appendTo(currencies);
    })
  });

  }).catch(err =>console.log(err));
});
});

async function getCountryFlag(name){
  const response = await
  fetch(`https://restcountries.eu/rest/v2/name/${name}`);
  const responseData = await response.json();

  return responseData;
}

function showInfo() {
  console.log($('.right-text'));
  $('.right-text').css('display', 'block');
  $('.details-cls').css('display', 'block');
  $('img').css('display', 'none');
   $('.search-group').css('display', 'none');
   $('.flag-cls').css('display', 'none');
}