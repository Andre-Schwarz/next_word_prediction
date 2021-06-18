import model from '../../public/model/model.json'

export default function handler(req, res) {
    console.log("model" ,model)
    res.status(200).json(model)
}