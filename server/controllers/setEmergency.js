const FixedFloat = require('../fixedfloat')
const fixed = new FixedFloat()

const setEmergency = async (req, res) => {
    const { id, token, choice, address } = req.body
    try {
        const response = await fixed.setEmergency(id, token, choice, address)
        return res.status(201).json({ response })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports = setEmergency