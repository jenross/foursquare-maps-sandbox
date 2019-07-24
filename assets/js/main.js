function buildQueryURL() {
    let search = $('#search-term').val().trim(); 
    const APIKEY = 'MTUwOTcwMjd8MTU2MzQ2MzA4Ny42OQ';
    let initialQueryURL = `https://api.seatgeek.com/2/events?q=${search}&client_id=${APIKEY}`;

    console.log(initialQueryURL);
    return initialQueryURL;
}


function clear() {
    $("#event-section").empty();
}

$("#run-search").on("click", function(event) {
    event.preventDefault();
    clear();
    let queryURL = buildQueryURL();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log('the response', response);
        let events = response.events.length; 
        let title;
        for (let i = 0; i < events; i++) {
          var tr = $('<tr>');
            title = $(`<td class='event-data title' id_zip='${response.events[i].venue.postal_code}' id_location='${response.events[i].venue.display_location}'><a href='#'>${response.events[i].title}</a></td>`);
            let initialDate = response.events[i].datetime_local;
            let m = moment(initialDate, 'YYYY-MM-DDThh:mm:ss');
            let convertedDate = $(`<td class='event-data'> ${m.format('ll')} </td>`);
            let location = $(`<td class='event-data local' id='${response.events[i].venue.postal_code}'>${response.events[i].venue.display_location}</td>`);
            let venue = $(`<td class='event-data'> ${response.events[i].venue.name} </td>`);
            let seatgeekURL = $(`<td class='event-data'><a href='${response.events[i].url}' target='_blank'>Tickets</a></td>`);

            let results = $('<ul>').addClass('each-event d-flex flex-row justify-content-around'); 
            results.append(title, convertedDate, location, venue, seatgeekURL);
            $(tr).append(title);
            $(tr).append(convertedDate);
            $(tr).append(location);
            $(tr).append(venue);
            $(tr).append(seatgeekURL);
            $('tbody').append(tr);
          }

        });
        
});
  
$("#clear-all").on("click", clear);


$(document).on('click', '.local', function() {
  alert('here');
  let search = $(this).attr('id');
  let query = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=3768f4c0e12f6d0baae543410dcc2366`;
  console.log(query);
  $.ajax({
    url: query,
    method: 'GET',
  }).then(function(response) {
    console.log(response);
  });
});

$(document).on('click', '.title', function() {
    alert('heyyo');

    const clientID = "LMTVE3CNXEET1N3OERSA0SYN0WK0WVXIAWKKB4R4FZ5APF1A";
    const clientSecret = "1GDFGDPYK3BYDW4OJJIN12UHHHIR3Y4HHHN3GXOG5RREK4LN";
    let zip = $(this).attr('id_zip');
    let location = $(this).attr('id_location');
    let queryURL = `https://api.foursquare.com/v2/venues/explore?client_id=${clientID}&client_secret=${clientSecret}&v=20190701&near=${location}&zip=${zip}&radius=500&cateogryId=4d4b7105d754a06374d81259,4d4b7105d754a06376d81259,4bf58dd8d48988d116941735&limit=25`;
    
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
     console.log(response);
   })

});

