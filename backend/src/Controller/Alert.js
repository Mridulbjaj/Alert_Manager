const Alert = require('../Modal/Alert');
const { findUnresolvedAlerts } = require('../Middleware/ingest');

exports.fetchAlerts = async (req, res) => {
    console.log('fetchAlerts called');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders(); // send headers right away
  
    try {
      const unresolvedAlerts = await findUnresolvedAlerts();
  
      if (unresolvedAlerts.data.length === 0) {
        res.write(`data: ${JSON.stringify({ message: 'No unresolved alerts found' })}\n\n`);
        return res.end();
      }
      res.write(`data: ${JSON.stringify({ message: 'Alerts Fetching is starting' })}\n\n`);
      for (const alert of unresolvedAlerts.data) {
        try {
          const result = await Alert.setIncident(alert);
          res.write(`data: ${JSON.stringify({
            alertId: result.resultId,
            message: `Alert with ID ${result.resultId} processed successfully`,
            status: true
          })}\n\n`);
        } catch (error) {
          res.write(`data: ${JSON.stringify({
            alertId: alert._id,
            message: 'Error processing alert',
            error: error.message,
            status: false
          })}\n\n`);
        }
      }
  
      res.write(`data: ${JSON.stringify({ message: 'All alerts processed' })}\n\n`);
      res.end();
  
    } catch (error) {
      res.write(`data: ${JSON.stringify({
        message: 'Server error while processing alerts',
        error: error.message,
        status: false
      })}\n\n`);
      res.end();
    }
}