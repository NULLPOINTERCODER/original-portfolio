import http from 'http';

http.get('http://localhost:8080/api/codolio', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      console.log('SUCCESS:', json.success);
      if (json.success) {
        console.log('Max Streak:', json.data.user?.maxStreak);
      } else {
        console.log('ERROR:', json.error);
        if (json.preview) {
           console.log("HTML PREVIEW LENGTH: " + json.preview.length);
           console.log("PREVIEW:", json.preview);
        }
      }
    } catch (e) {
      console.error('Parse error:', e.message);
    }
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
