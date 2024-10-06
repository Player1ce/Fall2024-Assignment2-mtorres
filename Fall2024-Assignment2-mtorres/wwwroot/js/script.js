
document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

$(document).ready(function() {

    var searched = false;
    
    function apiSearch() {
        var params = {
            'q': $('#query').val(),
            'count': 50,
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

        $.ajax({
            url: 'https://api.bing.microsoft.com/v7.0/images/search?' + $.param(params),
            type: 'GET',
            headers: {
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
            alert("No search to go to.");
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