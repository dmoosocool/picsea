'use strict';

const Service = require('egg').Service;

/**
 * 转发sm.ms接口
 * @class SmmsService
 * @extends {Service}
 */
class SmmsService extends Service {

  constructor(ctx) {
    super(ctx);
    this.root = 'https://sm.ms/api';
  }

  /**
   * sm.ms通用请求
   * @param {any} url 请求接口名
   * @param {any} opts 请求接口参数
   * @return {json} response
   * @memberof SmmsService
   */
  async request(url, opts) {
    url = `${this.root}${url}`;
    return this.ctx.curl(url, opts);
  }

  /**
   * 转发upload接口, 上传图片接口
   *
   * @param {any} params 请求参数
   * @return {json} response
   * @memberof SmmsService
   */
  async upload(params) {
    const result = await this.request('/upload', {
      method: 'post',
      data: params,
    });

    this.checkSuccess(result);

    return result.data;
  }

  /**
   * 转发list接口, 获得过去一小时内上传的文件列表
   *
   * @param {any} params 请求参数
   * @return {json} response
   * @memberof SmmsService
   */
  async list(params) {
    const result = await this.request('/list', {
      method: 'get',
      data: params,
      contentType: 'json',
    });

    this.checkSuccess(result);
    return result.data;
  }

  /**
   * 转发clear接口, 将历史上传的文件列表移除
   *
   * @return {json} response
   * @memberof SmmsService
   */
  async clear() {
    const result = await this.request('/clear', {
      method: 'get',
      contentType: 'json',
    });

    this.checkSuccess(result);
    return result.data;
  }

  /**
   * 检查接口返回是否正常.
   * @param {any} result 请求结果
   * @memberof SmmsService
   */
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.msg ? result.data.msg : 'unknown error';
      this.ctx.throw(result.status, errorMsg);
    }

    if (!result.data.success) {
      this.ctx.throw(500, 'remote response error', { data: result.data });
    }
  }
}


module.exports = SmmsService;
