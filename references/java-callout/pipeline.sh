#!/bin/sh
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

echo "Testing on Apigee Edge"
mvn install -Papigee-edge -Dapigee.env="$APIGEE_ENV" -Dapigee.org="$APIGEE_ORG" \
  -Dapigee.username="$APIGEE_USER" -Dapigee.password="$APIGEE_PASS" -B -ntp

TEST_HOST="$APIGEE_ORG-$APIGEE_ENV.apigee.net" npm test --prefix proxy-v1

echo "Testing on Apigee X"
mvn install -Papigee-x -Dapigee.env="$APIGEE_X_ENV" -Dapigee.org="$APIGEE_X_ORG" \
  -Dapigee.bearer="$(gcloud auth print-access-token)" -B -ntp

 TEST_HOST="$APIGEE_X_HOSTNAME" npm test --prefix proxy-v1
