import express from "express"
import Quote from "inspirational-quotes"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.w8ogeew.mongodb.net/notesDB`, {useNewUrlParser: true})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

const notesSchema = {
    noteId: String,
    title: String,
    content: String
}

const Note = mongoose.model("Note", notesSchema);

app.get("/", function(req, res) {
    res.status(200).send(`Successfully reached Notes Keeper App backend.`)
})

app.post("/", function(req, res) {
    const note = new Note(req.body)
    note.save()
    res.status(200).send(`Successfully inserted note.`)
})

app.post("/delete", async function(req, res) {
    const noteId = req.body.noteId
    const deletedNote = await Note.findOneAndDelete({id : noteId})

    if (!deletedNote) res.send(`No note found`)
    else res.status(200).send(`Successfully deleted note.`)
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
