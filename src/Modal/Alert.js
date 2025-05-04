const { ObjectId } = require('mongodb');
const TempDataSchema = require('../Schema/temporalSchema'); // Assuming you have a schema for tempData
const IncidentSchema = require('../Schema/incidentSchema'); // Assuming you have a schema for incidentData
class Alert {
 
  static async setIncident(incident) {
    const alert = {
      ...incident,
      incidentId : new ObjectId(),
      createdAt : new Date()
    }
    try{
      const result = await IncidentSchema.create(alert);
      if (result) {
        incident.processed = true// Assign the generated ID to the incident object
        incident.processedAt = alert.createdAt; // Set the processedAt date
        TempDataSchema.updateOne(
          { _id: incident._id },
          { $set: { processed: true, processedAt: alert.createdAt } }
        ).then((result) => {
          return {
            success: true,
            message: 'TempData updated successfully',
            resultId: result._id
          }
        }).catch((error) => {
          console.error('Error updating TempData:', error);
          return {
            success: false,
            message: 'Error updating TempData',
            error: error.message
          }
        });
      }

    }
    catch (error) {
      console.error('Error saving incident data:', error);
      throw new Error('Error saving incident data');
    }
  }

 
}

module.exports = Alert;