const form = document.querySelector('.submit-to-google-sheet');
const scriptURL = 'https://script.google.com/macros/s/AKfycbx6d5cc1d60xI8MiEplLrxfpG3NYQfi-mJOgz_2AFOOwq-BAsNFgwbOr9hZHMpbJ0pVEg/exec';

// Load from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    form.Name.value = localStorage.getItem('userName') || '';
    form.Email.value = localStorage.getItem('userEmail') || '';
    form.Message.value = localStorage.getItem('userMessage') || '';

    document.getElementById('saved-name').innerText = localStorage.getItem('userName') || 'N/A';
    document.getElementById('saved-email').innerText = localStorage.getItem('userEmail') || 'N/A';
    document.getElementById('saved-message').innerText = localStorage.getItem('userMessage') || 'N/A';
});

form.addEventListener('submit', e => {
    e.preventDefault('');
 


    const name = form.Name.value;
    const email = form.Email.value;
    const message = form.Message.value;

    // Save to localStorage
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userMessage', message);

    // Show on page
    document.getElementById('saved-name').innerText = name;
    document.getElementById('saved-email').innerText = email;
    document.getElementById('saved-message').innerText = message;

    // Submit to Google Sheets
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log('Success!', response);
            form.reset(); // ✅ Clear input fields after successful submit
        })
        .catch(error => console.error('Error!', error.message));
});