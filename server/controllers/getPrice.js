const FixedFloat = require('../fixedfloat')
const fixed = new FixedFloat()

const getPrice = async (req, res) => {
    const from = req.query.from
    const to = req.query.to
    try {
        const response = await fixed.getPrice(from, to)
        return res.status(201).json({ response })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports = getPrice