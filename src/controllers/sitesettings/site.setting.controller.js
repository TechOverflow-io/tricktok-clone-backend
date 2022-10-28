// requiring Schema
const siteSetting = require("../../models/sitesettings/site.setting.model")
// function to add logo
exports.addLogo = async (req, res) => {
    try {
        // accepting file from req
        const { image } = req.files
        //path where file store
        const path = `${__dirname}/../../../public/images/logo/` + image.name
        await image.mv(path)
        req.body.image = `${image.name}`
        //saving path in database
        const logo = await siteSetting.create({
            ...req.body,
            logo: path,
        })
        res.status(200).json({
            status: 'Success',
            message: `logo uploaded with file name ${image.name}`
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'Fail',
            message: `logo not uploaded`,
            error: e
        })
    }
}
//Function to update logo if needed
exports.updateLogo = async (req, res) => {
    try {
        // accept file from req
        const { image } = req.files
        // Telling where to store the file
        const path = `${__dirname}/../../../public/images/` + image.name
        await image.mv(path)
        req.body.image = `${image.name}`
        // getting id to change logo from req
        const id = req.params.id
        //finding and updating logo
        const Ulogo = await siteSetting.findByIdAndUpdate(id, { logo: path }, { new: true })
        res.status(200).json({
            status: 'Success',
            message: `logo update with file name ${image.name}`
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'Fail',
            message: `logo not updated`,
            error: e
        })
    }

}