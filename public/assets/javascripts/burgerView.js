$("#burgerFormInput").change(() => {
    if ($("#burgerFormInput").val() !== '') {
        $("#burgerFormSubmit").prop('disabled', false);
    }
});

$("#burgerFormSubmit").on("click", function (event) {
    event.preventDefault();
    var newBurger = {
        burger_name: $("#burgerFormInput").val().trim(),
        devoured: "F",
    };
    console.log(newBurger);

    // Send the POST request.
    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
    }).then(
        function () {
            console.log("created new burger");
            location.reload();
        }
        );
});

$(".eatBurger").on("click", function (event) {
    event.preventDefault();
    let currentBurger = this.id;
    // Send the PUT request.
    $.ajax(`/api/burgers/${currentBurger}`, {
        method: "PUT",
        //data: currentBurger
    }).then(
        function () {
            console.log("updated burger");
            location.reload();
        }
        );
});