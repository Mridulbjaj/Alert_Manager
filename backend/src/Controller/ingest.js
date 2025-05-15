const TempModal = require('../Modal/temporal'); // Assuming you have a model for tempData

exports.handleIngest = async (req, res, next) => {
    try {
        const TempData = new TempModal(req.body,req.headers['x-source'] || 'unknown', new Date(), false, null);
        const response = await TempData.save();
        res.status(201).json({
            message: 'Data ingested successfully',
            docId: response
        });
    } catch (error) {
        console.error('Error ingesting data:', error);
        res.status(500).json({
            message: 'Error ingesting data',
            error: error.message
        });
    }
}


exports.findUnresolvedAlerts = async (req, res, next) => {
    try {
        const unresolvedData = await TempModal.find({ processed: false });
       return {
        data: unresolvedData,
        success: true,
    } // Return the unresolved data for further processing
    }catch (error) {
        return {
            success: false,
            message: error.message,
            data: null,
        }
    }
}