const path = require('path');
const router = require('express').Router();

router.get('*', (req, res) => {
  const route = path.join(__dirname, '..', '..', 'src', 'index.html');
  res.sendFile(route);
});

module.exports = router;
