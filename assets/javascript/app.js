let topics = [
    "aerial",
    "architectural",
    "candid",
    "documentary",
    "fashion",
    "food",
    "landscape",
    "nature",
    "night",
    "photojournalism",
    "portrait",
    "sports",
    "street",
    "war",
    "wildlife"
];

const gifMaker = {
   
    createButtons() {
        topics.forEach((element) => {
            let topicBtn = $("<button>");
            topicBtn.addClass("button topic-button");
            topicBtn.attr("data-topic", element);
            topicBtn.text(element);
            $(".buttons").append(topicBtn);
        });
        $(".topic-button").on("click", function() {
            gifMaker.getGifs($(this));
        });
    },

    addTopic() {
        let newTopic = $("#topic-input").val().trim();
        topics.push(newTopic);
        topics.sort();
        $(".buttons").empty();
        $("#topic-input").val("");
        gifMaker.createButtons();
    },

    getGifs(thisTopic) {
        $(".three").empty();
        let topic = thisTopic.attr("data-topic");
        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${topic}&api_key=C3B2bBZNWCN7FbYAWf7CfSZNN1CRAMl6&limit=10`
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            let i = 1;
            response.data.forEach((element) => {
                let imageCard = $("<div>");
                imageCard.addClass("image-card");
                $(".three").append(imageCard);

                let topicImage = $("<img>");
                topicImage.attr("src", element.images.fixed_width_still.url);
                topicImage.attr("data-still", element.images.fixed_width_still.url);
                topicImage.attr("data-animate", element.images.fixed_width.url);
                topicImage.attr("data-state","still");
                topicImage.addClass("gif");
                $(`.image-card:nth-of-type(${i})`).append(topicImage);

                let ratingParagraph = $("<p>");
                ratingParagraph.addClass("rating");
                ratingParagraph.html("rating:&nbsp;" + element.rating);
                $(`.image-card:nth-of-type(${i})`).append(ratingParagraph);
                i++;
            });
            $(".gif").on("click", function() {
                gifMaker.toggleGifState($(this));
            });
        });
    },

    toggleGifState(thisGif) {
        if(thisGif.attr("data-state") === "still") {
            thisGif.attr("src", thisGif.attr("data-animate"));
            thisGif.attr("data-state","animate");
        } else if(thisGif.attr("data-state") === "animate") {
            thisGif.attr("src", thisGif.attr("data-still"));
            thisGif.attr("data-state","still"); 
        }

    }
}

$(document).ready(() => {
    gifMaker.createButtons();
    $("#add-topic").on("click", (e) => {
        e.preventDefault();
        gifMaker.addTopic();
    });
});