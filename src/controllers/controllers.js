
import { AuthController } from './auth.controller.js';
import { LogsController } from './logs.controller.js';
import { TemplateController } from './template.controller.js';

const controllers = {
  auth: new AuthController(),
  logs:new LogsController(),
  template:new TemplateController(),
};

export { controllers };
