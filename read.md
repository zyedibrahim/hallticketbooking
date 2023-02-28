## Post a rooms data

db.rooms.insertMany([
{
"id":1,
"name": "Room 1",
"seats": 40,
"amenities": ["projector", "sound system"],
"price_per_hour": 100
},
{
"id":2,
"name": "Room 2",
"seats": 50,
"amenities": ["projector", "sound system","privatepool"],
"price_per_hour": 300
},

    {
      "id":3,
        "name": "Room 2",
        "seats": 50,
        "amenities": ["projector", "sound system","theater"],
        "price_per_hour": 500
      },

    ]

)

## Post Booking data

db.booking.insertMany([
{
"id": 1,
"customer_name": "John Doe",
"date": "2023-03-01",
"start_time": "10:00",
"end_time": "12:00",
"room_id": 1
},
{
"id": 2,
"customer_name": "John Doony",
"date": "2023-02-29",
"start_time": "10:30",
"end_time": "12:00",
"room_id": 2
},

      {
        "id": 3,
        "customer_name": "John",
        "date": "2023-02-21",
        "start_time": "10:30",
        "end_time": "12:00",
        "room_id": 3
      }

])

## and Show the Customer Details oF Room booked data

db.rooms.aggregate([
{
$lookup:
{
from: "booking",
localField: "id",
foreignField: "id",
as: "bookeddata"
}
}
])
