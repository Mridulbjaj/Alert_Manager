const Alert = require('../Modal/Alert');
const { findUnresolvedAlerts } = require('../Controller/ingest.js');
const { analyze_with_gemini, generate_fallback_analysis } = require('../Controller/llm.js');

exports.fetchAlerts = async (req, res) => {
  console.log('fetchAlerts called');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const unresolvedAlerts = await findUnresolvedAlerts();

    if (!unresolvedAlerts?.data?.length) {
      res.write(`data: ${JSON.stringify({ message: 'No unresolved alerts found' , data: null})}\n\n`);
      res.write(`data: ${JSON.stringify({ message: 'response end' })}\n\n`);
      return res.end();
    }

    res.write(`data: ${JSON.stringify({ message: 'Alerts fetching is starting' , data: null})}\n\n`);

    for (const alert of unresolvedAlerts.data) {
      try {
        const result = await Alert.setIncident(alert);
        res.write(`data: ${JSON.stringify({
          message: `Alert with ID ${result.data._id} processed successfully`,
          status: true,
          data: result.data
        })}\n\n`);
      } catch (error) {
        res.write(`data: ${JSON.stringify({
          message: 'Error processing alert',
          error: error.message,
          status: false,
          data: alert
        })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ message: 'All alerts processed' , data: null})}\n\n`);
    res.write(`data: ${JSON.stringify({ message: 'LLM analysis is now starting' , data: null})}\n\n`);

    const alerts = await Alert.fetchAlerts({processed: 'false'}, 0);

    if (!alerts || !alerts.length) {
      res.write(`data: ${JSON.stringify({ message: 'No alerts found for analysis', data: {}})}\n\n`);
      res.write(`data: ${JSON.stringify({ message: 'response end' })}\n\n`);
      return res.end();
    }

    for (const alert of alerts) {
      try {
        const analysisResult = await analyze_with_gemini(alert);
        if (analysisResult.status) {
          res.write(`data: ${JSON.stringify({
            alertId: alert._id,
            message: 'Analyzed successfully by LLM',
            status: true,
            data: analysisResult.data
          })}\n\n`);
        } else {
          const fallbackResult = await generate_fallback_analysis(alert);
          if (fallbackResult.status) {
            res.write(`data: ${JSON.stringify({
              alertId: alert._id,
              message: 'Analyzed successfully by fallback',
              status: true,
              data: fallbackResult.data
            })}\n\n`);
          } else {
            res.write(`data: ${JSON.stringify({
              data: alert,
              message: 'Fallback analysis failed',
              status: false
            })}\n\n`);
          }
        }

      } catch (error) {
        res.write(`data: ${JSON.stringify({
          data: null,
          message: 'Error during analysis of alert',
          error: error.message,
          status: false
        })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ message: 'LLM analysis completed' })}\n\n`);
    res.write(`data: ${JSON.stringify({ message: 'response end' })}\n\n`);
    res.end();

  } catch (error) {
    res.write(`data: ${JSON.stringify({
      message: 'Server error while processing alerts',
      error: error.message,
      status: false,
      data: {}
    })}\n\n`);
    res.write(`data: ${JSON.stringify({ message: 'response end' })}\n\n`);
    res.end();
  }
};


// exports.getThreats = async (req, res) => {
//   try {
//     let threats = await Alert.fetchAlerts({}, 10);
//     if (!threats || !threats.length) {
//       return res.status(500).json({ message: 'No New threats found' });
//     }
//     threats = threats.map(threat => {
//       return {
//       computerName: threat.computerName,
//       confidenceLevel: threat.confidenceLevel,
//       verdict: threat.Agent_Verdict,
//       status: threat.processed,
//       threatName: threat.threatName,
//       }
//     });
//     res.status(200).json(threats);
//   } catch (error) {
//     console.error('Error fetching threats:', error);
//     res.status(500).json({ message: 'Error fetching threats' });
//   }
// }