'use strict';
module.exports = app => {
  const Sequelize = app.Sequelize;

  const invite = app.model.define(
    'invites',
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      uuid: Sequelize.STRING(36),
      actor_id: Sequelize.INTEGER(11),
      receiver_id: Sequelize.INTEGER(11),
      is_accept: Sequelize.TINYINT(1),
      group: Sequelize.STRING(20),
      group_id: Sequelize.INTEGER(11),
      expires: Sequelize.DATE,
    },
    {}
  );
  invite.addHook('afterUpdate', async (invite, options) => {
    const ctx = await app.createAnonymousContext();
    // 如果此次将is_accept从0修改为1，则视为一次接受修改，且存在接受者id， 则为发起者创建一次站内信,说明邀请已被接受
    if (invite.dataValues.is_accept === 1 && invite._previousDataValues.is_accept === 0 && invite.receiver_id) {
      if (invite.group === 'Projects') {
        const project = await ctx.model.Projects.findOne({ where: { id: invite.group_id } });
        ctx.model.Messages.create({
          actor_id: invite.receiver_id,
          receiver_id: invite.actor_id,
          content: `已接受你的邀请，加入了项目 <span class="project-name">${project.name}</span>`,
          type: 'personal',
          url: `/pojectManagement/Project/${invite.group_id}`,
        });
      }
    }
  });

  invite.associate = function(models) {
    // associations can be defined here
    invite.hasOne(app.model.Users, { foreignKey: 'id', sourceKey: 'actor_id', as: 'actor' });
  };
  return invite;
};
