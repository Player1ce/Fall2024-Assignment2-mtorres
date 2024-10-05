$(document).ready(function() {

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

                $('#searchResults').html(results).dialog();
            })
            .fail(function () {
                alert('error');
            });
    }

    $('#searchButton').click(apiSearch)

});