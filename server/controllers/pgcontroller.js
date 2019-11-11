const db = require('../pg.js');

module.exports = {
  async getListingById(req, res, next) {
    try {
      let id = req.params.id;
      let query = await db.query('SELECT * from listings where id=$1::int', [id]);
      res.send(query.rows[0]);
    } catch (error) {
      error.message;
    }
  },
  async getReservationInfoById(req, res, next) {
    try {
      let id = req.params.listingid;
      console.log(id);
      let query = await db.query('Select reservations.id, reservations.start_date, reservations.end_date, reservations.adult_count, reservations.children_count, listings.id, listings.cleaning_fee, listings.service_fee, listings.minimum_stay, listings.base_price, listings.average_rating, listings.review_count FROM reservations INNER JOIN listings ON reservations.id_listings=listings.id WHERE reservations.id_listings=$1::int;', [id]);
      res.send(query.rows[0]);
    } catch (error) {
      error.message;
    }
  },
  async insertReservationById(req, res, next) {
    try {
      let id = req.params.id;
      let query = await db.query('INSERT INTO listings where id=$1::int', [id]);
      // console.log(query.rows[0].id); // Hello world!
      res.send(query.rows[0]);
    } catch (error) {
      error.message;
    }
  }
}
