const assert = require('assert')
const fetch = require("node-fetch")

describe('App', function () {
    it('should return json with id 1', async function () {
        await fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res)
                assert.equal(res.id, 1)
            })
    })
})
