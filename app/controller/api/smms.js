'use strict';

const Controller = require('egg').Controller;

class SmmsController extends Controller {
  constructor(ctx) {
    super(ctx);
    console.log('asd');
  }

  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    ctx.body = await ctx.service.smms.upload(stream);
  }
}

module.exports = SmmsController;
