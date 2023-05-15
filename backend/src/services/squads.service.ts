import Squad from "../models/squad.model";

class SquadService {
  async createSquad(
    squadName: string,
    description: string,
    createdBy: number
  ): Promise<Squad> {
    const squad = new Squad({
      SquadName: squadName,
      Description: description,
      CreatedBy: createdBy,
    });

    await squad.save();

    return squad;
  }

  async getSquadById(id: number): Promise<Squad | null> {
    const squad = await Squad.findOne({ where: { SquadID: id } });
    return squad;
  }

  async getAllSquads(): Promise<Squad[]> {
    const squads = await Squad.findAll();
    return squads;
  }

  async updateSquad(
    id: number,
    updateFields: { squadName?: string; description?: string }
  ): Promise<Squad | null> {
    const squad = await Squad.findOne({ where: { SquadID: id } });

    if (!squad) {
      return null;
    }

    if (updateFields.squadName) {
      squad.SquadName = updateFields.squadName;
    }

    if (updateFields.description) {
      squad.Description = updateFields.description;
    }

    await squad.save();

    return squad;
  }

  async deleteSquad(id: number): Promise<boolean> {
    const squad = await Squad.findOne({ where: { SquadID: id } });

    if (!squad) {
      return false;
    }

    await squad.destroy();

    return true;
  }
}

export default new SquadService();
