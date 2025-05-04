const TempModal = require('../Models/temporal'); // Assuming you have a model for tempData

exports.handleIngest = async (req, res, next) => {
    try {
        const TempData = new TempModal({
            payload: req.body,
            source: req.headers['x-source'] || 'unknown',
            receivedAt: new Date(),
            processed: false,
            processedAt: null
        });
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


exports.findUnresolvedData = async (req, res, next) => {
    try {
        const unresolvedData = await TempModal.find({ processed: false });
        res.status(200).json({
            message: 'Unresolved data fetched successfully',
            data: unresolvedData
        });
    }catch (error) {
        console.error('Error fetching unresolved data:', error);
        res.status(500).json({
            message: 'Error fetching unresolved data',
            error: error.message
        });
    }
}