const app = require('./app');
require('./db/connection');

const { PORT = 7878 } = process.env;
app.listen(PORT, () => console.info(`Listening on port ${PORT}`)); // eslint-disable-line no-console