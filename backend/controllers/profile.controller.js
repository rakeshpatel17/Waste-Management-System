const loginModel = require('../model/login.model');

async function getData(req, res) {
    const { uid, ...updateData } = req.body;
    console.log("Request body:", req.body);

    try {
        const updatedData = await loginModel.findOneAndUpdate(
            { uid },
            updateData,
            { new: true }
        );
        
        if (!updatedData) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(updateData);
        const updatedUserData = await loginModel.find({uid:uid})
        res.status(200).json({ message: `Data Updated Successfully`, updatedUserData });
    } catch (error) {
        console.error("Error updating data:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getUserDetails(req, res) {
    const { uid } = req.params.id;
    try {
        const userData = await loginModel.find({uid:uid})
        res.status(200).json({ message: `Data Sent Successfully`, userData });
    } catch (error) {
        console.error("Error sending data:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getAllUsers(req, res) {
    try {
        const userData = await loginModel.find({})
        res.status(200).json({ message: `Data Sent Successfully`, userData });
    } catch (error) {
        console.error("Error sending data:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {getData,getUserDetails,getAllUsers};
