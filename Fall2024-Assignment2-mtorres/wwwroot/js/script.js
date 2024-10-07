
document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

let apiKey;


async function getBingApiKey() {
    try {
        const response = await fetch('/api/config/bingapikey');
        if (response === null) {
            console.log("Response is null")
        }

        const data = await response.json();
        
        apiKey = data.apiKey;
    } catch (error) {
        console.error('Error fetching the API key:', error);
    }
}

// window.onload = getBingApiKey;

$(document).ready(function() {

    var searched = false;
    
    function apiSearch() {
        var params = {
            'q': $('#query').val(),
            'count': 50,
            'offset': 0,
            'mkt': 'en-us'
        };

        // if (!apiKey) {
        //     console.error('API Key is undefined');
        //     return;
        // }

        $.ajax({
            url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
            type: 'GET',
            headers: {
                // 'Ocp-Apim-Subscription-Key': apiKey
                'Ocp-Apim-Subscription-Key': 'd0dac8ad9bba4824a3ad020479a946e7'
            }
        })
            .done(function (data) {
                var len = data.webPages.value.length;
                var results = '';
                for (i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                }

                $('#searchResults').html(results).show();
                
                searched = true;
            })
            .fail(function () {
                alert('error');
            });
    }

    function apiImageSearch() {
        var params = {
            'q': $('#query').val(),
            'count': 50,
            'offset': 0,
            'mkt': 'en-us'
        };
        
        if (!apiKey) {
            console.log("apiKey not found");
        }

        $.ajax({
            url: 'https://api.bing.microsoft.com/v7.0/images/search?' + $.param(params),
            type: 'GET',
            headers: {
                // 'Ocp-Apim-Subscription-Key': apiKey
                'Ocp-Apim-Subscription-Key': 'd0dac8ad9bba4824a3ad020479a946e7'
            }
        })
            .done(function (data) {
                $('#searchResults').empty().show()
                data.value.forEach(function (image) {
                    const imgElement = $('<img>')
                        .attr('src', image.thumbnailUrl)
                        .addClass('imageResult');
                    
                    $('#searchResults').append(imgElement);
                })

                searched = false;
            })
            .fail(function () {
                alert('error');
            });
    }
    
    function goToFirst() {
        if (searched) {
            window.location.href = $('#searchResults').find('p:first a:first').attr("href");
        }
        else {
            var q_val = $('#query').val();
            if (!(q_val.length === 0)) {
                var params = {
                    'q': q_val,
                    'count': 1,
                    'offset': 0,
                    'mkt': 'en-us'
                };

                $.ajax({
                    url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
                    type: 'GET',
                    headers: {
                        'Ocp-Apim-Subscription-Key': 'd0dac8ad9bba4824a3ad020479a946e7'
                    }
                })
                    .done(function (data) {
                        window.location.href = data.webPages.value[0].url;
                    })
                    .fail(function () {
                        alert('error');
                    });
            }
            else {
                alert("You need to give a search query to use the lucky button.")
            }
        }
    }
    
    function getCurrentTime() {
        var currentDate = new Date();
        return currentDate.toLocaleTimeString();
    }
    
    function displayTime() {
        $('#time').html(getCurrentTime()).dialog();
    }

    document.getElementById("query").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            // Action for Enter
            event.preventDefault(); // Prevent the default action (form submission)
            apiSearch();
        }
    });

    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    }


    $('#title').click(toggleTheme);
    $('#searchButton').click(apiSearch);
    $('#imageSearchButton').click(apiImageSearch);
    $('#timeButton').click(displayTime);
    $('#luckyButton').click(goToFirst);
    

});