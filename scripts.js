document.getElementById('shortenForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const originalUrl = document.getElementById('originalUrl').value;

    fetch('http://localhost:8080/api/v1/shorten', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl: originalUrl }),
    })
        .then(response => response.text())
        .then(shortUrl => {
            document.getElementById('shortUrl').href = shortUrl;
            document.getElementById('shortUrl').textContent = shortUrl;
            document.getElementById('result').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById('retrieveForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const shortUrl = document.getElementById('shortenedUrl').value;

    const shortUrlPath = shortUrl.replace('http://short.url/', '');

    fetch(`http://localhost:8080/api/v1/${shortUrlPath}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(originalUrl => {
            if (originalUrl) {
                document.getElementById('originalUrlDisplay').href = originalUrl;
                document.getElementById('originalUrlDisplay').textContent = originalUrl;
                document.getElementById('originalResult').classList.remove('hidden');
            } else {
                document.getElementById('originalUrlDisplay').textContent = 'Original URL not found';
                document.getElementById('originalUrlDisplay').removeAttribute('href');
                document.getElementById('originalResult').classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('originalUrlDisplay').textContent = 'Error retrieving URL';
            document.getElementById('originalUrlDisplay').removeAttribute('href');
            document.getElementById('originalResult').classList.remove('hidden');
        });
});


// document.getElementById('retrieveForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//
//     const shortUrl = document.getElementById('shortenedUrl').value;
//     const shortUrlPath = shortUrl.replace('http://short.url/', '');
//
//     fetch(`http://localhost:8080/api/v1/${shortUrlPath}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.text();
//         })
//         .then(originalUrl => {
//             if (originalUrl) {
//                 document.getElementById('originalUrlDisplay').href = originalUrl;
//                 document.getElementById('originalUrlDisplay').textContent = originalUrl;
//                 document.getElementById('originalResult').classList.remove('hidden');
//             } else {
//                 document.getElementById('originalUrlDisplay').textContent = 'Original URL not found';
//                 document.getElementById('originalUrlDisplay').removeAttribute('href');
//                 document.getElementById('originalResult').classList.remove('hidden');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             document.getElementById('originalUrlDisplay').textContent = 'Error retrieving URL';
//             document.getElementById('originalUrlDisplay').removeAttribute('href');
//             document.getElementById('originalResult').classList.remove('hidden');
//         });
// });

