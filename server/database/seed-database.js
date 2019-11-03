const faker = require('faker');
const fs = require('fs');
const writeListings = fs.createWriteStream('listings.csv');
const writeReservations = fs.createWriteStream('reservations.csv');

const maxresperlisting = 10;
const maxcleaningfee = 0.15;
const maxservicefee = 0.15;
const maxminimumstay = 7;
const maxusers = 100;

function generateuser(id) {
  return {

  };
}

function generatelisting(id, id_users) {
  let cleaning_fee = faker.finance.amount(0.01, maxcleaningfee, 2);
  let service_fee = faker.finance.amount(0.01, maxservicefee, 2);
  let minimum_stay = faker.random.number(maxminimumstay);
  let base_price = faker.random.number({min: 20, max: 200});
  let average_rating = faker.finance.amount(0.10, 5.00, 2);
  let review_count = faker.random.number(500);

  let result = {
    id,
    cleaning_fee,
    service_fee,
    minimum_stay,
    base_price,
    id_users,
    average_rating,
    review_count
  };

  return result;
}

function generatereservations(listing, resindexstart, rescount) {
  let listofres = [];

  for(let i = 1; i < rescount; i++) {
    listofres.push(generatesinglereservation(resindexstart + i, listing));
  }
  return listofres;
}

function generatesinglereservation(id, listing) {
  let start_date = faker.date.future(1);

  var year = start_date.getFullYear();
  var month = start_date.getMonth();
  var day = start_date.getDate();
  
  let end_date = new Date(year, month, day + listing.minimum_stay + faker.random.number(30));
  let adult_count = faker.random.number({min: 1, max: 5});
  let children_count = faker.random.number(5);
  let infant_count = faker.random.number(5);

  const ONE_DAY = 1000 * 60 * 60 * 24;
  let diffbetweenDays = Math.round(Math.abs((start_date - end_date) / ONE_DAY));

  let pricebeforefees = listing.base_price * diffbetweenDays;
  let total = pricebeforefees + (parseFloat(listing.cleaning_fee) + parseFloat(listing.service_fee)) * pricebeforefees;

  let result = {
    id,
    listing_id: listing.id,
    start_date,
    end_date,
    adult_count,
    children_count,
    infant_count,
    total
  };
  return result;

}

function writeTenMillionListings(writeListings, writeReservations, encoding, callback) {
  writeListings.write('id, cleaning_fee, service_fee, minimum_stay, base_price, id_users, average_rating, review_count\n', 'utf8');
  writeReservations.write('id, listing_id, user_id, start_date, end_date, adult_count, children_count, infant_count, total\n', 'utf8');

  let i = 10000000;
  let id = 0;
  let resnumber = 0;
  function write() {
    let ok = true;
    let ok2 = true;
    do {
      i -= 1;
      id += 1;
      
      if (i % 100000 === 0) console.log(`number ${i} left`);
      let rescount = faker.random.number(maxresperlisting);
      let listing = generatelisting(id, faker.random.number(maxusers));
      let reservations = generatereservations(listing, resnumber, rescount);

      const data = `${listing.id},${listing.cleaning_fee},${listing.service_fee},${listing.minimum_stay},${listing.base_price},${listing.id_users},${listing.average_rating},${listing.review_count}\n`;

      reservations.forEach((reservation)=>{
        let data2 = `${reservation.id},${reservation.listing_id},${reservation.start_date},${reservation.end_date},${reservation.adult_count},${reservation.children_count},${reservation.infant_count},${reservation.total}\n`
        ok2 = writeReservations.write(data2, encoding)
      })

      // const data2 = `${reservations.cleaning_fee},${reservations.service_fee},${listing.minimum_stay},${listing.base_price},${listing.id_users},${listing.average_rating},${review_count}\n`;
      
      if (i === 0) {
        writeListings.write(data, encoding, callback);
        // writeReservations.write(data2, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writeListings.write(data, encoding);
        // ok2 = writeReservations.write(data2, encoding);
      }

      resnumber += rescount;
    } while (i > 0 && ok && ok2);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writeListings.once('drain', write);
      writeReservations.once('drain', write);
    }
  }
write()
}

writeTenMillionListings(writeListings, writeReservations, 'utf-8', () => {
  writeListings.end();
});
// writeTenMillionListings();
generatereservations(generatelisting(1,1));