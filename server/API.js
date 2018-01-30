// API
// ===

const {config} = require('./config/config');
const rawData = require('./data.json');
const uuidv3 = require('uuid/v3');
const {PAGINATION_LENGTH} = config;
console.log('data length ', rawData.length)
const pageCount = Math.ceil( rawData.length / PAGINATION_LENGTH );

const indexedData = rawData.map( row =>  {
	row.uuid = uuidv3(
		`${row.LiquidityProvider}-${row.Client}- ${row.volume}`,
		config.UUID_DOMAIN
	);
	row.pageCount = pageCount;
	return row
});

/**
 *
 * @param pageNumber
 * @param PAGINATION_LENGTH
 * @param results
 * @returns {*}
 */
function paginateResults(pageNumber, PAGINATION_LENGTH, results) {
	const startIndex = pageNumber * PAGINATION_LENGTH - PAGINATION_LENGTH;
	const endIndex = startIndex + PAGINATION_LENGTH;
	return results
		.slice(startIndex, endIndex)
		.map( row => {
			row.pagination = true;
			row.pageNumber = pageNumber;
			return row
		});
}

module.exports.api = function(server) {

	server.get('/api/getData', function(req, res) {
		const data =indexedData.map( row => {
			row.paginated = false;
			row.pageNumber = null;
			return row;
		} );
		res.send(200, data);
	});

	server.get('/api/getData/page/:page', function(req, res) {
		const {page: pageNumber} = req.params;
		const data = paginateResults( pageNumber, config.PAGINATION_LENGTH, indexedData );
		res.send(200, data);
	});

};
