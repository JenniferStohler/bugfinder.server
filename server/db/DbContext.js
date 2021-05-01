import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import BugsSchema from '../models/Bugs'
import NotesSchema from '../models/Notes'
import AccountSchema from '../models/Account'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bugs', BugsSchema);

  Notes = mongoose.model('Notes', NotesSchema)
}

export const dbContext = new DbContext()
