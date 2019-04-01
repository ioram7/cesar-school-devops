console.log("Application started!")

exports.sum = function(numA, numB) {
  return numA + numB
}

exports.multiply = function(numA, numB) {
  return numA * numB
}

exports.double = function(numA) {
  return this.multiply(numA,2)
}

console.log("Application stopped!")