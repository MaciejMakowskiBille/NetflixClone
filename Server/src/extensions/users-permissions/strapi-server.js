module.exports = (plugin) => {
  plugin.controllers.user.updateMe = async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }
    await strapi
      .query("plugin::users-permissions.user")
      .update({ where: { id: ctx.state.user.id }, data: ctx.request.body })
      .then((res) => {
        ctx.response.status = 200;
      });
    
    const {id, email, phoneNumber, optInSubscription, createdAt, updatedAt} = ctx.state.user;
    ctx.response.body = {
      id, email, phoneNumber, optInSubscription, createdAt, updatedAt
    }
  };

  plugin.controllers.user.create = async (ctx) => {
    // if (ctx.state.user || ctx.state.user.id) {
    //   return (ctx.response.status = 400);
    // }
    const { username, email, password, optInSubscription, payment} = ctx.request.body;

    const userExists = await strapi
      .query("plugin::users-permissions.user")
      .findOne({
        where: { email: email },
      });

    if (userExists) {
      return ctx.badRequest(null, "This email is already taken");
    }

    const payments = await strapi.query("api::payment.payment").create({
      data: {
        ...payment,
        publishedAt: new Date().getTime(),
      },
    });



    const data = {
            username: username,
            email: email,
            password: password,
            optInSubscription: optInSubscription,
            payment: payments.id,
            confirmed: true,
            provider: "local",
          };

    ctx.request.body = {...data}
    await strapi.plugin('users-permissions').controllers.auth.register(ctx);

    await strapi.query("api::profile.profile").create({
      data: {
        username: "Nowy użytkownik",
        ageGroup: "adult",
        publishedAt: new Date().getTime(),
        user: ctx.response.body.user.id,
      },
    });
  };

  plugin.routes["content-api"].routes.push(
    {
      method: "PUT",
      path: "/user/me",
      handler: "user.updateMe",
      config: {
        prefix: "",
        policies: [],
      },
    },
    {
      method: "POST",
      path: "/user/post",
      handler: "user.create",
      config: {
        prefix: "",
        policies: [],
        auth: false,
      },
    }
  );
  return plugin;
};
