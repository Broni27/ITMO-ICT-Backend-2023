import { Sequelize } from "sequelize-typescript";
import User from "../models/users/User"
import Event from "../models/events/Event"
import UserEvent from "../models/users/UserEvent"

const sequelize = new Sequelize({
    database: 'some_db',
    dialect: 'sqlite',
    storage: 'db.sqlite',
    logging: console.log,
})

const models = [User, Event, UserEvent]
sequelize.addModels(models)

sequelize
  .sync()
  .then(() => {
     //something here
     console.log('Synced models')
  })
  .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        throw new Error('Unable to connect to the database');
    }
}

testConnection()

export default sequelize