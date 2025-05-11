import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAll() {
    return userRepository.getAll();
  }

  getOne(search) {
    return userRepository.getOne(search);
  }

  create(userData) {
    const existingUserByEmail = this.search({ email: userData.email });
    if (existingUserByEmail) {
      throw Error("User with this email already exists");
    }

    const existingUserByPhone = this.search({ phone: userData.phone });
    if (existingUserByPhone) {
      throw Error("User with this phone already exists");
    }

    return userRepository.create(userData);
  }

  update(id, dataToUpdate) {
    if (dataToUpdate.email) {
      const existingUser = this.search({ email: dataToUpdate.email });
      if (existingUser && existingUser.id !== id) {
        throw Error("User with this email already exists");
      }
    }

    if (dataToUpdate.phone) {
      const existingUser = this.search({ phone: dataToUpdate.phone });
      if (existingUser && existingUser.id !== id) {
        throw Error("User with this phone already exists");
      }
    }

    return userRepository.update(id, dataToUpdate);
  }

  delete(id) {
    return userRepository.delete(id);
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const userService = new UserService();

export { userService };