import express from "express";
import cors from "cors"
import Database from 'better-sqlite3'

const db = new Database('./data.db', {
    verbose: console.log
})

const app = express();
app.use(cors())
const PORT = 4000;

app.use(express.json())

app.use(cors({
    origin: '*'
}))

const getAllQuotes = db.prepare(`SELECT * FROM quotes;`);

const getQuoteById = db.prepare(`SELECT * FROM quotes WHERE id=?;`);

const deleteQuote = db.prepare(`DELETE FROM quotes WHERE id=?;`);

const createQuote = db.prepare(`INSERT INTO quotes (author, quote, image, age) VALUES (?, ?, ?, ?);`)

const updateQuote = db.prepare(`UPDATE quotes SET author=?, quote=?, image=?, age=? WHERE id=?;`)




app.get('/', (req, res) => {
    res.send("Some quotes for you");
});


app.get('/quotes', (req, res) => {
    const allQuotes = getAllQuotes.all()
    res.send(allQuotes);
});

app.get('/quotes/:id', function (req, res) {
    const id = req.params.id
    const result = getQuoteById.get(id)

    if (result) {
        res.send(result)
    } else res.status(404).send({ error: 'Not found' })
})

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});

app.post('/quotes', (req, res) => {
    const author = req.body.author
    const quote = req.body.quote
    const image = req.body.image
    const age = req.body.age

    const errors = []

    if (typeof quote !== 'string') errors.push("Quote missing or not a string")
    if (typeof author !== 'string') errors.push("Author missing or not a string")
    if (typeof image !== 'string') errors.push("Image missing or not a string")
    if (typeof age !== 'string') errors.push("Age missing or not a string")

    if (errors.length === 0) {
        const result = createQuote.run(author, quote, image, age)
        const singleQuote = getQuoteById.get(result.lastInsertRowid)
        res.send(singleQuote)
    } else res.status(400).send({ errors: errors })
})

app.delete('/quotes/:id', (req, res) => {
    const id = req.params.id

    const result = deleteQuote.run(id)

    if (result.changes !== 0) {
        res.send({ message: 'Quote deleted successfully.' });
    } else {
        res.status(404).send({ error: 'Quote not found.' });
    }
})

app.patch('/quotes/:id', (req, res) => {
    const id = req.params.id
    const author = req.body.author
    const quote = req.body.quote
    const image = req.body.image
    const age = req.body.age

    const result = getQuoteById.get(id)

    if (result) {
        updateQuote.run(author, quote, image, age, id)
        const updatedQuote = getQuoteById.get(id)

        res.send(updatedQuote)
    }

    else {
        res.status(404).send({ error: 'Quote not found' })
    }

})