"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        allowNull: false,
        field: "home_team",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        type: Sequelize.INTEGER,
        references: {
          model: "teams",
          key: "id",
        },
      },
      homeTeamGoals: {
        allowNull: false,
        field: "home_team_goals",
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        allowNull: false,
        field: "away_team",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        type: Sequelize.INTEGER,
        references: {
          model: "teams",
          key: "id",
        },
      },
      awayTeamGoals: {
        allowNull: false,
        field: "away_team_goals",
        type: Sequelize.INTEGER,
      },
      inProgress: {
        allowNull: false,
        field: "in_progress",
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("matches");
  },
};
