const { ObjectId } = require('mongodb');
const TempDataSchema = require('../Schema/temporalSchema'); // Assuming you have a schema for tempData
const IncidentSchema = require('../Schema/incidentSchema'); // Assuming you have a schema for incidentData
class Alert {
 
  static async setIncident(incident) {
    const alert = {
      incidentId : new ObjectId(),
      createdAt : new Date(),
      ...incident._doc,
    }
    try{
        const result = await IncidentSchema.create(alert);
      
        if (result) {
          incident.processed = true;
          incident.processedAt = alert.createdAt;
      
          // This line will throw if something goes wrong
          const storingResult = await TempDataSchema.updateOne(
            { _id: incident._id },
            { $set: { processed: true, processedAt: alert.createdAt } }
          );
      
          console.log('TempData updated successfully:', storingResult);
      
          return {
            success: true,
            message: 'TempData updated successfully',
            resultId: result._id
          };
        }
      } catch (error) {
        // This catches errors from both `create` and `updateOne`
        console.error('Error:', error);
        return {
          success: false,
          message: 'An error occurred',
          error: error.message
        };
      }
  }

 
}

module.exports = Alert;