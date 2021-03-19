db.person.aggregate([
  {
    $match: { gender: "female" },
  },
]);
//$match is to filter the data on the mongodb server

db.person.aggregate([
  { $match: { gender: "female" } },
  {
    $group: {
      _id: { state: "$location.state" },
      totalFemale: { $sum: 1 },
    },
  },
]);

//$sum:1 to add 1 for every match

//to count total no. of females and sort them descending totalFemale: -1
db.person.aggregate([
  { $match: { gender: "female" } },
  {
    $group: {
      _id: { state: "$location.state" },
      totalFemale: { $sum: 1 },
    },
  },
  { $sort: { totalFemale: -1 } },
]);

//to count total no. of person per state
db.person.aggregate([
  { $match: {} },
  {
    $group: {
      _id: { state: "$location.state" },
      totalPerson: { $sum: 1 },
    },
  },
  { $sort: { totalPerson: -1 } },
]);

//$addToSet in the group
db.person.aggregate([
  { $match: {} },
  {
    $group: {
      _id: { state: "$location.state" },
      userName: { $addToSet: "$login.username" },
    },
  },
]);

//$max $min $avg age per state
db.person
  .aggregate([
    { $match: {} },
    {
      $group: {
        _id: { state: "$location.state" },
        maxAge: { $max: "$dob.age" },
        minAge: { $min: "$dob.age" },
        avgAge: { $avg: "$dob.age" },
      },
    },
    { $sort: { avgAge: 1 } },
  ])
  .pretty();

//using the projection and concat 
//to change the view 
//it will transform all the documents separately don't accumulate them
db.person.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: { $concat: ["$name.first"," ", "$name.last"] },
    },
  },
]);

db.person.aggregate([
    {
        $project:{
            _id:0,
            gender:1,
            fullName:{$concat:[
                {$toUpper:"$name.first"}," ",{$toUpper:"$name.last"}
            ]}
        }
    }
])
