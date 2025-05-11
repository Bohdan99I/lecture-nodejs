import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  getAll() {
    return fighterRepository.getAll();
  }

  getOne(search) {
    return fighterRepository.getOne(search);
  }

  create(fighterData) {
    // Перевірка на унікальність імені (case insensitive)
    const existingFighter = this.search({ 
      name: new RegExp(`^${fighterData.name}$`, 'i')
    });
    
    if (existingFighter) {
      throw Error("Fighter with this name already exists");
    }

    // Встановлення значення health за замовчуванням
    if (!fighterData.health) {
      fighterData.health = 85;
    }

    return fighterRepository.create(fighterData);
  }

  update(id, dataToUpdate) {
    if (dataToUpdate.name) {
      const existingFighter = this.search({ 
        name: new RegExp(`^${dataToUpdate.name}$`, 'i')
      });
      
      if (existingFighter && existingFighter.id !== id) {
        throw Error("Fighter with this name already exists");
      }
    }

    return fighterRepository.update(id, dataToUpdate);
  }

  delete(id) {
    return fighterRepository.delete(id);
  }

  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }
}

const fighterService = new FighterService();

export { fighterService };