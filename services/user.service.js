//const getConnection = require('../libs/postgres');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    //const client = await getConnection();
    // se utiliza el nombre de modelo indicado en modelName de la definición (user.model.js)
    const rta = await models.User.findAll({
      include: ['customer']
    });
    //const rta = await client.query('SELECT * FROM tasks');
    //return rta.rows;
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
