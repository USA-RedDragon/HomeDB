/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var sessions = sequelize.define('sessions', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'sessions'
  });

  sessions.associate = function(models) {
    models.sessions.belongsTo(models.users);
  };

  return sessions;
};
