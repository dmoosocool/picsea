'use strict';

module.exports = app => {
  // app.router.namespace use 'egg-router-plus' middlerware.
  const smmsRouter = app.router.namespace('/smms');
  const { controller } = app;
  const { smms } = controller.api;

  // smmsRouter.post('/list', smms.list);
  smmsRouter.post('/upload', smms.upload);
};
