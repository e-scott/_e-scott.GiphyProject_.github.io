$(document).ready(function () {
    // An array of nerd actions, new  nerd actions will be pushed into this array;
    var nerd = ["Fail", "Cats", "Monday", "Gundam", "Spider-Man", "Tron", "Marvel", "DC", "Inside Out", "Mario", "Rick and Morty", "Archer", "Supernatural"];
    // Function that displays all gif buttons
    function displayButton() {
        $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
        for (var i = 0; i < nerd.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", nerd[i]);
            gifButton.text(nerd[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new nerd action button
    function addButton() {
        $("#addGif").on("click", function () {
            var action = $("#action-input").val().trim();
            if (action == "") {
                return false; // added so user cannot add a blank button
            }
            nerd.push(action);
            displayButton();
            $('#action-input').val('');
            return false;
        });
    }
    
    // Function to remove last nerd action button
    // sets it so that it will remove any array
    // number after 12
    function removeLast() {
        $("#removeGif").on('click', function () {
         if(nerd <= nerd[13]) {
            var remove = displayButton();
           nerd.pop(remove);
           }else {
               displayButton();
           }
           return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs() {
        var action = $(this).attr("data-name");
        var queryURL = `https://api.giphy.com/v1/gifs/search?q=${action}&api_key=pXlETJJ9Cis9vdwNwwdUTWJ2RAc8fmUZ&limit=10`;
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
                console.log(response); // console test to make sure something returns
                $("#gifsView").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
                var results = response.data; //shows results of gifs
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {

                    var gifDiv = $("<div>"); //div for the gifs to go inside
                    gifDiv.addClass("gifDiv");
                    // pulling rating of gif
                    var gifRating = $("<p>").html(`<span class="w">Rating: ${results[i].rating}</span>`);
                    gifDiv.append(gifRating);
                    // pulling gif
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); // still image
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
                    gifImage.attr("data-state", "still"); // set the image state
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    // pulling still image of gif
                    // adding div of gifs to gifsView div
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }
    // Calling Functions & Methods
    displayButton(); 
    addButton();
    removeLast();
    // Document Event Listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});