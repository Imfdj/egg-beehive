'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const message = app.model.define(
    'messages',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      actor_id: Sequelize.INTEGER(11),
      receiver_id: Sequelize.INTEGER(11),
      content: Sequelize.TEXT,
      is_read: Sequelize.TINYINT(1),
      type: Sequelize.STRING(30),
      url: Sequelize.STRING(255),
    },
    {}
  );

  message.addHook('afterCreate', async (message, options) => {
    const ctx = await app.createAnonymousContext();
    // 发送socket消息
    const newMessage = Object.assign(
      {
        is_read: 0,
        url: '',
      },
      message.dataValues
    );
    newMessage.actor = await ctx.model.Users.findOne({
      where: {
        id: message.actor_id,
      },
    });
    const { receiver_id } = message;
    ctx.helper.sendMessageToSocket(receiver_id, newMessage, 'create:message');
  });

  message.addHook('afterUpdate', async (message, options) => {
    const ctx = await app.createAnonymousContext();
    const { receiver_id } = message;
    ctx.helper.sendMessageToSocket(receiver_id, message, 'update:message');
  });

  message.associate = function(models) {
    // associations can be defined here
    message.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'actor_id', as: 'actor' });
  };
  return message;
};
