const TempDataSchema = require('../Schema/temporalSchema'); // Assuming you have a schema for tempData

class  Temporal {
    constructor(payload, source, receivedAt=new Date(), processed=false, processedAt=null) {
        this.payload = payload;
        this.source = source;
        this.receivedAt = receivedAt
        this.processed = processed
        this.processedAt = processedAt;
        
    }
    async save() {
        try{
        const savedDoc =  await TempDataSchema.create(this);
        return savedDoc._id; // Return the document ID after saving
        }catch (error) {
            console.error('Error saving data:', error);
            throw new Error('Error saving data');
        }
    }

    static async find(query) {
        try {
            const data = await TempDataSchema.find(query);
            return data;
        } catch (error) {
            console.error('Error finding data:', error);
            throw new Error('Error finding data');
        }
    }
}

module.exports = Temporal;