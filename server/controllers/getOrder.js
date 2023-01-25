const FixedFloat = require('../fixedfloat')
const fixed = new FixedFloat()

const getOrder = async (req, res) => {
    // const { id, token } = req.body
    const id = req.query.id
    const token = req.query.token
    try {
        const response = await fixed.getOrder(id, token)
        return res.status(201).json({ response })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports = getOrder