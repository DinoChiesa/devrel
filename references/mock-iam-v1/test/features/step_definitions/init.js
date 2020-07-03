/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const apickli = require('apickli');
const {
  Before: before,
  setDefaultTimeout,
} = require('cucumber');

const org = process.env.APIGEE_ORG;
const env = process.env.APIGEE_ENV;
const mock = process.env.MOCK;
const basepath = mock ? '/mock-iam/v1' : '';
const host = mock ? org + '-' + env + '.apigee.net' : 'localhost:8888';

before(function() {
  this.apickli = new apickli.Apickli(mock ? 'https' : 'http',
      host + basepath);
  if (!mock) {
    this.apickli.scenarioVariables = {
      oidcPrefix: '/auth/realms/master/protocol/openid-connect',
      adminPrefix: '/auth/admin/realms/master',
    };
  } else {
    this.apickli.scenarioVariables = {
      oidcPrefix: '',
      adminPrefix: '',
    };
  }
});


setDefaultTimeout(60 * 1000);
