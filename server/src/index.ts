// src/server/index.ts
import express from 'express'
import cors from 'cors'
import marcosRouter from './routes/marcosRouter'   // make sure this path matches your file name
import kushaRouter from './routes/kushaRouter'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.use(cors())
app.use(express.json())

// health check
app.get('/', (_req, res) => {
  res.send('Server is running!')
})

// all /marcos endpoints
app.use('/marcos', marcosRouter)
app.use('/kusha', kushaRouter)
// error handler (must have 4 params: (err, req, res, next))
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () =>
  console.log(`🚀  Server ready at http://localhost:${PORT}`)
)
