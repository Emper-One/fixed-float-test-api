const FixedFloat = require('../fixedfloat')
const fixed = new FixedFloat()

const createOrder = async (req, res) => {
    const { from, to, toAddress } = req.body
    console.log('---req----', from, to, toAddress)
    try {
        const response = await fixed.createOrder(from, to, toAddress)
        console.log('---responde---', response)
        return res.status(201).json({ response })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports = createOrder