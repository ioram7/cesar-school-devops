const App = require('../../main/app')
const assert = require('assert')

describe('App', function () {
    it('should sum', function () {
        assert(App.sum(1, 2) === 3)
    })

    it('should multiply', function () {
        assert(App.multiply(2,2) === 4)
    })

})