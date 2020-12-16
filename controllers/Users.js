const getUserOrders = async() => {
  console.log("Controller");
  const ret = await db.collection('Users').aggregate([
    {
      '$lookup': {
        'from': 'Orders', 
        'let': {
          'subTotal': '$SubTotal', 
          'userId': '$userId', 
          'orderId': '$orderId'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$userId', '$$userId'
                ]
              }
            }
          }, {
            '$group': {
              '_id': null, 
              'count': {
                '$sum': 1
              }, 
              'AvgValue': {
                '$avg': '$SubTotal'
              }
            }
          }
        ], 
        'as': 'res'
      }
    }, {
      '$addFields': {
        'res': {
          '$arrayElemAt': [
            '$res', 0
          ]
        }
      }
    }, {
      '$project': {
        '_id': 0, 
        'userId': 1, 
        'name': 1, 
        'noOfOrder': '$res.count', 
        'averageBillCount': '$res.AvgValue'
      }
    }
  ]).toArray();
  console.log(ret[0]);
  return ret;
}

const updateUser = async() => {
  try{
    console.log("Controller");
    const ret = await db.collection('Users').aggregate([
      {
        '$lookup': {
          'from': 'Orders', 
          'let': {
            'subTotal': '$SubTotal', 
            'userId': '$userId', 
            'orderId': '$orderId'
          }, 
          'pipeline': [
            {
              '$match': {
                '$expr': {
                  '$eq': [
                    '$userId', '$$userId'
                  ]
                }
              }
            }, {
              '$group': {
                '_id': null, 
                'count': {
                  '$sum': 1
                }
              }
            }
          ], 
          'as': 'res'
        }
      }, {
        '$addFields': {
          'res': {
            '$arrayElemAt': [
              '$res', 0
            ]
          }
        }
      }, {
        '$set': {
          'noOfOrders': '$res.count'
        }
      }, {
        '$unset': 'res'
      }, {
        '$out': 'Users'
      }
    ]);  
    return {success: true};
  }
  catch(e) {
    return {success: false};
  }
  // console.log(ret);
}

exports = module.exports = {
  getUserOrders,
  updateUser
}