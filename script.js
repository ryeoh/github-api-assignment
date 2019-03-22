'use strict';

// The user must be able to search for a GitHub user handle.
// The search must trigger a call to GitHub's API.
// The repos associated with that handle must be displayed on the page.
// You must display the repo name and link to the repo URL.
// The user must be able to make multiple searches and see only the results for the current search.


// watch form submissions
function watchForm() {
    console.log('Ready to fetch!')
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        console.log(searchTerm);
        getUserRepos(searchTerm);
    });
}

// Request to GitHub's API by user name/handle
function getUserRepos(searchTerm) {
    fetch('https://api.github.com/users/' + searchTerm + '/repos')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error (response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {$('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}

// display the results in the DOM
function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i=0; i < responseJson.length; i++) {
        $('#results-list').append(`<li><h3>${responseJson[i].name}</h3><a href='${responseJson[i].html_url}'>Link to Repo</a></li>`)
    };
    $('#results').removeClass('hidden');
}

$(watchForm);
