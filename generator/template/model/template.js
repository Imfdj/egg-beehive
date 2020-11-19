'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const _objectName_ = app.model.define(
    '_objectName_s',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      $: '{{fields}}',
    },
    {
      $_: '{{fields}}',
    }
  );
  _objectName_.associate = function (models) {
    // associations can be defined here
  };
  return _objectName_;
};
