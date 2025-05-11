import { fightRepository } from "../repositories/fightRepository.js";
import { fighterService } from "./fighterService.js";

class FightersService {
  getAll() {
    return fightRepository.getAll();
  }

  getOne(search) {
    return fightRepository.getOne(search);
  }

  create(fighter1Id, fighter2Id) {
    const fighter1 = fighterService.getOne({ id: fighter1Id });
    const fighter2 = fighterService.getOne({ id: fighter2Id });

    if (!fighter1 || !fighter2) {
      throw Error("Fighter not found");
    }

    const battleLog = [];
    let fighter1Health = fighter1.health;
    let fighter2Health = fighter2.health;

    while (fighter1Health > 0 && fighter2Health > 0) {
      // Розрахунок пошкодження для кожного удару
      const fighter1Damage = Math.max(0, fighter1.power - fighter2.defense);
      const fighter2Damage = Math.max(0, fighter2.power - fighter1.defense);

      // Нанесення пошкодження
      fighter2Health -= fighter1Damage;
      if (fighter2Health > 0) {
        fighter1Health -= fighter2Damage;
      }

      // Запис логу раунду
      battleLog.push({
        fighter1Shot: fighter1Damage,
        fighter2Shot: fighter2Damage,
        fighter1Health: Math.max(0, fighter1Health),
        fighter2Health: Math.max(0, fighter2Health)
      });
    }

    const winner = fighter1Health > 0 ? fighter1 : fighter2;

    const fight = {
      fighter1: fighter1Id,
      fighter2: fighter2Id,
      log: battleLog,
      winner: winner.id
    };

    return fightRepository.create(fight);
  }
}

const fightersService = new FightersService();

export { fightersService };