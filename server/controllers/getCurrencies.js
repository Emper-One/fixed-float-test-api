const FixedFloat = require('../fixedfloat')
const fixed = new FixedFloat()

const getCurrency = async (req, res) => {
    try {
        const response = await fixed.getCurrencies()
        return res.status(201).json({ response })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports =  getCurrency