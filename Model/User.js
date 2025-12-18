const bcrypt = require('bcryptjs');
const { User: UserModel } = require('./mongoModels');

class User {
  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = {
      id: `USER${Date.now()}`,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || 'staff'
    };
    
    const newUser = await UserModel.create(user);
    const { password, ...userWithoutPassword } = newUser.toObject();
    return userWithoutPassword;
  }

  async findByUsername(username) {
    return await UserModel.findOne({ username });
  }

  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async validatePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async getAllUsers() {
    const users = await UserModel.find().select('-password');
    return users;
  }
}

module.exports = User;