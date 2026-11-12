const https = require('https');
https.get('https://ep-misty-cherry-aon84mbi-pooler.c-2.ap-southeast-1.aws.neon.tech', (res) => {
  console.log('Status code:', res.statusCode);
  process.exit(0);
}).on('error', (e) => {
  console.error('Error:', e.message);
  process.exit(1);
});

