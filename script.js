document.getElementById('cryptoSubmit').addEventListener('click', function(event) {
    event.preventDefault();
    const value = document.getElementById('cryptoInput').value;
    if (value === "")
        return;
    console.log(value);

    const url = "https://api.nomics.com/v1/currencies/ticker?key=68d4db299ef610934091fd1ae43937e7&ids=" + value.toUpperCase();
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            let price = "";
            price += '<div class="coinprice"><img src="' + json[0].logo_url + '"/>';
            price += '<h2 class="coinname">' + json[0].currency + "</h2></div>";
            price += '<h2 class="currentprice">$' + parseFloat(json[0].price).toFixed(4) + '</h2>';
            document.getElementById('cryptoPrice').innerHTML = price;
        });

    let endTime = new Date();
    let startTime = new Date(endTime);
    startTime.setDate(startTime.getDate() - 1);
    
    setTimeout(function() { //The API only allows one request per second, so I had to delay this one
        const url2 = "https://api.nomics.com/v1/currencies/sparkline?key=68d4db299ef610934091fd1ae43937e7&ids=" + value.toUpperCase() + "&start=" + startTime.toISOString();
        fetch(url2)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);
                let lineGraph = "";
                lineGraph += '<p><span class="sparkline">';
                for (let i = 0; i < json[0].prices.length; i++) {
                    lineGraph += json[0].prices[i];
                    if (i != json[0].prices.length - 1) {
                        lineGraph += ", ";
                    }
                }
                lineGraph += '</span></p>';
                document.getElementById('cryptoGraph').innerHTML = lineGraph;
                jQuery($('.sparkline'));
                $(function() {
                    $('.sparkline').sparkline('html', {
                        width: "90%",
                        height: "100%",
                    });
                });

                document.getElementById("spacer").style.height = "1px";
            });
    }, 1500);

    setTimeout(function() {
        const url3 = "https://api.nomics.com/v1/currencies?key=68d4db299ef610934091fd1ae43937e7&ids=" + value.toUpperCase() + "&attributes=name,description,website_url";
        fetch(url3)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);
                let metadata = "";
                metadata += '<p class="description">' + json[0].description + '</p>';
                metadata += '<a class="weblink" href="' + json[0].website_url + '">' + json[0].name + ' website</a>';
                document.getElementById('cryptoLink').innerHTML = metadata;
                document.getElementById('cryptoLink').style.paddingBottom = "10px";
            });
    }, 2500);

    window.onresize = function(event) { // This is so the graph refreshes whenever the window resizes.
        const url2 = "https://api.nomics.com/v1/currencies/sparkline?key=68d4db299ef610934091fd1ae43937e7&ids=" + value.toUpperCase() + "&start=" + startTime.toISOString();
        fetch(url2)
            .then(function(response) {
                return response.json();
            }).then(function(json) {
                console.log(json);
                let lineGraph = "";
                lineGraph += '<p><span class="sparkline">';
                for (let i = 0; i < json[0].prices.length; i++) {
                    lineGraph += json[0].prices[i];
                    if (i != json[0].prices.length - 1) {
                        lineGraph += ", ";
                    }
                }
                lineGraph += '</span></p>';
                document.getElementById('cryptoGraph').innerHTML = lineGraph;
                jQuery($('.sparkline'));
                $(function() {
                    $('.sparkline').sparkline('html', {
                        width: "90%",
                        height: "100%",
                    });
                });

                document.getElementById("spacer").style.height = "1px";
            });
    }
});