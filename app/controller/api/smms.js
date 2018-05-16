'use strict';
const toArray = require('stream-to-array');
const sendToWormhole = require('stream-wormhole');
const FormStream = require('formstream');
const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;

class SmmsController extends Controller {
  async upload() {
    const { ctx } = this;
    // 获取文件流.
    const stream = await ctx.getFileStream();

    // 将文件流转成buffer
    let buf;
    try {
      const parts = await toArray(stream);
      buf = Buffer.concat(parts);
    } catch(e) {
      await sendToWormhole(stream);
      throw e;
    }

    // 存入public文件夹.
    const target = path.join(this.config.baseDir, 'app/public', stream.filename);
    await fs.writeFile(target, buf);

    // 生成formstream.
    const form = new FormStream();
    
    // 将参数塞入form中. 
    form.file('smfile', target);
    for (var item in stream.fields) {
      form.field(item, stream.fields[item]);
    }

    // 代理请求sm.ms upload.
    ctx.body = await ctx.service.smms.upload({
      method: 'POST',
      headers: form.headers(),
      stream: form
    });
  }
}

module.exports = SmmsController;
