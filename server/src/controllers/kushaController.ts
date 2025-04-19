import { RequestHandler } from 'express'
import { PrismaClient, DetGroup, Sex, ProgrammingLanguage } from '@prisma/client'
import { stringify } from 'csv-stringify/sync'

const prisma = new PrismaClient()

