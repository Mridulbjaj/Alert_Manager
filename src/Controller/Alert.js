const Alert = require('../Modal/Alert');
const { findUnresolvedAlerts } = require('../Middleware/ingest');

exports.fetchAlerts = async (req, res) => {
    try {
        const unresolvedAlerts = await findUnresolvedAlerts();
        if (unresolvedAlerts.data.length === 0) {
            return res.status(404).json({
                message: 'No unresolved alerts found'
            });
        } else {
            unresolvedAlerts.data.forEach(alert => {
                const result = Alert.setIncident(alert)
                if (result.success) {
                    res.status(200).json({
                        message: str(result.id) + ' alert fetched successfully.',
                    })
                }
                else {
                    res.status(200).json({
                        message: str(result.id) + ' alert unable to fetch.',
                    })
                }
            })}
    }catch (error) {
        console.error('Error fetching unresolved alerts:', error);
        res.status(500).json({
            message: 'Error fetching unresolved alerts',
            error: error.message
        });
    }
}