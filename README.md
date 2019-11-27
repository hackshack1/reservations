![Screenshot](https://i.imgur.com/Nbivpjz.png)

# Reservations

The reservations module of hackshack is an app that displays reservation availabilities, allows inserting a new reservation, and updating the calendar.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API](#api)
- [Examples](#examples)
- [FAQ](#faq)
- [Support](#support)

---

## Features

- Dynamic: Interactive calendar and reservation creation system
- Scalable: built to handle 10 million requests
- Attractive: simple, clean presentation with modern CSS features

## Contributing

- https://github.com/arunaskiyer
- https://github.com/averylizette
- https://github.com/VarunAroraCode

## Installation

### Clone

- Clone this repo to your local machine using `https://github.com/hackshack1/reservations`

### Setup

> install npm packages and dependencies

```shell
$ npm install
```

---

## API

### Get Requests

```GET /:listingid/reservations```

returns all reservations in JSON form for given listingid

Response JSON Object

| Name          | Type          | Description   |
| :------------ | :------------ | :------------ |
| id            | int           | identifies listing     |
| start_date    | date          | reservation starting date     |
| end_date      | date          | reservation ending date     |
| adult_count   | int           | number of adults booked     |
| children_count| int           | number of children     |
| infant_count  | int           | number of infants     |
| total         | decimal       | total price of reservation     |

### Post Requests

```POST /:listingid/reservations```

inserts new reservation into database

Request Object

| Name          | Type          | Description   |
| :------------ | :------------ | :------------ |
| id            | int           | Required.     |
| start_date    | date          | Required.     |
| end_date      | date          | Required.     |
| adult_count   | int           | Required.     |
| children_count| int           | Required.     |
| infant_count  | int           | Required.     |
| total         | decimal       | Required.     |

### Update Request

```UPDATE /:listingid/reservations/:reservationid```

updates reservation for given listing and reservationid

Request Object

| Name          | Type          | Description   |
| :------------ | :-------------| :-------------|
| id            | integer       | Required.     |
| start_date    | date          | Optional.     |
| end_date      | date          | Optional.     |
| adult_count   | date          | Optional.     |
| children_count| int           | Optional.     |
| infant_count  | int           | Optional.     |
| total         | int           | Optional.     |

### Delete Request

```DELETE /reservations/:reservationid```

deletes reservation for a given reservationid

---

## Examples

```
axios.get('/10/reservations', (response) => {
    console.log(response.data);
});

$[{
   id: 0,
   start_date: {...},
  end_date: {...},
   adult_count: 3,
   children_count: 0,
   infant_count: 0,
   discount: 0
},
{
   id: 1,
   start_date: {...},
   end_date: {...},
   adult_count: 1,
   children_count: 2,
   infant_count: 1,
   discount: 0
}]
```

## FAQ

- **This module looks identical to Airbnb. Why was this made?**
    - Permission from Airbnb was requested and provided.
    - This website was created as a tool to compare benchmarks between two different databases while simulating a real-world situation.

---

## Support

Reach out to me at one of the following places!

- Website at <a href="http://austinjang.com" target="_blank">`austinjang.com`</a>
- Twitter at <a href="http://twitter.com/insertthinghere" target="_blank">`@hackshack`</a>
